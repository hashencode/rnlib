import React, { ReactNode, useEffect } from 'react';
import { Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { COLOR, SIZE } from '../../scripts/const.ts';
import Flex from '../Flex.tsx';
import TextX from '../TextX.tsx';

export interface IToastProps {
    afterClose?: () => void;
    content?: ReactNode;
    type?: 'success' | 'error' | 'loading' | 'info';
    duration?: number;
    position?: 'top' | 'center' | 'bottom'; // 新增位置参数

    style?: {
        root?: StyleProp<ViewStyle>;
        content?: StyleProp<TextStyle>;
    };
}

const ANIMATION_DURATION = 200;

export default function Toast(props: IToastProps) {
    const { afterClose, content, duration = 2000, style, position = 'center' } = props;

    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.8);

    // 动画样式
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ scale: scale.value }],
        };
    });

    // 根据位置设置容器样式
    const getPositionStyle: () => ViewStyle = () => {
        switch (position) {
            case 'top':
                return { justifyContent: 'flex-start', paddingTop: SIZE.space_lg };
            case 'bottom':
                return { justifyContent: 'flex-end', paddingBottom: SIZE.space_lg };
            default:
                return { justifyContent: 'center' };
        }
    };

    // 动画效果
    useEffect(() => {
        // 进入动画
        opacity.value = withTiming(1, {
            duration: ANIMATION_DURATION,
            easing: Easing.out(Easing.cubic),
        });
        scale.value = withTiming(1, {
            duration: ANIMATION_DURATION,
            easing: Easing.out(Easing.cubic),
        });

        // 自动关闭定时器
        let closeTimer: NodeJS.Timeout | null = null;
        if (duration > 0) {
            closeTimer = setTimeout(() => {
                // 退出动画
                opacity.value = withTiming(0, {
                    duration: ANIMATION_DURATION,
                    easing: Easing.in(Easing.cubic),
                });
                scale.value = withTiming(0.8, {
                    duration: ANIMATION_DURATION,
                    easing: Easing.in(Easing.cubic),
                });

                // 使用setTimeout替代runOnJS
                setTimeout(() => {
                    afterClose?.();
                }, ANIMATION_DURATION);
            }, duration);
        }

        return () => {
            if (closeTimer) {
                clearTimeout(closeTimer);
            }
        };
    }, [afterClose, duration]);

    return (
        <Flex alignItems="center" style={[StyleSheet.absoluteFill, getPositionStyle()]}>
            <Pressable style={StyleSheet.absoluteFill} />
            <Animated.View style={[styles.root, style?.root, animatedStyle]}>
                <TextX color={COLOR.text_white} size={SIZE.font_h4} style={style?.content}>
                    {content}
                </TextX>
            </Animated.View>
        </Flex>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: COLOR.toast_background,
        borderRadius: SIZE.radius_lg,
        maxWidth: SIZE.toast_width_max,
        padding: SIZE.space_lg,
        zIndex: 101,
    },
});
