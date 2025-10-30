import React, { ReactNode, useEffect, useState } from 'react';
import { Keyboard, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useStyle } from '../../hooks';
import { COLOR } from '../../scripts/const.ts';

export interface IOverlayProps {
    afterClose?: () => void; // 关闭回调
    backgroundColor?: string;
    children?: ReactNode;
    modal?: boolean;
    overlayClosable?: boolean; // 新增：点击遮罩是否可关闭
    visible?: boolean;

    style?: {
        root?: StyleProp<ViewStyle>;
        content?: StyleProp<ViewStyle>;
    };

    onRequestClose?: () => boolean;
}

const ANIMATION_DURATION = 200;

export default function Overlay(props: IOverlayProps) {
    const {
        visible,
        backgroundColor = COLOR.bg_overlay,
        style,
        modal = true,
        children,
        afterClose,
        onRequestClose,
        overlayClosable = true, // 默认允许点击遮罩关闭
    } = props;

    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const opacity = useSharedValue(0);

    // 动画样式
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    // 键盘监听
    useEffect(() => {
        const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    // 动画效果
    useEffect(() => {
        if (visible) {
            // 进入动画
            opacity.value = withTiming(1, {
                duration: ANIMATION_DURATION,
                easing: Easing.out(Easing.cubic),
            });
        } else if (opacity.value > 0) {
            // 退出动画
            opacity.value = withTiming(0, {
                duration: ANIMATION_DURATION,
                easing: Easing.in(Easing.cubic),
            });

            // 动画完成后执行关闭回调
            setTimeout(() => {
                afterClose?.();
            }, ANIMATION_DURATION);
        }
    }, [visible]);

    // 内容样式
    const contentStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.content],
        extraStyle: [style?.content],
    });

    // 处理遮罩点击
    const handleOverlayPress = () => {
        if (overlayClosable) {
            if (onRequestClose?.() !== false) {
                afterClose?.();
            }
        }
    };

    return (
        <View style={[StyleSheet.absoluteFill, { zIndex: 96 }]} pointerEvents="box-none">
            {/* 半透明遮罩 */}
            <Pressable onPress={handleOverlayPress} style={StyleSheet.absoluteFill}>
                <Animated.View
                    style={[StyleSheet.absoluteFill, { backgroundColor }, animatedStyle]}
                    pointerEvents={modal ? 'auto' : 'none'}
                />
            </Pressable>

            {/* 内容区域 */}
            <Animated.View style={[contentStyle, animatedStyle]} pointerEvents="box-none">
                {children}
            </Animated.View>

            {/* 键盘弹出时添加底部间距 */}
            {keyboardVisible && <View style={{ height: 250 }} />}
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        height: '100%',
        pointerEvents: 'box-none',
        width: '100%',
    },
});
