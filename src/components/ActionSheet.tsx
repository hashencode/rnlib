import { ReactNode } from 'react';
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import { Flex, Grabber, IListItemProps, Overlay, List, TextX, PressHighlight } from './index';
import useStyle from '../hooks/useStyle';

export type IActionSheetOptionValue = string | number;
export interface IActionSheetOption extends IListItemProps {
    value: IActionSheetOptionValue; // 选项值
}

export interface IActionSheetProps {
    backCloseable?: boolean; // 允许返回操作关闭
    cancelText?: ReactNode; // 取消按钮文本
    header?: ReactNode; // 头部插槽
    options: IActionSheetOption[]; // 选项
    overlayClosable?: boolean; // 允许点击蒙层关闭
    showCancel?: boolean; // 显示取消按钮
    visible?: boolean; // 显隐

    style?: {
        cancelButton?: StyleProp<ViewStyle>; // 取消按钮样式
        cancelText?: StyleProp<TextStyle>; // 取消按钮文本样式
        divider?: StyleProp<ViewStyle>; // 分割线样式
        grabber?: StyleProp<ViewStyle>; // 抓手样式
        header?: StyleProp<ViewStyle>; // 头部样式
        headerText?: StyleProp<TextStyle>; // 头部文本样式
        root: StyleProp<ViewStyle>; // 根节点样式
    }; // 样式

    onCancel?: () => void; // 关闭事件回调
    onChange?: (val: IActionSheetOptionValue) => void; // 点击选项事件回调
}

function ActionSheet(props: IActionSheetProps) {
    const {
        options = [],
        showCancel = true,
        cancelText = '取消',
        visible,
        header,
        overlayClosable = true,
        backCloseable = true,
        style,
        onCancel,
        onChange,
    } = props;

    // 头部节点样式
    const headerStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.header],
        extraStyle: [style?.header],
    });

    // 选项节点样式
    const cancelButtonStyle = useStyle<ViewStyle>({
        defaultStyle: [],
        extraStyle: [style?.cancelButton],
    });

    // 处理选项点击
    const handleOptionPress = (val: IActionSheetOptionValue) => {
        onChange?.(val);
    };

    // 处理取消按钮点击
    const handleCancel = () => {
        onCancel?.();
    };

    // 遮罩点击
    const handleOverlayPress = () => {
        if (overlayClosable) {
            handleCancel();
        }
    };

    // 格式化选项
    const formatOptions = options.map(option => {
        option.onPress = () => {
            handleOptionPress(option.value);
        };
        return option;
    });

    return (
        <Overlay visible={visible} onPress={handleOverlayPress} onRequestClose={() => backCloseable}>
            <Flex column justifyContent="flex-end" grow={1}>
                {header ? (
                    <Flex block alignItems="center" justifyContent="center" style={headerStyle}>
                        <TextX size={SIZE.font_h5} color={COLOR.text_desc} style={style?.headerText}>
                            {header}
                        </TextX>
                    </Flex>
                ) : null}

                <List items={formatOptions} style={{ root: style?.root, divider: style?.divider }} />

                {showCancel ? (
                    <>
                        <View style={styles.footerSpace} />
                        <PressHighlight onPress={handleCancel}>
                            <View style={cancelButtonStyle}>
                                <TextX size={SIZE.font_h2} style={style?.cancelText}>
                                    {cancelText}
                                </TextX>
                            </View>
                        </PressHighlight>
                    </>
                ) : null}

                <Grabber style={style?.grabber} />
            </Flex>
        </Overlay>
    );
}

export default ActionSheet;

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLOR.white,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: COLOR.border_default,
        minHeight: SIZE.action_sheet_option_height,
        paddingHorizontal: SIZE.space_xl,
        paddingVertical: SIZE.space_md,
    },
    footerSpace: {
        backgroundColor: COLOR.bg_page,
        height: SIZE.space_lg,
    },
});
