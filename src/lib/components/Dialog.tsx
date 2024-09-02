import { ReactNode } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import _ from 'lodash';
import { useUpdateEffect } from 'ahooks';
import { Button, Flex, Overlay, PressHighlight, Separator, Text } from '@/lib/components';

export interface DialogProps {
    actions?: { text: string; onPress?: () => void; style?: { wrapper?: ViewStyle; text?: TextStyle } }[]; // 动作列表
    afterClose?: () => void; // 遮罩销毁事件回调
    backCloseable?: boolean; // 允许返回操作关闭
    buttons?: { text: string; onPress?: () => void; style?: { wrapper?: ViewStyle; text?: TextStyle } }[]; // 按钮列表
    children?: ReactNode; // 内容插槽
    content?: string; // 描述文本
    overlayClosable?: boolean; // 允许点击蒙层关闭
    style?: {
        wrapper?: ViewStyle;
        body?: ViewStyle;
        title?: TextStyle;
        content?: TextStyle;
    }; // 样式
    title?: string; // 标题文本
    visible?: boolean; // 显隐
    onCancel?: () => void; // 取消事件回调
}

function Dialog(props: DialogProps) {
    const { backCloseable, content, title, buttons, actions, visible, overlayClosable = true, onCancel, afterClose, style } = props;

    // 关闭回调
    useUpdateEffect(() => {
        !visible && afterClose?.();
    }, [visible]);

    // 遮罩点击
    const handleOverlayPress = () => {
        overlayClosable && onCancel?.();
    };

    // 返回操作回调
    const handleBackClose = () => {
        backCloseable && onCancel?.();
    };

    // 渲染按钮
    const renderButtons = () => {
        if (!_.isArray(buttons) || buttons.length <= 0) {
            return null;
        }
        const buttonLen = buttons.length;

        return (
            // 控制flex方向
            <Flex block column={buttonLen > 2}>
                {buttons.map((buttonItem, index) => {
                    // 分割线
                    const separator = (
                        <>
                            <Separator style={styles.buttonTopSeparator} />
                            {index > 0 && buttonLen <= 2 ? <View style={styles.buttonCenterSeparator} /> : null}
                        </>
                    );

                    let defaultColor = COLOR.text_title;
                    switch (true) {
                        case buttonLen === 1:
                            defaultColor = COLOR.text_primary;
                            break;
                        case buttonLen === 2 && index === 1:
                        case buttonLen > 2 && index === 0:
                            defaultColor = COLOR.text_primary;
                            break;
                    }
                    return (
                        <PressHighlight
                            style={{ width: buttonLen === 2 ? '50%' : '100%' }}
                            onPress={() => buttonItem?.onPress?.()}
                            key={index}>
                            <Flex
                                block
                                justifyContent="center"
                                alignItems="center"
                                style={StyleSheet.flatten([styles.button, buttonItem?.style?.wrapper])}>
                                <Text size={SIZE.font_h2} color={defaultColor} style={buttonItem?.style?.text}>
                                    {buttonItem?.text}
                                </Text>
                            </Flex>
                        </PressHighlight>
                    );
                })}
            </Flex>
        );
    };

    // 渲染动作
    const renderActions = () => {
        if (!_.isArray(actions) || actions.length <= 0) {
            return null;
        }

        return (
            // 控制flex方向
            <Flex block column style={styles.actionsContainer}>
                {actions.map((actionItem, index) => {
                    if (index === 0) {
                        return (
                            <View style={StyleSheet.flatten([styles.primaryAction, actionItem?.style?.wrapper])} key={index}>
                                <Button
                                    type="primary"
                                    onPress={actionItem?.onPress}
                                    size="large"
                                    block
                                    style={{ text: actionItem?.style?.text }}>
                                    {actionItem.text}
                                </Button>
                            </View>
                        );
                    }

                    return (
                        <PressHighlight onPress={() => actionItem?.onPress?.()} key={index} style={styles.action}>
                            {/* 按钮 */}
                            <Flex block justifyContent="center" alignItems="center" style={actionItem?.style?.wrapper}>
                                <Text size={SIZE.font_h2} color={COLOR.text_primary} style={actionItem?.style?.text}>
                                    {actionItem.text}
                                </Text>
                            </Flex>
                        </PressHighlight>
                    );
                })}
            </Flex>
        );
    };

    return (
        <Overlay visible={visible} onPress={handleOverlayPress} afterDestroy={afterClose} onRequestClose={handleBackClose}>
            {/*主容器*/}
            <Flex column alignItems="center" style={StyleSheet.flatten([styles.wrapper, style?.wrapper])}>
                {/*头部*/}
                <Flex column block alignItems="center" rowGap={SIZE.space_middle} style={StyleSheet.flatten([styles.body, style?.body])}>
                    <Text size={SIZE.font_h2} style={StyleSheet.flatten([styles.title, style?.title])}>
                        {title}
                    </Text>
                    <Text size={SIZE.font_h5} style={style?.content}>
                        {content}
                    </Text>
                    {props.children}
                </Flex>
                {/*尾部*/}
                {renderButtons()}
                {renderActions()}
            </Flex>
        </Overlay>
    );
}

export default Dialog;

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: COLOR.white,
        borderRadius: SIZE.radius_large,
        overflow: 'hidden',
        width: SIZE.dialog_width,
        zIndex: 99,
    },
    body: {
        paddingHorizontal: SIZE.space_large,
        paddingVertical: SIZE.space_max,
    },
    title: {
        fontWeight: SIZE.weight_title,
        marginBottom: SIZE.space_middle,
    },
    buttonContainer: {
        borderColor: COLOR.border_controller,
        borderTopWidth: SIZE.border_default,
        position: 'relative',
    },
    button: {
        backgroundColor: COLOR.white,
        borderColor: COLOR.border_controller,
        height: SIZE.button_height_large,
    },
    buttonTopSeparator: {
        bottom: 'auto',
        top: 0,
    },
    buttonCenterSeparator: {
        backgroundColor: COLOR.border_default,
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: SIZE.border_default,
    },
    actionsContainer: {
        paddingBottom: SIZE.space_large,
    },
    primaryAction: {
        paddingHorizontal: SIZE.space_large,
        width: '100%',
    },
    action: {
        marginTop: SIZE.space_ultra,
        width: '100%',
    },
});
