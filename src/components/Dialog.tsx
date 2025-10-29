import { isArray } from 'lodash';
import React, { Fragment, PropsWithChildren, ReactNode, useEffect } from 'react';
import { Pressable, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { COLOR, SIZE } from '../scripts/const';
import { IButtonProps } from './Button';
import { Button, Flex, TextX } from './index';

export interface IDialogProps extends PropsWithChildren {
    actions?: IButtonProps[];
    afterClose?: () => void;
    backCloseable?: boolean;
    buttons?: IButtonProps[];
    content?: ReactNode;
    id?: string;
    overlayClosable?: boolean;
    title?: ReactNode;
    visible?: boolean;

    style?: {
        body?: StyleProp<ViewStyle>;
        content?: StyleProp<TextStyle>;
        header?: StyleProp<TextStyle>;
        root?: StyleProp<ViewStyle>;
    };

    onCancel?: () => void;
}

const ANIMATION_DURATION = 200;

export default function Dialog(props: IDialogProps) {
    const {
        content = props.children,
        title,
        buttons,
        actions,
        visible = false,
        overlayClosable = false,
        onCancel,
        afterClose,
        style,
    } = props;

    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.9);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ scale: scale.value }],
        };
    });

    const backgroundStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    // 动画效果
    useEffect(() => {
        if (visible) {
            // 进入动画
            opacity.value = withTiming(1, {
                duration: ANIMATION_DURATION,
                easing: Easing.out(Easing.cubic),
            });
            scale.value = withTiming(1, {
                duration: ANIMATION_DURATION,
                easing: Easing.out(Easing.cubic),
            });
        } else {
            // 退出动画
            opacity.value = withTiming(0, {
                duration: ANIMATION_DURATION,
                easing: Easing.in(Easing.cubic),
            });
            scale.value = withTiming(0.9, {
                duration: ANIMATION_DURATION,
                easing: Easing.in(Easing.cubic),
            });

            // 动画完成后执行关闭回调
            setTimeout(() => {
                afterClose?.();
            }, ANIMATION_DURATION);
        }
    }, [visible, afterClose]);

    const handleOverlayPress = () => {
        if (overlayClosable) onCancel?.();
    };

    const renderButtons = () => {
        if (!isArray(buttons) || buttons.length === 0) return null;
        const len = buttons.length;

        return (
            <Flex block column={len > 2} shrink={0} style={styles.buttonContainer}>
                {buttons.map((button, i) => {
                    const isPrimary = len === 1 || (len === 2 && i === 1) || (len > 2 && i === 0);
                    return (
                        <Fragment key={i}>
                            {len > 2 && i > 0 && <View style={styles.buttonTopDivider} />}
                            {i > 0 && len <= 2 && <View style={styles.buttonCenterDivider} />}
                            <Button
                                type="text"
                                size="lg"
                                {...button}
                                style={{
                                    root: {
                                        width: len === 2 ? '50%' : '100%',
                                        borderRadius: 0,
                                    },
                                    text: {
                                        color: isPrimary ? COLOR.text_primary : COLOR.text_subtitle,
                                    },
                                    ...(button.style || {}),
                                }}
                            />
                        </Fragment>
                    );
                })}
            </Flex>
        );
    };

    const renderActions = () => {
        if (!isArray(actions) || actions.length === 0) return null;
        return (
            <View style={styles.actionContainer}>
                {actions.map((action, i) =>
                    i === 0 ? (
                        <Button block type="primary" size="lg" {...action} key={i} />
                    ) : (
                        <Button
                            block
                            type="text"
                            {...action}
                            style={{
                                root: { marginTop: SIZE.space_md },
                                text: { color: COLOR.text_subtitle },
                                ...(action.style || {}),
                            }}
                            key={i}
                        />
                    ),
                )}
            </View>
        );
    };

    return (
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: COLOR.bg_overlay }, backgroundStyle]}>
            <Pressable onPress={handleOverlayPress} style={StyleSheet.absoluteFill} />
            <Flex alignItems="center" justifyContent="center" style={StyleSheet.absoluteFill} pointerEvents="box-none">
                <Animated.View style={[styles.root, style?.root, animatedStyle]}>
                    <Flex alignItems="center" column style={[styles.content, style?.content]}>
                        {title ? (
                            <TextX size={SIZE.font_h2} style={[styles.header, style?.header]}>
                                {title}
                            </TextX>
                        ) : null}
                        {content ? (
                            <TextX size={SIZE.font_h5} style={[styles.body, style?.body]}>
                                {content}
                            </TextX>
                        ) : null}
                    </Flex>
                    {renderButtons()}
                    {renderActions()}
                </Animated.View>
            </Flex>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: COLOR.white,
        borderRadius: SIZE.radius_lg,
        overflow: 'hidden',
        width: SIZE.dialog_width,
        zIndex: 99,
    },
    content: {
        paddingHorizontal: SIZE.space_lg,
        paddingVertical: SIZE.space_2xl,
    },
    header: {
        fontWeight: SIZE.weight_title,
        marginBottom: SIZE.space_md,
    },
    body: {
        color: COLOR.text_subtitle,
        lineHeight: SIZE.font_h5 * 1.5,
        textAlign: 'center',
    },
    buttonContainer: {
        borderColor: COLOR.border_controller,
        borderTopWidth: SIZE.border_default,
    },
    buttonTopDivider: {
        borderColor: COLOR.border_controller,
        borderTopWidth: SIZE.border_default,
        width: '100%',
    },
    buttonCenterDivider: {
        borderColor: COLOR.border_controller,
        borderLeftWidth: SIZE.border_default,
        height: '100%',
    },
    actionContainer: {
        padding: SIZE.space_lg,
        paddingTop: 0,
        width: '100%',
    },
});
