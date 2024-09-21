import { StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import _ from 'lodash';
import { Button, Flex, Overlay, TextX } from './index';
import { IDialogProps } from '../_types/components';
import { Fragment } from 'react';
import useStyle from '../hooks/useStyle';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

function Dialog(props: IDialogProps) {
    const { backCloseable, content, title, buttons, actions, visible, overlayClosable = true, onCancel, afterClose, style } = props;

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
                                type="text"
                                size="lg"
                                {...button}
                                style={{
                                    root: { width: buttonLen === 2 ? '50%' : '100%', borderRadius: 0 },
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
            <Flex block column rowGap={SIZE.space_md} alignItems="center" style={styles.actionContainer}>
                {actions.map((action, index) => {
                    if (index === 0) {
                        return <Button block type="primary" size="lg" {...action} key={index}></Button>;
                    }
                    return (
                        <Button
                            block
                            type="text"
                            {...action}
                            style={{ text: { color: COLOR.text_subtitle }, ...(action.style || {}) }}
                            key={index}></Button>
                    );
                })}
            </Flex>
        );
    };

    return (
        <Overlay visible={visible} onPress={handleOverlayPress} afterDestroy={afterClose} onRequestClose={handleBackClose}>
            {/*主容器*/}
            <Flex column alignItems="center" style={rootStyle}>
                <Flex column block alignItems="center" rowGap={SIZE.space_md} style={contentStyle}>
                    <TextX size={SIZE.font_h2} style={headerStyle}>
                        {title}
                    </TextX>
                    <TextX size={SIZE.font_h5} style={style?.body}>
                        {content}
                    </TextX>
                </Flex>
                {renderButtons()}
                {renderActions()}
            </Flex>
        </Overlay>
    );
}

export default Dialog;

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
    },
});
