import type { ReactVideoProps } from 'react-native-video/src/types';

import { Source } from '@d11/react-native-fast-image';
import { Portal } from '@gorhom/portal';
import { useAppState, useBackHandler } from '@react-native-community/hooks';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useUpdateEffect } from 'ahooks';
import _ from 'lodash';
import { forwardRef, Fragment, ReactNode, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Orientation, { useDeviceOrientationChange } from 'react-native-orientation-locker-cn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScaledSheet } from 'react-native-size-matters';
import Video, { OnLoadStartData, OnPlaybackStateChangedData, OnProgressData, OnVideoErrorData, VideoRef } from 'react-native-video';
import { OnLoadData } from 'react-native-video/src/types/events';

import { useStyle, useTheme } from '../hooks';
import { COLOR, SIZE } from '../scripts/const';
import { convertSecondsDisplay, mergeRefs, randomId, scale } from '../scripts/utils';
import { Button, Flex, Icon, ImageX, Loading, Slider, TextX } from './index';

export interface IVideoPlayerProps extends Omit<ReactVideoProps, 'poster' | 'style'> {
    autoplay?: boolean; // 自动播放
    hostName?: string; // portalHostName
    ignorePlugins?: pluginItem[]; // 禁用的插件
    liveMode?: boolean; // 直播模式
    messageItems?: ReactNode[]; // 消息列表
    onBack?: () => void; // 返回回调
    onFullscreen?: (isFullscreen: boolean) => void; // 全屏切换
    plugins?: pluginItem[]; // 使用的插件
    poster?: Source; // 海报资源
    prevProgress?: number; // 上次播放的进度（百分比）
    prevTime?: number; // 上次播放的进度（秒数）
    progressBarDisabled?: boolean; // 禁用进度条
    style?: {
        default?: StyleProp<ViewStyle>; // 默认位置样式
        fullscreen?: StyleProp<ViewStyle>; // 全屏后的样式
        root?: StyleProp<ViewStyle>; // 根节点样式
    };
    title?: string;
    utils?: Ref<IVideoUtils>; // 工具
}

export interface IVideoUtils {
    exitFullscreen: () => void;
    seek: (time: number, getPrevPauseStatus?: boolean) => void;
}

type pluginItem = 'back' | 'fullscreen' | 'play' | 'progressBar' | 'rate' | 'time';

const speedList = ['2', '1.5', '1.25', '1.0', '0.75', '0.5'];

function VideoPlayer(props: IVideoPlayerProps, ref: Ref<VideoRef>) {
    const {
        autoplay,
        hostName = 'videoPlayer',
        ignorePlugins,
        liveMode,
        messageItems,
        onBack,
        onEnd,
        onError,
        onFullscreen,
        onLoad,
        onLoadStart,
        onPlaybackStateChanged,
        onProgress,
        plugins,
        poster,
        prevProgress,
        prevTime,
        progressBarDisabled,
        source,
        style,
        title,
        utils,
        ...rest
    } = props;

    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const isFocused = useIsFocused();
    const theme = useTheme();
    const currentAppState = useAppState();

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
    const [innerPrevTime, setInnerPrevTime] = useState(0); // 上次观看的秒数，用来兼容prevTime和prevProgress两种不同传入
    const isPauseBySeek = useRef(false); // 是否是因为seek导致的暂停播放
    const isPausedBeforeSeek = useRef(false); // 在seek之前是否是暂停状态

    const localRef = useRef<VideoRef>(null);
    const videoRef = mergeRefs([ref, localRef]);
    const hidePrevTimeTimer = useRef<NodeJS.Timeout | null>(); // 上次观看进度隐藏定时

    const innerPlugins = useMemo(() => {
        let defaultPlugins: pluginItem[] = ['back', 'rate', 'play', 'time', 'fullscreen', 'progressBar'];
        if (_.isUndefined(plugins)) {
            if (ignorePlugins) {
                return defaultPlugins.filter(item => !ignorePlugins.includes(item));
            }
            return defaultPlugins;
        } else {
            return plugins;
        }
    }, [plugins, ignorePlugins]);

    useEffect(() => {
        if (_.isNumber(prevTime) && prevTime > 5) {
            setInnerPrevTime(prevTime - 2);
        } else if (duration > 0 && _.isNumber(prevProgress) && prevProgress > 0) {
            const seconds = prevProgress * duration;
            if (seconds > 5) {
                setInnerPrevTime(prevProgress * duration - 2);
            }
        }
    }, [prevTime, prevProgress, duration]);

    useEffect(() => {
        Orientation.init();
        Orientation.lockToPortrait();
        return () => {
            clearHideTimer();
            Orientation.removeInit();
        };
    }, []);

    useUpdateEffect(() => {
        if (!isFocused || currentAppState === 'inactive') {
            setIsFullscreen(false);
        }
    }, [isFocused, currentAppState]);

    useUpdateEffect(() => {
        clearHideTimer();
        setInnerPrevTime(0);
        setDuration(0);
        setCurrentTime(0);
        setErrorMsg('');
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

    // 对外暴露的方法
    useImperativeHandle(utils, () => ({
        exitFullscreen: () => {
            if (isFullscreen) {
                setIsFullscreen(false);
            }
        },
        seek: (time, getPrevPauseStatus) => videoSeek(time, getPrevPauseStatus),
    }));

    // 根节点样式
    const rootStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.root],
        extraStyle: [style?.root, isFullscreen ? styles.fullscreenRoot : styles.defaultRoot],
    });

    // 默认样式
    const defaultStyle = useStyle<ViewStyle>({
        defaultStyle: [{ left: 0, position: 'absolute' }],
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
            setInnerPrevTime(0);
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

    // 隐藏控制器
    const hideControls = () => {
        if (currentControl) {
            setCurrentControl(undefined);
        } else {
            setShowControls(false);
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
            videoRef.current?.resume();
        }
        setIsPaused(!isPaused);
    };

    // 切换全屏状态
    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    // 处理滑动条开始滑动
    const handleSlidingStart = () => {
        isPausedBeforeSeek.current = isPaused; // 记录当前播放状态
        setIsPaused(true);
    };

    // 处理滑动条结束滑动
    const handleSlidingComplete = _.debounce((value: number) => {
        if (duration) {
            videoSeek(value);
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

    // 通用seek方法
    const videoSeek = (time: number, getPrevPauseStatus?: boolean) => {
        isPauseBySeek.current = true;
        if (getPrevPauseStatus) {
            isPausedBeforeSeek.current = isPaused;
        }
        setIsPaused(true);
        videoRef?.current?.seek(time);
    };

    // 处理寻找
    const handleSeek = () => {
        if (isPauseBySeek.current && !isPausedBeforeSeek.current) {
            setIsPaused(false);
            isPauseBySeek.current = false;
        }
        setIsLoading(false);
    };

    // 处理播放状态变更
    const handlePlaybackStateChanged = (data: OnPlaybackStateChangedData) => {
        if (data.isPlaying) {
            setIsLoading(false);
        }
        if (!data.isPlaying) {
            setIsPaused(true); // 主动暂停的时候会用到
        }
        onPlaybackStateChanged?.(data);
    };

    // 切换播放速率
    const handleChangeRate = (value: string) => {
        setCurrentRate(value);
        setCurrentControl(undefined);
    };

    // 跳转至原播放进度
    const handleJumpToPrevTime = () => {
        if (innerPrevTime) {
            videoSeek(innerPrevTime, true);
            setInnerPrevTime(0);
        }
    };

    // 处理播放结束
    const handleEnd = _.debounce(() => {
        setIsPaused(true);
        onEnd?.();
    }, 1000);

    // 返回按钮
    const backButtonEl =
        (!isFullscreen && innerPlugins.includes('back')) || isFullscreen ? (
            <Pressable hitSlop={20} onPress={handleBack}>
                <Icon
                    color={COLOR.white}
                    name="chevron-left"
                    size={isFullscreen ? SIZE.icon_lg : SIZE.icon_md}
                    strokeWidth={SIZE.icon_stroke_lg}
                    style={styles.headerBackIcon}></Icon>
            </Pressable>
        ) : (
            <View />
        );

    // 播放按钮
    const playButtonEl = innerPlugins.includes('play') ? (
        <Pressable onPress={togglePlayStatus}>
            <Icon
                color={COLOR.white}
                fill={COLOR.white}
                name={isPaused ? 'play' : 'pause'}
                size={isFullscreen ? SIZE.icon_md : SIZE.icon_xs}
                strokeWidth={SIZE.icon_stroke_xs}
                style={styles.playBtn}
            />
        </Pressable>
    ) : null;

    // 全屏按钮
    const fullscreenButtonEl = innerPlugins.includes('fullscreen') ? (
        <Pressable hitSlop={SIZE.space_2xl / 2} onPress={toggleFullscreen}>
            <Icon color={COLOR.white} name={isFullscreen ? 'minimize' : 'maximize'} size={isFullscreen ? SIZE.icon_sm : SIZE.icon_xs} />
        </Pressable>
    ) : null;

    // 滑动条
    const progressBarEl = useMemo(() => {
        if (!innerPlugins.includes('progressBar')) {
            return null;
        }
        // 直播模式不显示进度条
        if (liveMode) {
            return <View style={styles.sliderPlaceholder}></View>;
        }
        return (
            <Slider
                disabled={progressBarDisabled}
                maximumTrackTintColor="rgba(255,255,255,.5)"
                maximumValue={duration}
                minimumTrackTintColor="#fff"
                minimumValue={0}
                onSlidingComplete={handleSlidingComplete}
                onSlidingStart={handleSlidingStart}
                style={styles.slider}
                thumbTintColor="#fff"
                value={currentTime <= duration ? currentTime : duration}></Slider>
        );
    }, [duration, currentTime, isFullscreen, liveMode, innerPlugins]);

    // 当前时长/总时长
    const timeEl =
        !liveMode && innerPlugins.includes('time') ? (
            <TextX color={COLOR.white} size={isFullscreen ? SIZE.font_secondary : SIZE.font_mini} style={styles.duration}>
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
        innerPrevTime && hasLoaded ? (
            <Flex alignItems="center" gap={SIZE.space_md} style={styles.prevTime}>
                <TextX color={COLOR.white} size={SIZE.font_desc}>
                    上次观看至{convertSecondsDisplay(innerPrevTime)}
                </TextX>
                <Button onPress={handleJumpToPrevTime} size="xs" style={{ button: { paddingHorizontal: SIZE.space_md } }} type="primary">
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
    const rateButtonEl =
        !liveMode && innerPlugins.includes('rate') ? (
            <Pressable hitSlop={SIZE.space_2xl / 2} onPress={() => setCurrentControl('rate')}>
                {currentRate ? (
                    <TextX color={COLOR.white}>{currentRate}X</TextX>
                ) : (
                    <Icon color={COLOR.white} name="gauge" size={isFullscreen ? SIZE.icon_sm : SIZE.icon_xs}></Icon>
                )}
            </Pressable>
        ) : null;

    // 播放速率控件
    const rateEl = (
        <ScrollView>
            {speedList.map(item => {
                const isActive = currentRate === item;
                return (
                    <Pressable key={item} onPress={() => handleChangeRate(item)}>
                        <TextX
                            color={COLOR.white}
                            style={[styles.speedControlItem, { opacity: isActive ? 1 : 0.5 }]}
                            weight={isActive ? '500' : '400'}>
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
            return <View style={styles.controlPanel}>{controlEl}</View>;
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
                        <Flex alignItems="center" block columnGap={SIZE.space_lg} style={styles.fullscreenHeader}>
                            {/* 返回按钮 */}
                            {backButtonEl}
                            <TextX color={COLOR.white} numberOfLines={1} size={SIZE.font_h4}>
                                {title}
                            </TextX>
                        </Flex>
                    </LinearGradient>
                    {/* 中间区域 */}
                    <Pressable onPress={hideControls} style={styles.body}>
                        {/* 加载状态 */}
                        {loadingEl}
                        {/* 错误信息 */}
                        {errorEl}
                        {/* 上次播放进度 */}
                        {messageGroupEl([messageItems, prevTimeEl])}
                    </Pressable>
                    {/* 底部操作区 */}
                    <LinearGradient colors={['#00000000', '#00000080']}>
                        <Flex block column rowGap={SIZE.space_md} style={styles.fullscreenFooter}>
                            <Flex alignItems="center" columnGap={SIZE.space_xl}>
                                {/* 进度条 */}
                                {progressBarEl}
                                {/* 当前时长/总时长 */}
                                {timeEl}
                            </Flex>

                            <Flex alignItems="center" block justifyContent="space-between">
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
                    <Flex alignItems="center" block columnGap={SIZE.space_lg} justifyContent="space-between" style={styles.defaultHeader}>
                        {/* 返回按钮 */}
                        {backButtonEl}
                        {/*播放速率*/}
                        {rateButtonEl}
                    </Flex>
                </LinearGradient>
                {/* 中间区域 */}
                <Pressable onPress={hideControls} style={styles.body}>
                    {/* 加载状态 */}
                    {loadingEl}
                    {/* 错误信息 */}
                    {errorEl}
                    {/* 上次播放进度 */}
                    {messageGroupEl([messageItems, prevTimeEl])}
                </Pressable>
                {/* 底部操作区 */}
                <LinearGradient colors={['#00000000', '#00000080']}>
                    <Flex alignItems="center" block columnGap={SIZE.space_lg} style={styles.defaultFooter}>
                        {/* 播放/暂停按钮 */}
                        {playButtonEl}
                        {/* 进度条 */}
                        {progressBarEl}
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
                <Pressable onPress={() => setShowControls(true)} style={rootStyle}>
                    {controlsEl()}

                    {showPoster && poster ? <ImageX resizeMode="cover" source={poster} style={styles.poster} /> : null}

                    <Video
                        onEnd={handleEnd}
                        onError={handleError}
                        onLoad={handleLoad}
                        onLoadStart={handleLoadStart}
                        onPlaybackStateChanged={handlePlaybackStateChanged}
                        onProgress={handleProgress}
                        onSeek={handleSeek}
                        paused={isPaused}
                        rate={+currentRate}
                        ref={videoRef}
                        resizeMode="contain"
                        source={source}
                        style={{ height: '100%' }}
                        {...rest}></Video>
                </Pressable>
            </View>
        </Portal>
    );
}

export default forwardRef(VideoPlayer);

const styles = ScaledSheet.create({
    body: {
        alignItems: 'center',
        flexGrow: 1,
        flexShrink: 1,
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
    },
    controlPanel: {
        backgroundColor: COLOR.black,
        height: '100%',
        paddingLeft: scale(20),
        paddingRight: scale(40),
        paddingVertical: scale(20),
        position: 'absolute',
        right: 0,
        top: 0,
    },
    defaultFooter: {
        minHeight: scale(46),
        paddingHorizontal: SIZE.space_xl,
        paddingVertical: SIZE.space_sm,
        position: 'relative',
    },
    defaultHeader: {
        minHeight: scale(44),
        paddingHorizontal: SIZE.space_xl,
        position: 'relative',
    },
    defaultRoot: {
        aspectRatio: 16 / 9,
        width: '100%',
    },
    duration: {
        textAlign: 'right',
        width: scale(120),
    },
    fullscreenFooter: {
        paddingBottom: SIZE.space_lg,
        paddingHorizontal: SIZE.space_2xl,
        position: 'relative',
    },
    fullscreenHeader: {
        minHeight: scale(60),
        paddingHorizontal: SIZE.space_2xl,
        position: 'relative',
    },
    fullscreenRoot: {
        height: '100%',
        width: '100%',
    },
    headerBackIcon: {
        marginLeft: -5,
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
    messageGroup: {
        bottom: SIZE.space_md,
        left: SIZE.space_xl,
        position: 'absolute',
    },
    playBtn: {
        marginRight: SIZE.space_md,
    },
    player: {
        height: '100%',
        zIndex: 10,
    },
    poster: {
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 20,
    },
    prevTime: {
        backgroundColor: COLOR.bg_overlay,
        borderRadius: SIZE.radius_md,
        padding: SIZE.space_md,
    },
    root: {
        backgroundColor: COLOR.black,
        flexShrink: 0,
        position: 'relative',
        transformOrigin: 'center',
    },
    safeArea: {
        backgroundColor: COLOR.black,
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    slider: {
        flexShrink: 1,
        width: '100%',
    },
    sliderPlaceholder: {
        flexGrow: 1,
    },
    speedControlItem: {
        marginBottom: SIZE.space_xl,
        paddingVertical: SIZE.space_md,
        textAlign: 'center',
        width: scale(80),
    },
});
