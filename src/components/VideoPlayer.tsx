import Video, { OnLoadStartData, OnPlaybackStateChangedData, OnProgressData, OnVideoErrorData, VideoRef } from 'react-native-video';
import { Pressable, ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import { Button, Flex, Icon, ImageX, Loading, Slider, TextX } from './index';
import { ForwardedRef, forwardRef, Fragment, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import Animated, { SlideInRight, SlideOutRight } from 'react-native-reanimated';
import { OnLoadData } from 'react-native-video/src/types/events';
import { convertSecondsDisplay, mergeRefs, randomId, scale } from '../scripts/utils';
import _ from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUpdateEffect } from 'ahooks';
import type { ReactVideoProps } from 'react-native-video/src/types';
import Orientation, { useDeviceOrientationChange } from 'react-native-orientation-locker-cn';
import { Portal } from '@gorhom/portal';
import { useStyle, useTheme } from '../hooks';
import { useBackHandler } from '@react-native-community/hooks';
import { ScaledSheet } from 'react-native-size-matters';
import { LinearGradient } from 'react-native-linear-gradient';
import { Source } from 'react-native-turbo-image';

export interface IVideoPlayerProps extends Omit<ReactVideoProps, 'style' | 'poster'> {
    title?: string;
    prevTime?: number; // 上次播放的进度
    autoplay?: boolean; // 自动播放
    liveMode?: boolean; // 直播模式
    messageItems?: ReactNode[]; // 消息列表
    progressBarDisabled?: boolean; // 禁用进度条
    poster?: Source; // 海报资源
    hostName?: string; // portalHostName
    onBack?: () => void; // 返回回调
    onFullscreen?: (isFullscreen: boolean) => void; // 全屏切换
    style?: {
        root?: StyleProp<ViewStyle>; // 根节点样式
        default?: StyleProp<ViewStyle>; // 默认位置样式
        fullscreen?: StyleProp<ViewStyle>; // 全屏后的样式
    };
}

const speedList = ['2', '1.5', '1.25', '1.0', '0.75', '0.5'];

function VideoPlayer(props: IVideoPlayerProps, ref: ForwardedRef<VideoRef>) {
    const {
        messageItems,
        title,
        source,
        prevTime,
        autoplay,
        liveMode,
        poster,
        progressBarDisabled,
        hostName = 'videoPlayer',
        onBack,
        onLoad,
        onLoadStart,
        onProgress,
        onError,
        onFullscreen,
        onPlaybackStateChanged,
        onEnd,
        style,
        ...rest
    } = props;

    const navigation = useNavigation();
    const theme = useTheme();
    const insets = useSafeAreaInsets();

    const [showPrevTimeBtn, setShowPrevTimeBtn] = useState(false); // 是否显示之前的播放进度跳转按钮
    const [showPoster, setShowPoster] = useState(true); // 是否显示海报
    const [showControls, setShowControls] = useState(true); // 是否显示控制组件
    const [isPaused, setIsPaused] = useState(!autoplay); // 视频暂停
    const [isFullscreen, setIsFullscreen] = useState(false); // 全屏
    const [currentTime, setCurrentTime] = useState(0); // 当前播放时间
    const [duration, setDuration] = useState(0); // 视频总时长
    const [isLoading, setIsLoading] = useState(false); // 视频加载中
    const [errorMsg, setErrorMsg] = useState<string>(''); // 错误信息
    const [currentControl, setCurrentControl] = useState<'rate' | undefined>(undefined); // 当前活跃的控制器
    const [currentRate, setCurrentRate] = useState('1.0'); // 当前速率
    const [hasLoaded, setHasLoaded] = useState(false); // 视频信息加载完成

    const localRef = useRef<VideoRef>(null);
    const videoRef = mergeRefs([ref, localRef]);
    const hidePrevTimeTimer = useRef<NodeJS.Timeout | null>(); // 上次观看进度隐藏定时

    useEffect(() => {
        Orientation.lockToPortrait();
        if (_.isNumber(prevTime) && prevTime > 0) {
            setShowPrevTimeBtn(true);
        }
        return () => {
            clearHideTimer();
            setIsFullscreen(false);
            theme.showStatusBar();
            Orientation.lockToPortrait(); // 恢复竖向显示
        };
    }, []);

    useUpdateEffect(() => {
        if (_.isNumber(prevTime) && prevTime > 0) {
            setShowPrevTimeBtn(true);
        }
        setDuration(0);
        setCurrentTime(0);
    }, [source]);

    useUpdateEffect(() => {
        if (isFullscreen) {
            theme.hideStatusBar();
            Orientation.lockToLandscapeLeft();
        } else {
            theme.showStatusBar();
            Orientation.lockToPortrait();
        }
        onFullscreen?.(isFullscreen);
    }, [isFullscreen]);

    // 监听设备旋转
    useDeviceOrientationChange(ev => {
        if (ev.startsWith('PORTRAIT') && isFullscreen) {
            setIsFullscreen(false);
        }
        if (ev.startsWith('LANDSCAPE') && !isFullscreen) {
            setIsFullscreen(true);
        }
    });

    // 处理返回操作
    useBackHandler(() => {
        if (isFullscreen) {
            setIsFullscreen(false);
            return true;
        }
        return false;
    });

    // 根节点样式
    const rootStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.root],
        extraStyle: [style?.root, isFullscreen ? styles.fullscreenRoot : styles.defaultRoot],
    });

    // 默认样式
    const defaultStyle = useStyle<ViewStyle>({
        defaultStyle: [{ position: 'absolute', left: 0 }],
        extraStyle: [style?.default],
    });

    // 全屏样式
    const fullscreenStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.safeArea, { paddingLeft: insets.left + SIZE.space_lg, paddingRight: insets.right + SIZE.space_lg }],
        extraStyle: [style?.fullscreen],
    });

    // 隐藏跳转按钮
    const hidePrevTimeEl = () => {
        hidePrevTimeTimer.current = setTimeout(() => {
            setShowPrevTimeBtn(false);
        }, 5000);
        return null;
    };

    // 清除隐藏控制定时器
    const clearHideTimer = () => {
        if (hidePrevTimeTimer.current) {
            clearTimeout(hidePrevTimeTimer.current);
        }
        hidePrevTimeTimer.current = null;
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
        if (duration - currentTime < 1) {
            videoRef.current?.seek(0);
        }
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
            setIsLoading(true);
        }
    }, 500);

    // 视频播放时更新当前播放时间
    const handleProgress = (data: OnProgressData) => {
        // 如果有显示海报，则隐藏海报
        if (showPoster && data.currentTime > 0) {
            setShowPoster(false);
        }
        setCurrentTime(data.currentTime);
        onProgress?.(data);
    };

    // 处理视频开始加载
    const handleLoadStart = (data: OnLoadStartData) => {
        onLoadStart?.(data);
        setHasLoaded(false);
        setIsLoading(true);
    };

    // 处理视频加载完成
    const handleLoad = (data: OnLoadData) => {
        setDuration(data.duration);
        onLoad?.(data);
        setHasLoaded(true);
        setIsLoading(false);
        if (autoplay) {
            setIsPaused(false);
        }
    };

    // 处理数据加载
    const handleError = (error: OnVideoErrorData) => {
        setIsLoading(false);
        setErrorMsg(JSON.stringify(error.error));
        onError?.(error);
    };

    // 处理寻找
    const handleSeek = () => {
        setIsPaused(false); // 寻找之后立即播放
    };

    // 处理播放状态变更
    const handlePlaybackStateChanged = (data: OnPlaybackStateChangedData) => {
        if (data.isPlaying) {
            setIsLoading(false);
        }
        setIsPaused(!data.isPlaying);
        onPlaybackStateChanged?.(data);
    };

    // 切换播放速率
    const handleChangeRate = (value: string) => {
        setCurrentRate(value);
        setCurrentControl(undefined);
    };

    // 跳转至原播放进度
    const handleJumpToPrevTime = () => {
        if (prevTime) {
            videoRef?.current?.seek(prevTime);
            setShowPrevTimeBtn(false);
        }
    };

    // 处理播放结束
    const handleEnd = _.debounce(() => {
        setIsPaused(true);
        onEnd?.();
    }, 1000);

    // 返回按钮
    const backButtonEl = (
        <Pressable onPress={handleBack} hitSlop={20}>
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
                style={styles.playBtn}
            />
        </Pressable>
    );

    // 全屏按钮
    const fullscreenButtonEl = (
        <Pressable hitSlop={SIZE.space_2xl / 2} onPress={toggleFullscreen}>
            <Icon name={isFullscreen ? 'minimize' : 'maximize'} color={COLOR.white} size={isFullscreen ? SIZE.icon_sm : SIZE.icon_xs} />
        </Pressable>
    );

    // 滑动条
    const sliderEl = useMemo(() => {
        // 直播模式不显示进度条
        if (liveMode) {
            return <View style={styles.sliderPlaceholder}></View>;
        }
        return (
            <Slider
                disabled={progressBarDisabled}
                minimumValue={0}
                maximumValue={duration}
                value={currentTime <= duration ? currentTime : duration}
                thumbTintColor="#fff"
                minimumTrackTintColor="#fff"
                maximumTrackTintColor="rgba(255,255,255,.5)"
                onSlidingStart={handleSlidingStart}
                onSlidingComplete={handleSlidingComplete}
                style={styles.slider}></Slider>
        );
    }, [duration, currentTime, isFullscreen, liveMode]);

    // 当前时长/总时长
    const timeEl = !liveMode ? (
        <TextX
            color={COLOR.white}
            size={isFullscreen ? SIZE.font_secondary : SIZE.font_mini}
            style={[styles.duration, isFullscreen ? styles.fullscreenDuration : styles.defaultDuration]}>
            {convertSecondsDisplay(currentTime)} / {convertSecondsDisplay(duration)}
        </TextX>
    ) : null;

    // 提示组
    const messageGroupEl = (children?: ReactNode[]) => {
        if (children && children.length > 0) {
            return (
                <Flex column rowGap={SIZE.space_md} style={styles.messageGroup}>
                    {children.map(item => {
                        return <Fragment key={randomId()}>{item}</Fragment>;
                    })}
                </Flex>
            );
        }
        return null;
    };

    // 进度跳转
    const prevTimeEl =
        showPrevTimeBtn && prevTime && hasLoaded ? (
            <Flex alignItems="center" gap={SIZE.space_md} style={styles.prevTime}>
                <TextX size={SIZE.font_desc} color={COLOR.white}>
                    上次观看至{convertSecondsDisplay(prevTime)}
                </TextX>
                <Button size="xs" style={{ button: { paddingHorizontal: SIZE.space_md } }} type="primary" onPress={handleJumpToPrevTime}>
                    跳转播放
                </Button>
                {hidePrevTimeEl()}
            </Flex>
        ) : null;

    // 加载状态
    const loadingEl = isLoading ? <Loading color={COLOR.white} size={SIZE.icon_xl}></Loading> : null;

    // 错误信息展示
    const errorEl = errorMsg ? (
        <Flex column rowGap={SIZE.space_sm} style={{ padding: SIZE.space_lg }}>
            <TextX color={COLOR.white} size={SIZE.font_secondary}>
                播放错误：
            </TextX>
            <TextX color={COLOR.white} size={SIZE.font_mini}>
                {errorMsg}
            </TextX>
        </Flex>
    ) : null;

    // 播放速率控件开关
    const rateButtonEl = !liveMode ? (
        <Pressable hitSlop={SIZE.space_2xl / 2} onPress={() => setCurrentControl('rate')}>
            {currentRate ? (
                <TextX color={COLOR.white}>{currentRate}X</TextX>
            ) : (
                <Icon name="gauge" color={COLOR.white} size={isFullscreen ? SIZE.icon_sm : SIZE.icon_xs}></Icon>
            )}
        </Pressable>
    ) : null;

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
                <View style={styles.mask}>
                    {/* 顶部操作区 */}
                    <LinearGradient colors={['#00000080', '#00000000']}>
                        <Flex block alignItems="center" columnGap={SIZE.space_lg} style={styles.fullscreenHeader}>
                            {/* 返回按钮 */}
                            {backButtonEl}
                            <TextX size={SIZE.font_h4} color={COLOR.white} numberOfLines={1}>
                                {title}
                            </TextX>
                        </Flex>
                    </LinearGradient>
                    {/* 播放/暂停按钮 */}
                    <Flex grow={1} block alignItems="center" justifyContent="center" style={styles.body}>
                        {/* 加载状态 */}
                        {loadingEl}
                        {/* 错误信息 */}
                        {errorEl}
                        {/* 上次播放进度 */}
                        {messageGroupEl([messageItems, prevTimeEl])}
                    </Flex>
                    {/* 底部操作区 */}
                    <LinearGradient colors={['#00000000', '#00000080']}>
                        <Flex column block rowGap={SIZE.space_md} style={styles.fullscreenFooter}>
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
                        </Flex>
                    </LinearGradient>
                    {controlPanelEl()}
                </View>
            );
        }

        // 默认模式
        return (
            <View style={styles.mask}>
                {/* 顶部操作区 */}
                <LinearGradient colors={['#00000080', '#00000000']}>
                    <Flex block alignItems="center" justifyContent="space-between" columnGap={SIZE.space_lg} style={styles.defaultHeader}>
                        {/* 返回按钮 */}
                        {backButtonEl}
                        {/*播放速率*/}
                        {rateButtonEl}
                    </Flex>
                </LinearGradient>
                {/* 播放/暂停按钮 */}
                <Flex grow={1} block alignItems="center" justifyContent="center" style={styles.body}>
                    {/* 加载状态 */}
                    {loadingEl}
                    {/* 错误信息 */}
                    {errorEl}
                    {/* 上次播放进度 */}
                    {messageGroupEl([messageItems, prevTimeEl])}
                </Flex>
                {/* 底部操作区 */}
                <LinearGradient colors={['#00000000', '#00000080']}>
                    <Flex alignItems="center" block columnGap={SIZE.space_lg} style={styles.defaultFooter}>
                        {/* 播放/暂停按钮 */}
                        {playButtonEl}
                        {/* 进度条 */}
                        {sliderEl}
                        {/* 当前时长/总时长 */}
                        {timeEl}
                        {/* 全屏 */}
                        {fullscreenButtonEl}
                    </Flex>
                </LinearGradient>
                {controlPanelEl()}
            </View>
        );
    };

    return (
        <Portal hostName={hostName}>
            <View style={isFullscreen ? fullscreenStyle : defaultStyle}>
                <Pressable onPress={handleRootPress} style={rootStyle}>
                    {controlsEl()}

                    {showPoster && poster ? <ImageX source={poster} resizeMode="cover" style={styles.poster} /> : null}

                    <Video
                        ref={videoRef}
                        paused={isPaused}
                        resizeMode="contain"
                        source={source}
                        onLoad={handleLoad}
                        onLoadStart={handleLoadStart}
                        onProgress={handleProgress}
                        onError={handleError}
                        onPlaybackStateChanged={handlePlaybackStateChanged}
                        onSeek={handleSeek}
                        onEnd={handleEnd}
                        rate={+currentRate}
                        style={{ height: '100%' }}
                        {...rest}></Video>
                </Pressable>
            </View>
        </Portal>
    );
}

