import Video, {
    OnLoadStartData,
    OnPlaybackStateChangedData,
    OnProgressData,
    OnVideoErrorData,
    ReactVideoPoster,
    VideoRef,
} from 'react-native-video';
import { Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import { Flex, Icon, Loading, Overlay, Slider, TextX } from './index';
import { useEffect, useMemo, useRef, useState } from 'react';
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutRight } from 'react-native-reanimated';
import { ReactVideoSource } from 'react-native-video/src/types/video';
import { OnLoadData } from 'react-native-video/src/types/events';
import { convertSecondsDisplay } from '../scripts/utils';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUpdateEffect } from 'ahooks';
import type { ReactVideoProps } from 'react-native-video/src/types';

export interface IVideoPlayerProps extends ReactVideoProps {
    title?: string;
    source: ReactVideoSource;
    poster?: ReactVideoPoster;
    onBack?: () => void;
}

const speedList = ['2', '1.5', '1.25', '1.0', '0.75', '0.5'];

export default function VideoPlayer(props: IVideoPlayerProps) {
    const { title, source, poster, onBack, onLoad, onLoadStart, onProgress, onError, onPlaybackStateChanged } = props;

    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const [showControls, setShowControls] = useState(true); // 是否显示控制组件
    const [isPaused, setIsPaused] = useState(false); // 视频暂停
    const [isFullscreen, setIsFullscreen] = useState(false); // 全屏
    const [currentTime, setCurrentTime] = useState(0); // 当前播放时间
    const [duration, setDuration] = useState(0); // 视频总时长
    const [isLoading, setIsLoading] = useState(true); // 视频加载中
    const [errorMsg, setErrorMsg] = useState<string>(''); // 错误信息
    const [currentControl, setCurrentControl] = useState<'rate' | undefined>(undefined); // 当前活跃的控制器
    const [currentRate, setCurrentRate] = useState('1.0'); // 当前速率

    const videoRef = useRef<VideoRef>(null);
    const hideTimer = useRef<NodeJS.Timeout | null>();

    useEffect(() => {
        return () => {
            clearHideTimer();
        };
    }, []);

    useUpdateEffect(() => {
        setDuration(0);
        setCurrentTime(0);
    }, [source]);

    // 清除隐藏控制定时器
    const clearHideTimer = () => {
        if (hideTimer.current) {
            clearTimeout(hideTimer.current);
        }
        hideTimer.current = null;
    };

    // 根节点点击
    const handleRootPress = () => {
        if (currentControl) {
            setCurrentControl(undefined);
        } else {
            setShowControls(!showControls);
        }
    };

    // 处理返回按钮点击
    const handleBack = () => {
        if (isFullscreen) {
            return setIsFullscreen(false);
        }
        if (onBack) {
            return onBack();
        }
        navigation.goBack();
    };

    // 切换播放状态
    const togglePlayStatus = () => {
        setIsPaused(!isPaused);
    };

    // 切换全屏状态
    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    // 处理滑动条开始滑动
    const handleSlidingStart = () => {
        setIsPaused(true);
    };

    // 处理滑动条结束滑动
    const handleSlidingComplete = _.debounce((value: number) => {
        if (duration) {
            videoRef?.current?.seek(value);
            setCurrentTime(value);
            setIsPaused(false);
            setIsLoading(true);
        }
    }, 500);

    // 视频播放时更新当前播放时间
    const handleProgress = (data: OnProgressData) => {
        setCurrentTime(data.currentTime);
        onProgress?.(data);
    };

    // 处理视频开始加载
    const handleLoadStart = (data: OnLoadStartData) => {
        onLoadStart?.(data);
        setIsLoading(true);
    };

    // 处理视频加载完成
    const handleLoad = (data: OnLoadData) => {
        setDuration(data.duration);
        if (currentTime) {
            videoRef?.current?.seek(currentTime);
        }
        setIsPaused(false);
        onLoad?.(data);
    };

    // 处理数据加载
    const handleError = (error: OnVideoErrorData) => {
        setIsLoading(false);
        setErrorMsg(JSON.stringify(error.error));
        onError?.(error);
    };

    // 处理播放状态变更
    const handlePlaybackStateChanged = (data: OnPlaybackStateChangedData) => {
        if (data.isPlaying) {
            setIsLoading(false);
        }
        onPlaybackStateChanged?.(data);
    };

    // 切换播放速率
    const handleChangeRate = (value: string) => {
        setCurrentRate(value);
        setCurrentControl(undefined);
    };

    // 返回按钮
    const backButtonEl = (
        <Pressable onPress={handleBack}>
            <Icon
                name="chevron-left"
                color={COLOR.white}
                size={isFullscreen ? SIZE.icon_lg : SIZE.icon_md}
                strokeWidth={SIZE.icon_stroke_lg}
                style={styles.headerBackIcon}></Icon>
        </Pressable>
    );

    // 播放按钮
    const playButtonEl = (
        <Pressable onPress={togglePlayStatus}>
            <Icon
                name={isPaused ? 'play' : 'pause'}
                color={COLOR.white}
                fill={COLOR.white}
                size={isFullscreen ? SIZE.icon_md : SIZE.icon_xs}
                strokeWidth={SIZE.icon_stroke_xs}
                style={styles.playBtn}></Icon>
        </Pressable>
    );

    // 全屏按钮
    const fullscreenButtonEl = (
        <Pressable hitSlop={SIZE.space_2xl / 2} onPress={toggleFullscreen}>
            <Icon
                name={isFullscreen ? 'minimize' : 'maximize'}
                color={COLOR.white}
                size={isFullscreen ? SIZE.icon_sm : SIZE.icon_xs}></Icon>
        </Pressable>
    );

    // 滑动条
    const sliderEl = useMemo(() => {
        return (
            <Slider
                minimumValue={0}
                maximumValue={duration}
                value={currentTime}
                thumbTintColor="#fff"
                minimumTrackTintColor="#fff"
                maximumTrackTintColor="rgba(255,255,255,.5)"
                onSlidingStart={handleSlidingStart}
                onSlidingComplete={handleSlidingComplete}
                orientation={isFullscreen ? 'vertical' : 'horizontal'}
                style={styles.slider}></Slider>
        );
    }, [duration, currentTime, isFullscreen]);

    // 当前时长/总时长
    const timeEl = (
        <TextX color={COLOR.white} size={isFullscreen ? SIZE.font_secondary : SIZE.font_mini}>
            {convertSecondsDisplay(currentTime)} / {convertSecondsDisplay(duration)}
        </TextX>
    );

    // 加载状态
    const loadingEl = isLoading ? <Loading color={COLOR.white} size={SIZE.icon_xl}></Loading> : null;

    // 错误信息展示
    const errorEl = errorMsg ? (
        <Flex column rowGap={SIZE.space_sm} style={{ paddingHorizontal: SIZE.space_lg }}>
            <TextX color={COLOR.white} size={SIZE.font_h4}>
                错误：
            </TextX>
            <TextX color={COLOR.white} size={SIZE.font_desc}>
                {errorMsg}
            </TextX>
        </Flex>
    ) : null;

    // 播放速率控件开关
    const rateButtonEl = (
        <Pressable hitSlop={SIZE.space_2xl / 2} onPress={() => setCurrentControl('rate')}>
            {currentRate ? (
                <TextX color={COLOR.white}>{currentRate}X</TextX>
            ) : (
                <Icon name="gauge" color={COLOR.white} size={isFullscreen ? SIZE.icon_sm : SIZE.icon_xs}></Icon>
            )}
        </Pressable>
    );

    // 播放速率控件
    const rateEl = (
        <ScrollView>
            {speedList.map(item => {
                const isActive = currentRate === item;
                return (
                    <Pressable onPress={() => handleChangeRate(item)} key={item}>
                        <TextX
                            color={COLOR.white}
                            weight={isActive ? '500' : '400'}
                            style={[styles.speedControlItem, { opacity: isActive ? 1 : 0.5 }]}>
                            {item}X
                        </TextX>
                    </Pressable>
                );
            })}
        </ScrollView>
    );

    // 控制面板
    const controlPanelEl = () => {
        let controlEl;
        switch (currentControl) {
            case 'rate':
                controlEl = rateEl;
                break;
        }
        if (currentControl) {
            return (
                <Animated.View entering={SlideInRight} exiting={SlideOutRight} style={styles.controlPanel}>
                    {controlEl}
                </Animated.View>
            );
        }
        return null;
    };

    // 控制器
    const controlsEl = () => {
        if (!showControls) {
            return null;
        }
        // 全屏模式
        if (isFullscreen) {
            return (
                <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.mask}>
                    {/* 顶部操作区 */}
                    <Flex block alignItems="center" columnGap={SIZE.space_lg} style={styles.bigHeader}>
                        {/* 返回按钮 */}
                        {backButtonEl}
                        <TextX size={SIZE.font_h4} color={COLOR.white} numberOfLines={1}>
                            {title}
                        </TextX>
                    </Flex>
                    {/* 播放/暂停按钮 */}
                    <Flex grow={1} block alignItems="center" justifyContent="center" style={styles.body}>
                        {loadingEl}
                        {errorEl}
                    </Flex>
                    {/* 底部操作区 */}
                    <View style={styles.bigFooter}>
                        <Flex alignItems="center" columnGap={SIZE.space_xl}>
                            {/* 进度条 */}
                            {sliderEl}
                            {/* 当前时长/总时长 */}
                            {timeEl}
                        </Flex>

                        <Flex alignItems="center" justifyContent="space-between" block>
                            <Flex alignItems="center" columnGap={SIZE.space_lg}>
                                {/* 播放/暂停按钮 */}
                                {playButtonEl}
                            </Flex>

                            <Flex alignItems="center" columnGap={SIZE.space_2xl}>
                                {/*播放速率*/}
                                {rateButtonEl}
                                {/* 全屏 */}
                                {fullscreenButtonEl}
                            </Flex>
                        </Flex>
                    </View>
                    {controlPanelEl()}
                </Animated.View>
            );
        }

        // 默认模式
        return (
            <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.mask}>
                {/* 顶部操作区 */}
                <Flex block justifyContent="space-between" alignItems="center" style={styles.header}>
                    {/* 返回按钮 */}
                    {backButtonEl}
                </Flex>
                {/* 播放/暂停按钮 */}
                <Flex grow={1} block alignItems="center" justifyContent="center" style={styles.body}>
                    {loadingEl}
                    {errorEl}
                </Flex>
                {/* 底部操作区 */}
                <Flex alignItems="center" columnGap={SIZE.space_lg} block style={styles.footer}>
                    {/* 播放/暂停按钮 */}
                    {playButtonEl}
                    {/* 进度条 */}
                    {sliderEl}
                    {/* 当前时长/总时长 */}
                    {timeEl}
                    {/* 全屏 */}
                    {fullscreenButtonEl}
                </Flex>
            </Animated.View>
        );
    };

    // 主节点
    const rootEl = (
        <Pressable onPress={handleRootPress} style={[styles.root, isFullscreen ? styles.fullscreenRoot : styles.defaultRoot]}>
            {controlsEl()}

            <Video
                ref={videoRef}
                paused={isPaused}
                resizeMode="contain"
                source={source}
                poster={poster}
                onLoad={handleLoad}
                onLoadStart={handleLoadStart}
                onProgress={handleProgress}
                onError={handleError}
                onPlaybackStateChanged={handlePlaybackStateChanged}
                rate={+currentRate}
                style={{ height: '100%' }}></Video>
        </Pressable>
    );

    if (isFullscreen) {
        return (
            <Overlay style={{ content: { paddingTop: insets.top, paddingBottom: insets.bottom, backgroundColor: COLOR.black } }}>
                {rootEl}
            </Overlay>
        );
    }

    return rootEl;
}

