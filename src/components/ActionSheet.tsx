import { ForwardedRef, forwardRef, ReactNode, useEffect, useRef } from 'react';
import { ScrollView, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import { TextX, Flex, PressHighlight, Grabber } from './index';
import { ActionSheetRef, default as ActionSheetOrigin } from 'react-native-actions-sheet';
import { mergeRefs } from '../scripts/utils';
import useStyle from '../hooks/useStyle';

export type IActionSheetOptionValue = string | number;

export interface IActionSheetOption {
    children?: ReactNode; // 内容插槽
    disabled?: boolean; // 禁用
    subtitle?: ReactNode; // 副标题
    title: ReactNode; // 主文本
    value: IActionSheetOptionValue; // 选项值
}

export interface IActionSheetProps {
    backCloseable?: boolean; // 允许返回操作关闭
    cancelText?: ReactNode; // 取消按钮文本
    header?: ReactNode; // 头部插槽
    maxHeight?: number; // 最大高度
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
        option?: StyleProp<ViewStyle>; // 选项样式
        root: StyleProp<ViewStyle>; // 根节点样式
        subtitle?: StyleProp<TextStyle>; // 副标题样式
        title?: StyleProp<TextStyle>; // 标题样式
    }; // 样式

    onCancel?: () => void; // 关闭事件回调
    onChange?: (val: IActionSheetOptionValue) => void; // 点击选项事件回调
    onOpen?: () => void; // 开启事件回调
}

function ActionSheet(props: IActionSheetProps, ref: ForwardedRef<ActionSheetRef>) {
    const {
        options = [],
        showCancel = true,
        cancelText = '取消',
        visible,
        header,
        overlayClosable = true,
        backCloseable = true,
        style,
        onOpen,
        onCancel,
        onChange,
    } = props;

    const localRef = useRef<ActionSheetRef>(null);

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

    // 选项节点样式
    const optionStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.option],
        extraStyle: [style?.option],
    });

    // 选项节点样式
    const dividerStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.divider],
        extraStyle: [style?.divider],
    });

    // 选项节点样式
    const cancelButtonStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.option],
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

    // 监听visible的变化
    useEffect(() => {
        const _ref = mergeRefs<ActionSheetRef>([ref, localRef]);
        if (visible && _ref) {
            _ref.current?.show();
        } else {
            _ref?.current?.hide();
        }
    }, [visible]);

    return (
        <ActionSheetOrigin
            ref={mergeRefs([ref, localRef])}
            containerStyle={rootStyle}
            enableRouterBackNavigation={backCloseable}
            closable={overlayClosable}
            onOpen={onOpen}
            onClose={onCancel}>
            {header ? (
                <Flex alignItems="center" justifyContent="center" style={headerStyle}>
                    <TextX size={SIZE.font_h5} color={COLOR.text_desc} style={style?.headerText}>
                        {header}
                    </TextX>
                </Flex>
            ) : null}

            <ScrollView>
                {options.map((item, index) => {
                    return (
                        <PressHighlight disabled={item.disabled} onPress={() => handleOptionPress(item.value)} key={index}>
                            <View style={optionStyle}>
                                <TextX size={SIZE.font_h2} style={style?.title}>
                                    {item?.title}
                                </TextX>
                                <TextX color={COLOR.text_desc} style={style?.subtitle}>
                                    {item?.subtitle}
                                </TextX>
                                {item?.children}
                            </View>
                            <View style={dividerStyle}></View>
                        </PressHighlight>
                    );
                })}
            </ScrollView>

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
        </ActionSheetOrigin>
    );
}

export default forwardRef(ActionSheet);

const styles = StyleSheet.create({
    root: {
        backgroundColor: COLOR.white,
    },
    header: {
        backgroundColor: COLOR.white,
        borderBottomWidth: SIZE.border_default,
        borderColor: COLOR.border_default,
        minHeight: SIZE.action_sheet_option_height,
        paddingHorizontal: SIZE.space_xl,
        paddingVertical: SIZE.space_md,
    },
    option: {
        alignItems: 'center',
        backgroundColor: COLOR.white,
        display: 'flex',
        justifyContent: 'center',
        minHeight: SIZE.action_sheet_option_height,
        paddingHorizontal: SIZE.space_xl,
        paddingVertical: SIZE.space_md,
        position: 'relative',
    },
    divider: {
        borderBottomWidth: SIZE.border_default,
        borderColor: COLOR.border_default,
    },
    footerSpace: {
        backgroundColor: COLOR.bg_page,
        height: SIZE.space_lg,
    },
});