export default forwardRef(VideoPlayer);

const styles = ScaledSheet.create({
    root: {
        backgroundColor: COLOR.black,
        flexShrink: 0,
        position: 'relative',
        transformOrigin: 'center',
    },
    defaultRoot: {
        aspectRatio: 16 / 9,
        width: '100%',
    },
    fullscreenRoot: {
        height: '100%',
        width: '100%',
    },
    safeArea: {
        backgroundColor: COLOR.black,
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    poster: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 20,
    },
    mask: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 30,
    },
    player: {
        height: '100%',
        zIndex: 10,
    },
    defaultHeader: {
        position: 'relative',
        paddingHorizontal: SIZE.space_xl,
        paddingVertical: SIZE.space_md,
    },
    fullscreenHeader: {
        position: 'relative',
        paddingHorizontal: SIZE.space_2xl,
        paddingVertical: SIZE.space_lg,
    },
    headerBackIcon: {
        marginLeft: -5,
    },
    body: {
        flexShrink: 1,
        position: 'relative',
    },
    defaultFooter: {
        position: 'relative',
        paddingHorizontal: SIZE.space_xl,
        paddingVertical: SIZE.space_sm,
    },
    fullscreenFooter: {
        position: 'relative',
        paddingHorizontal: SIZE.space_2xl,
        paddingBottom: SIZE.space_lg,
    },
    sliderPlaceholder: {
        flexGrow: 1,
        height: scale(40),
    },
    playBtn: {
        marginRight: SIZE.space_md,
    },
    slider: {
        flexShrink: 1,
        width: '100%',
    },
    controlPanel: {
        backgroundColor: COLOR.black,
        height: '100%',
        paddingLeft: scale(40),
        paddingRight: scale(80),
        paddingVertical: scale(40),
        position: 'absolute',
        right: 0,
        top: 0,
    },
    speedControlItem: {
        marginBottom: SIZE.space_xl,
        paddingVertical: SIZE.space_md,
        textAlign: 'center',
        width: scale(80),
    },
    messageGroup: {
        position: 'absolute',
        bottom: SIZE.space_md,
        left: SIZE.space_xl,
    },
    prevTime: {
        backgroundColor: COLOR.bg_overlay,
        borderRadius: SIZE.radius_md,
        padding: SIZE.space_md,
    },
    duration: {
        textAlign: 'right',
    },
    defaultDuration: {
        width: scale(100),
    },
    fullscreenDuration: {
        width: scale(120),
    },
});
