import React, { ReactNode, useEffect } from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewStyle, useWindowDimensions } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLOR, SIZE } from '../scripts/const';
import { Flex, TextX } from './index';

export interface IMessageProps {
    afterClose?: () => void;
    content?: ReactNode;
    duration?: number;
    position?: 'top' | 'center' | 'bottom';

    style?: {
        content?: StyleProp<TextStyle>;
        root?: StyleProp<ViewStyle>;
    };
}

const ANIMATION_DURATION = 200;

export default function Message(props: IMessageProps) {
    const { afterClose, content, duration = 3000, style, position = 'top' } = props;

    const { width: deviceWidth } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(position === 'top' ? -50 : position === 'bottom' ? 50 : 0);

    // 动画样式
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ translateY: translateY.value }],
        };
    });

    // 动画效果
    useEffect(() => {
        // 进入动画
        opacity.value = withTiming(1, {
            duration: ANIMATION_DURATION,
            easing: Easing.out(Easing.cubic),
        });
        translateY.value = withTiming(0, {
            duration: ANIMATION_DURATION,
            easing: Easing.out(Easing.cubic),
        });

        let closeTimer: NodeJS.Timeout | null = null;
        if (duration > 0) {
            closeTimer = setTimeout(() => {
                // 退出动画
                opacity.value = withTiming(0, {
                    duration: ANIMATION_DURATION,
                    easing: Easing.in(Easing.cubic),
                });

                translateY.value = withTiming(position === 'top' ? -50 : position === 'bottom' ? 50 : 0, {
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
    }, [afterClose, duration, position]);

    // 根据位置设置容器样式
    const getPositionStyle: () => ViewStyle = () => {
        switch (position) {
            case 'top':
                return { top: SIZE.space_md + insets.top };
            case 'bottom':
                return { bottom: SIZE.space_md + insets.bottom };
            default: // center
                return {
                    top: '50%',
                    transform: [{ translateY: -25 }], // 居中偏移
                };
        }
    };

    return (
        <Animated.View style={[styles.container, getPositionStyle(), animatedStyle]}>
            <Flex style={[styles.root, style?.root, { width: deviceWidth - SIZE.space_md * 2 }]}>
                <TextX size={SIZE.font_h5} style={style?.content}>
                    {content}
                </TextX>
            </Flex>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        left: SIZE.space_md,
        position: 'absolute',
        right: SIZE.space_md,
        zIndex: 99,
    },
    root: {
        backgroundColor: COLOR.white,
        borderColor: COLOR.border_controller,
        borderRadius: SIZE.radius_md,
        borderWidth: SIZE.border_default,
        padding: SIZE.space_lg,
        width: '100%',
    },
});