const { width: vw, height: vh } = Dimensions.get('window');

const styles = StyleSheet.create({
    root: {
        backgroundColor: COLOR.black,
        position: 'relative',
    },
    defaultRoot: {
        aspectRatio: 16 / 9,
        width: '100%',
    },
    fullscreenRoot: {
        height: vw,
        transform: [{ rotate: '90deg' }],
        width: vh,
    },
    mask: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 1,
    },
    header: {
        backgroundColor: COLOR.bg_overlay,
        paddingHorizontal: SIZE.space_lg,
        paddingVertical: SIZE.space_sm,
    },
    bigHeader: {
        backgroundColor: COLOR.bg_overlay,
        paddingHorizontal: 50,
        paddingVertical: SIZE.space_md,
    },
    headerBackIcon: {
        marginLeft: -5,
    },
    body: {},
    footer: {
        backgroundColor: COLOR.bg_overlay,
        paddingHorizontal: SIZE.space_lg,
        paddingVertical: SIZE.space_sm,
    },
    bigFooter: {
        backgroundColor: COLOR.bg_overlay,
        paddingBottom: SIZE.space_md,
        paddingHorizontal: 60,
        paddingTop: SIZE.space_sm,
    },
    playBtn: {
        marginRight: SIZE.space_md,
    },
    slider: {
        flexGrow: 1,
        flexShrink: 1,
    },
    controlPanel: {
        backgroundColor: COLOR.black,
        height: vh,
        paddingLeft: 40,
        paddingRight: 80,
        paddingVertical: 40,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    speedControlItem: {
        marginBottom: SIZE.space_xl,
        paddingVertical: SIZE.space_md,
        textAlign: 'center',
        width: 80,
    },
});
