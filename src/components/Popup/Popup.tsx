import React, { ReactNode, useEffect } from 'react';
import { Dimensions, Pressable, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import useStyle from '../../hooks/useStyle.tsx';
import { COLOR, SIZE } from '../../scripts/const.ts';
import { Flex, Grabber, TextX } from '../index.tsx';

export interface IPopupProps {
    backCloseable?: boolean;
    cancelText?: ReactNode;
    content?: ReactNode;
    header?: ReactNode;
    overlayClosable?: boolean;
    visible?: boolean;
    afterClose?: () => void;

    style?: {
        divider?: StyleProp<ViewStyle>;
        grabber?: StyleProp<ViewStyle>;
        header?: StyleProp<ViewStyle>;
        headerText?: StyleProp<TextStyle>;
        root?: StyleProp<ViewStyle>;
    };

    onCancel?: () => void;
}

const ANIMATION_DURATION = 300;

export default function Popup(props: IPopupProps) {
    const { visible, header, overlayClosable = true, style, content, onCancel, afterClose } = props;

    const screenHeight = Dimensions.get('window').height;
    const translateY = useSharedValue(screenHeight);
    const opacity = useSharedValue(0);

    // 动画样式
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    // 背景动画样式
    const bgAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    // 动画效果
    useEffect(() => {
        if (visible) {
            // 进入动画
            translateY.value = withTiming(0, {
                duration: ANIMATION_DURATION,
                easing: Easing.out(Easing.cubic),
            });
            opacity.value = withTiming(1, {
                duration: ANIMATION_DURATION,
                easing: Easing.out(Easing.cubic),
            });
        } else if (opacity.value > 0) {
            // 退出动画
            translateY.value = withTiming(screenHeight, {
                duration: ANIMATION_DURATION,
                easing: Easing.in(Easing.cubic),
            });
            opacity.value = withTiming(0, {
                duration: ANIMATION_DURATION,
                easing: Easing.in(Easing.cubic),
            });

            // 动画完成后执行关闭回调
            setTimeout(() => {
                afterClose?.();
            }, ANIMATION_DURATION);
        }
    }, [visible, afterClose]);

    // 根节点样式
    const rootStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.root],
        extraStyle: [style?.root],
    });

    // 头部节点样式
    const headerStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.header],
        extraStyle: [style?.header],
    });

    // 遮罩点击
    const handleOverlayPress = () => {
        if (overlayClosable) {
            onCancel?.();
        }
    };

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            {/* 半透明遮罩 */}
            <Pressable onPress={handleOverlayPress} style={StyleSheet.absoluteFill}>
                <Animated.View
                    style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)' }, bgAnimatedStyle]}
                    pointerEvents="auto"
                />
            </Pressable>

            {/* Popup 内容 */}
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    animatedStyle,
                    {
                        top: 'auto',
                        zIndex: 97,
                    },
                ]}>
                <View style={rootStyle}>
                    {header ? (
                        <Flex block alignItems="center" justifyContent="center" style={headerStyle}>
                            <TextX size={SIZE.font_h5} color={COLOR.text_desc} style={style?.headerText}>
                                {header}
                            </TextX>
                        </Flex>
                    ) : null}

                    {content}
                </View>

                {/* 底部安全区域背景色 */}
                <Grabber style={style?.grabber} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: COLOR.white,
        borderTopLeftRadius: SIZE.radius_lg,
        borderTopRightRadius: SIZE.radius_lg,
        paddingBottom: SIZE.space_md,
    },
    header: {
        backgroundColor: COLOR.white,
        borderBottomWidth: SIZE.border_default,
        borderColor: COLOR.border_default,
        minHeight: SIZE.action_sheet_option_height,
        paddingHorizontal: SIZE.space_xl,
        paddingVertical: SIZE.space_md,
    },
});
