import React, { ReactNode, useEffect } from 'react';
import { Dimensions, Pressable, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import useStyle from '../hooks/useStyle';
import { COLOR, SIZE } from '../scripts/const';
import { Flex, Grabber, IListItemProps, List, TextX } from './index';

export type IActionSheetOptionValue = string | number;
export interface IActionSheetOption extends IListItemProps {
    value: IActionSheetOptionValue;
}

export interface IActionSheetProps {
    backCloseable?: boolean;
    cancelText?: ReactNode;
    header?: ReactNode;
    options: IActionSheetOption[];
    overlayClosable?: boolean;
    showCancel?: boolean;
    visible?: boolean;
    afterClose?: () => void;

    style?: {
        cancelButton?: StyleProp<ViewStyle>;
        cancelText?: StyleProp<TextStyle>;
        divider?: StyleProp<ViewStyle>;
        grabber?: StyleProp<ViewStyle>;
        header?: StyleProp<ViewStyle>;
        headerText?: StyleProp<TextStyle>;
        root: StyleProp<ViewStyle>;
    };

    onCancel?: () => void;
    onChange?: (val: IActionSheetOptionValue) => void;
}

const ANIMATION_DURATION = 300;

export default function ActionSheet(props: IActionSheetProps) {
    const {
        options = [],
        visible,
        header,
        overlayClosable = true,
        style,
        onCancel,
        onChange,
        afterClose,
        showCancel = true,
        cancelText = '取消',
    } = props;

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

    // 处理选项点击
    const handleOptionPress = (val: IActionSheetOptionValue) => {
        onChange?.(val);
    };

    // 遮罩点击
    const handleOverlayPress = () => {
        if (overlayClosable) {
            onCancel?.();
        }
    };

    // 格式化选项
    const formatOptions = options.map(option => {
        return {
            ...option,
            onPress: () => {
                if (!option.disabled) {
                    handleOptionPress(option.value);
                }
            },
        };
    });

    // 添加取消按钮
    const allOptions = showCancel
        ? [
              ...formatOptions,
              {
                  value: 'cancel',
                  text: cancelText,
                  onPress: () => onCancel?.(),
                  style: {
                      root: style?.cancelButton,
                      text: style?.cancelText,
                  },
              },
          ]
        : formatOptions;

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            {/* 半透明遮罩 */}
            <Pressable onPress={handleOverlayPress} style={StyleSheet.absoluteFill}>
                <Animated.View
                    style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)' }, bgAnimatedStyle]}
                    pointerEvents="auto"
                />
            </Pressable>

            {/* ActionSheet 内容 */}
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

                    <List
                        items={allOptions}
                        style={{
                            root: style?.root,
                            divider: style?.divider,
                        }}
                    />
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
