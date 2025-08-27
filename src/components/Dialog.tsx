import { isArray } from 'lodash';
import { Fragment, ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { COLOR, SIZE } from '../scripts/const';
import { IButtonProps } from './Button';
import { Button, Flex, Overlay, TextX } from './index';

export interface IDialogProps {
    actions?: IButtonProps[]; // 动作列表
    afterClose?: () => void; // 遮罩销毁事件回调
    backCloseable?: boolean; // 允许返回操作关闭
    buttons?: IButtonProps[]; // 按钮列表
    content?: ReactNode; // 描述文本
    id?: string; // 唯一id
    overlayClosable?: boolean; // 允许点击蒙层关闭
    title?: ReactNode; // 标题文本
    visible?: boolean; // 显隐

    style?: {
        body?: StyleProp<ViewStyle>; // 主体样式
        content?: StyleProp<TextStyle>; // 内容样式
        header?: StyleProp<TextStyle>; // 头部样式
        root?: StyleProp<ViewStyle>; // 根节点样式
    }; // 样式

    onCancel?: () => void; // 取消事件回调
}

export default function Dialog(props: IDialogProps) {
    const { backCloseable, content, title, buttons, actions, visible, overlayClosable = true, onCancel, afterClose, style } = props;

    // 遮罩点击
    const handleOverlayPress = () => {
        overlayClosable && onCancel?.();
    };

    // 返回操作回调
    const handleBackClose = () => {
        if (backCloseable) {
            return false;
        } else {
            onCancel?.();
            return true;
        }
    };

    // 渲染按钮
    const renderButtons = () => {
        if (!isArray(buttons) || buttons.length <= 0) {
            return null;
        }

        const buttonLen = buttons.length;
        return (
            // 控制flex方向
            <Flex block column={buttonLen > 2} style={styles.buttonContainer}>
                {buttons.map((button, index) => {
                    const isPrimary = buttonLen === 1 || (buttonLen === 2 && index === 1) || (buttonLen > 2 && index === 0);
                    return (
                        <Fragment key={index}>
                            {buttonLen > 2 && index > 0 ? <View style={styles.buttonTopDivider} /> : null}
                            {index > 0 && buttonLen <= 2 ? <View style={styles.buttonCenterDivider} /> : null}
                            <Button
                                type="text"
                                size="lg"
                                {...button}
                                style={{
                                    root: { width: buttonLen === 2 ? '50%' : '100%', borderRadius: 0 },
                                    text: { color: isPrimary ? COLOR.text_primary : COLOR.text_subtitle },
                                    ...(button.style || {}),
                                }}
                            />
                        </Fragment>
                    );
                })}
            </Flex>
        );
    };

    // 渲染动作
    const renderActions = () => {
        if (!isArray(actions) || actions.length <= 0) {
            return null;
        }

        return (
            <View style={styles.actionContainer}>
                {actions.map((action, index) => {
                    if (index === 0) {
                        return <Button block type="primary" size="lg" {...action} key={index} />;
                    }
                    return (
                        <Button
                            block
                            type="text"
                            {...action}
                            style={{ root: { marginTop: SIZE.space_md }, text: { color: COLOR.text_subtitle }, ...(action.style || {}) }}
                            key={index}
                        />
                    );
                })}
            </View>
        );
    };

    return (
        <Overlay afterDestroy={afterClose} onPress={handleOverlayPress} onRequestClose={handleBackClose} visible={visible}>
            <Flex alignItems="center" column grow={1} justifyContent="center">
                {/*主容器*/}
                <Flex alignItems="center" column style={[styles.root, style?.root]}>
                    <Flex alignItems="center" block column rowGap={SIZE.space_md} style={[styles.content, style?.content]}>
                        <TextX size={SIZE.font_h2} style={[styles.header, style?.header]}>
                            {title}
                        </TextX>
                        <TextX size={SIZE.font_h5} style={[styles.body, style?.body]}>
                            {content}
                        </TextX>
                    </Flex>
                    {renderButtons()}
                    {renderActions()}
                </Flex>
            </Flex>
        </Overlay>
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
    button: {
        backgroundColor: COLOR.white,
        borderColor: COLOR.border_controller,
        height: SIZE.button_height_lg,
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
