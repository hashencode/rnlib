import _ from 'lodash';
import { ForwardedRef, forwardRef, ReactNode, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { default as ActionSheetOrigin, ActionSheetRef } from 'react-native-actions-sheet';

import { useMergedState } from '../hooks';
import useStyle from '../hooks/useStyle';
import { COLOR, SIZE } from '../scripts/const';
import { mergeRefs } from '../scripts/utils';
import Button, { IButtonProps } from './Button';
import { Flex, Grabber, Icon, PressHighlight, TextX } from './index';

export interface IPickerOption {
    children?: ReactNode; // 内容插槽
    disabled?: boolean; // 禁用
    subtitle?: ReactNode; // 副标题
    title: ReactNode; // 主文本
    value: IPickerRawValue; // 选项值
}
export interface IPickerProps {
    backCloseable?: boolean; // 允许返回操作关闭
    cancelButtonProps?: IButtonProps; // 取消按钮属性
    cancelText?: string; // 取消按钮文案
    checkIcon?: ReactNode; // 自定义选中图标
    defaultValue?: IPickerValue; // 默认值
    maxHeight?: number; // 最大高度
    multiple?: boolean; // 多选
    okButtonProps?: IButtonProps; // 确定按钮属性
    okText?: string; // 确认按钮文案（多选）
    onCancel?: () => void; // 取消按钮点击事件回调
    onChange?: (val: IPickerValue) => void; // 值变动事件回调
    onOpen?: () => void; // 开启事件回调
    options: IPickerOption[]; // 选项
    overlayClosable?: boolean; // 允许点击蒙层关闭

    style?: {
        cancelButton?: StyleProp<ViewStyle>; // 取消按钮样式
        cancelText?: StyleProp<TextStyle>; // 取消按钮文本样式
        checkIcon?: StyleProp<TextStyle>; // 选中图标样式
        divider?: StyleProp<ViewStyle>; // 分割线样式
        grabber?: StyleProp<ViewStyle>; // 抓手样式
        header?: StyleProp<ViewStyle>; // 头部样式
        headerText?: StyleProp<TextStyle>; // 头部文本样式
        option?: StyleProp<ViewStyle>; // 选项样式
        root: StyleProp<ViewStyle>; // 根节点样式
        subtitle?: StyleProp<TextStyle>; // 副标题样式
        title?: StyleProp<TextStyle>; // 标题样式
    }; // 样式

    title?: ReactNode; // 头部标题插槽
    value?: IPickerValue; // 受控值
    visible?: boolean; // 显隐
}
export type IPickerRawValue = number | string;
export type IPickerValue = IPickerRawValue | IPickerRawValue[] | undefined;

function Picker(props: IPickerProps, ref: ForwardedRef<ActionSheetRef>) {
    const {
        backCloseable = true,
        cancelButtonProps,
        cancelText = '取消',
        checkIcon,
        defaultValue,
        maxHeight = 300,
        multiple,
        okButtonProps,
        okText = '确定',
        onCancel,
        onChange,
        onOpen,
        options = [],
        overlayClosable = true,
        style,
        title,
        value,
        visible,
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

    const [innerValue, handleChange] = useMergedState<IPickerValue>(multiple ? [] : undefined, {
        defaultValue,
        value,
    });
    const [valueCache, setValueCache] = useState<IPickerRawValue[]>(innerValue as IPickerRawValue[]);

    // 处理选项点击
    const handleOptionPress = (val: IPickerRawValue) => {
        if (multiple) {
            if (_.isArray(valueCache)) {
                const newValue = valueCache?.includes(val) ? valueCache.filter(item => item !== val) : [...valueCache, val];
                setValueCache(newValue);
            } else {
                console.error('innerValue is not array');
                setValueCache([val]);
            }
        } else {
            handleChange(val);
            onChange?.(val);
        }
    };

    // 多选模式下点击确定
    const handleConfirm = () => {
        handleChange(valueCache);
        onChange?.(valueCache);
    };

    // 处理取消按钮点击
    const handleCancel = () => {
        if (multiple) {
            setValueCache(innerValue as IPickerRawValue[]);
        }
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

    // 渲染选中图标
    const renderCheckIcon = (option: IPickerOption) => {
        if ((multiple && valueCache?.includes(option.value)) || (!multiple && option?.value === innerValue)) {
            return checkIcon || <Icon color={COLOR.primary} name="check" size={SIZE.icon_xs} style={style?.checkIcon} />;
        }
        return null;
    };

    return (
        <ActionSheetOrigin
            closable={overlayClosable}
            containerStyle={rootStyle}
            enableRouterBackNavigation={backCloseable}
            onClose={onCancel}
            onOpen={onOpen}
            ref={mergeRefs([ref, localRef])}>
            {/* 头部 */}
            {title || multiple ? (
                <Flex alignItems="center" justifyContent="space-between" style={headerStyle}>
                    {/* 取消按钮 */}
                    <View style={styles.actionButton}>
                        <Button onPress={handleCancel} style={{ text: { color: COLOR.text_subtitle } }} type="text" {...cancelButtonProps}>
                            {cancelText}
                        </Button>
                    </View>
                    {/* 标题文本 */}
                    <Flex alignItems="center" grow={1} justifyContent="center">
                        <TextX size={SIZE.font_h2} weight={SIZE.weight_title}>
                            {title}
                        </TextX>
                    </Flex>
                    {/*确定按钮*/}
                    <View style={styles.actionButton}>
                        <Button onPress={handleConfirm} style={{ text: { color: COLOR.primary } }} type="text" {...okButtonProps}>
                            {okText}
                        </Button>
                    </View>
                </Flex>
            ) : null}

            {/* 内容 */}
            <ScrollView style={{ maxHeight: maxHeight }}>
                {options.map(option => {
                    return (
                        <PressHighlight disabled={option.disabled} key={option.value} onPress={() => handleOptionPress(option.value)}>
                            <Flex alignItems="center" justifyContent="space-between" style={optionStyle}>
                                <Flex alignItems="center" grow={1}>
                                    <Flex column shrink={0}>
                                        <TextX size={SIZE.font_h2} style={style?.title}>
                                            {option.title}
                                        </TextX>
                                        <TextX color={COLOR.text_desc} style={style?.subtitle}>
                                            {option.subtitle}
                                        </TextX>
                                    </Flex>
                                    <Flex grow={1}>{option?.children}</Flex>
                                </Flex>
                                <Flex alignItems="center" justifyContent="flex-end" shrink={0}>
                                    {renderCheckIcon(option)}
                                </Flex>
                            </Flex>
                            <View style={dividerStyle}></View>
                        </PressHighlight>
                    );
                })}
            </ScrollView>

            <Grabber style={style?.grabber} />
        </ActionSheetOrigin>
    );
}

export default forwardRef(Picker);

const styles = StyleSheet.create({
    actionButton: {
        flexShrink: 0,
    },
    divider: {
        borderBottomWidth: SIZE.border_default,
        borderColor: COLOR.border_default,
    },
    header: {
        backgroundColor: COLOR.white,
        borderBottomWidth: SIZE.border_default,
        borderColor: COLOR.border_default,
        minHeight: SIZE.action_sheet_option_height,
        paddingHorizontal: SIZE.space_sm,
        paddingVertical: SIZE.space_md,
        position: 'relative',
    },
    option: {
        backgroundColor: COLOR.white,
        minHeight: SIZE.picker_item_height,
        paddingHorizontal: SIZE.space_xl,
        paddingVertical: SIZE.space_md,
    },
    root: {
        backgroundColor: COLOR.white,
    },
});
