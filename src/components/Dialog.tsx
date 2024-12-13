import _ from 'lodash';
import { Fragment, ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import useStyle from '../hooks/useStyle';
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
    onCancel?: () => void; // 取消事件回调
    overlayClosable?: boolean; // 允许点击蒙层关闭
    style?: {
        body?: StyleProp<ViewStyle>; // 主体样式
        content?: StyleProp<TextStyle>; // 内容样式
        header?: StyleProp<TextStyle>; // 头部样式
        root?: StyleProp<ViewStyle>; // 根节点样式
    }; // 样式

    title?: ReactNode; // 标题文本

    visible?: boolean; // 显隐
}

export default function Dialog(props: IDialogProps) {
    const { actions, afterClose, backCloseable, buttons, content, onCancel, overlayClosable = true, style, title, visible } = props;

    // 根节点样式
    const rootStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.root],
        extraStyle: [style?.root],
    });

    // 内容样式
    const contentStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.content],
        extraStyle: [style?.content],
    });

    // 头部样式
    const headerStyle = useStyle<TextStyle>({
        defaultStyle: [styles.header],
        extraStyle: [style?.header],
    });

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
            <Flex block column={buttonLen > 2} style={styles.buttonContainer}>
                {buttons.map((button, index) => {
                    const isPrimary = buttonLen === 1 || (buttonLen === 2 && index === 1) || (buttonLen > 2 && index === 0);
                    return (
                        <Fragment key={index}>
                            {buttonLen > 2 && index > 0 ? <View style={styles.buttonTopDivider} /> : null}
                            {index > 0 && buttonLen <= 2 ? <View style={styles.buttonCenterDivider} /> : null}
                            <Button
                                size="lg"
                                type="text"
                                {...button}
                                style={{
                                    root: { borderRadius: 0, width: buttonLen === 2 ? '50%' : '100%' },
                                    text: { color: isPrimary ? COLOR.text_primary : COLOR.text_subtitle },
                                    ...(button.style || {}),
                                }}></Button>
                        </Fragment>
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
            <Flex alignItems="center" block column rowGap={SIZE.space_md} style={styles.actionContainer}>
                {actions.map((action, index) => {
                    if (index === 0) {
                        return <Button block size="lg" type="primary" {...action} key={index}></Button>;
                    }
                    return (
                        <Button
                            block
                            type="text"
                            {...action}
                            key={index}
                            style={{ text: { color: COLOR.text_subtitle }, ...(action.style || {}) }}></Button>
                    );
                })}
            </Flex>
        );
    };

    return (
        <Overlay afterDestroy={afterClose} onPress={handleOverlayPress} onRequestClose={handleBackClose} visible={visible}>
            {/*主容器*/}
            <Flex alignItems="center" column style={rootStyle}>
                <Flex alignItems="center" block column rowGap={SIZE.space_md} style={contentStyle}>
                    <TextX size={SIZE.font_h2} style={headerStyle}>
                        {title}
                    </TextX>
                    <TextX size={SIZE.font_h5} style={[styles.body, style?.body]}>
                        {content}
                    </TextX>
                </Flex>
                {renderButtons()}
                {renderActions()}
            </Flex>
        </Overlay>
    );
}

const styles = StyleSheet.create({
    actionContainer: {
        padding: SIZE.space_lg,
        paddingTop: 0,
    },
    body: {
        color: COLOR.text_subtitle,
        lineHeight: SIZE.font_h5 * 1.5,
        textAlign: 'center',
    },
    button: {
        backgroundColor: COLOR.white,
        borderColor: COLOR.border_controller,
        height: SIZE.button_height_lg,
    },
    buttonCenterDivider: {
        borderColor: COLOR.border_controller,
        borderLeftWidth: SIZE.border_default,
        height: '100%',
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
    content: {
        paddingHorizontal: SIZE.space_lg,
        paddingVertical: SIZE.space_2xl,
    },
    header: {
        fontWeight: SIZE.weight_title,
        marginBottom: SIZE.space_md,
    },
    root: {
        backgroundColor: COLOR.white,
        borderRadius: SIZE.radius_lg,
        overflow: 'hidden',
        width: SIZE.dialog_width,
        zIndex: 99,
    },
});
