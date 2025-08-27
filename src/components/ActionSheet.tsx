import { ReactNode } from 'react';
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import useStyle from '../hooks/useStyle';
import { COLOR, SIZE } from '../scripts/const';
import { Flex, IListItemProps, List, Overlay, TextX } from './index';

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
    const { options = [], visible, header, overlayClosable = true, backCloseable = true, style, onCancel, onChange } = props;

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
        option.onPress = () => {
            handleOptionPress(option.value);
        };
        return option;
    });

    return (
        <Overlay visible={visible} onPress={handleOverlayPress} onRequestClose={() => backCloseable}>
            <View style={rootStyle}>
                {header ? (
                    <Flex block alignItems="center" justifyContent="center" style={headerStyle}>
                        <TextX size={SIZE.font_h5} color={COLOR.text_desc} style={style?.headerText}>
                            {header}
                        </TextX>
                    </Flex>
                ) : null}

                <List items={formatOptions} style={{ root: style?.root, divider: style?.divider }} />
            </View>
        </Overlay>
    );
}

export default ActionSheet;

const styles = StyleSheet.create({
    root: {
        bottom: 0,
        left: 0,
        position: 'absolute',
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
