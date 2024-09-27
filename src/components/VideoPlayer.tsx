// import Video from 'react-native-video';
import { Pressable, StyleSheet } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import { Flex, Icon, TextX } from './index';
import Slider from '@react-native-community/slider';
import { useEffect, useRef, useState } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export default function VideoPlayer() {
    const [showControls, setShowControls] = useState(true);
    const [isPause, setIsPause] = useState(false);

    const hideTimer = useRef<NodeJS.Timeout | null>();

    useEffect(() => {
        return () => {
            clearHideTimer();
        };
    }, []);

    // useEffect(() => {
    //     if (showControls) {
    //         clearHideTimer();
    //         hideTimer.current = setTimeout(() => {
    //             setShowControls(false);
    //         }, 10000);
    //     }
    // }, [showControls]);

    // 清除隐藏控制定时器
    const clearHideTimer = () => {
        if (hideTimer.current) {
            clearTimeout(hideTimer.current);
        }
        hideTimer.current = null;
    };

    const handleRootPress = () => {
        setShowControls(!showControls);
    };

    const togglePlayStatus = () => {
        setIsPause(!isPause);
    };

    return (
        <Pressable onPress={handleRootPress} style={styles.root}>
            {showControls ? (
                <Animated.View entering={FadeIn} exiting={FadeOut} style={[styles.mask]}>
                    <Flex block justifyContent="space-between" alignItems="center" style={styles.header}>
                        <Icon name="chevron-left" color={COLOR.white}></Icon>
                    </Flex>
                    <Flex grow={1} block alignItems="center" justifyContent="center" style={styles.body}>
                        <Pressable style={styles.bigPlayBtn} onPress={togglePlayStatus}>
                            <Icon name={isPause ? 'play' : 'pause'} color={COLOR.white} fill={COLOR.white}></Icon>
                        </Pressable>
                    </Flex>
                    <Flex alignItems="center" columnGap={SIZE.space_sm} block style={styles.footer}>
                        <Pressable onPress={togglePlayStatus}>
                            <Icon
                                name={isPause ? 'play' : 'pause'}
                                color={COLOR.white}
                                fill={COLOR.white}
                                size={SIZE.icon_sm}
                                style={styles.playBtn}></Icon>
                        </Pressable>

                        <TextX color={COLOR.white}>0:89</TextX>
                        <Slider style={styles.slider}></Slider>
                        <TextX color={COLOR.white}>12:89</TextX>
                    </Flex>
                </Animated.View>
            ) : null}

            {/*<Video resizeMode="contain" source={{ uri: 'http://vjs.zencdn.net/v/oceans.mp4' }} style={{ height: '100%' }}></Video>*/}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: COLOR.black,
        height: '100%',
        position: 'relative',
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
        backgroundColor: 'rgba(0,0,0,.3)',
        padding: SIZE.space_md,
    },
    body: {
        backgroundColor: 'green',
    },
    footer: {
        backgroundColor: 'rgba(0,0,0,.3)',
        padding: SIZE.space_md,
    },
    playBtn: {
        marginRight: SIZE.space_md,
    },
    bigPlayBtn: {
        backgroundColor: 'rgba(0,0,0,.3)',
        borderRadius: 50,
        padding: SIZE.space_lg,
    },
    slider: {
        flexGrow: 1,
        flexShrink: 1,
    },
});
