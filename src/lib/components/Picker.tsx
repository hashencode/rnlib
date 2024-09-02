import { ReactNode, useState } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import _ from 'lodash';
import { useMergedState } from '../hooks';
import Button from './Button';
import { Flex, Grabber, Icon, Overlay, PressHighlight, Separator, Text } from '@/lib/components';

export type PickerRawValue = number | string;
export type PickerValue = PickerRawValue | PickerRawValue[] | undefined;
export interface PickerOption {
    content?: ReactNode; // 内容插槽
    desc?: string; // 描述文本
    disabled?: boolean; // 禁用
    title: string; // 主文本
    value: PickerRawValue; // 选项值
}
export interface PickerProps {
    backCloseable?: boolean; // 允许返回操作关闭
    cancelText?: string; // 取消按钮文案
    confirmText?: string; // 确认按钮文案（多选）
    defaultValue?: PickerValue; // 默认值
    title?: ReactNode | string; // 头部标题插槽
    overlayClosable?: boolean; // 允许点击蒙层关闭
    maxHeight?: number; // 最大高度
    multiple?: boolean; // 多选
    options: PickerOption[]; // 选项
    style?: ViewStyle; // 样式
    value?: PickerValue; // 受控值
    visible?: boolean; // 显隐
    onCancel?: () => void; // 取消按钮点击事件回调
    onChange?: (val: PickerValue) => void; // 值变动事件回调
}

export default function Picker(props: PickerProps) {
    const {
        backCloseable = true,
        cancelText = '取消',
        confirmText = '确定',
        defaultValue,
        title,
        overlayClosable = true,
        maxHeight = 300,
        multiple,
        options = [],
        style,
        value,
        visible,
        onCancel,
        onChange,
    } = props;

    const [innerValue, handleChange] = useMergedState<PickerValue>(multiple ? [] : undefined, {
        defaultValue,
        value,
    });
    const [valueCache, setValueCache] = useState<PickerRawValue[]>(innerValue as PickerRawValue[]);

    // 遮罩点击
    const handleOverlayPress = () => {
        overlayClosable && handleCancel();
    };

    // 返回操作回调
    const handleBackClose = () => {
        backCloseable && handleCancel();
    };

    // 处理选项点击
    const handleOptionPress = (val: PickerRawValue) => {
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
            setValueCache(innerValue as PickerRawValue[]);
        }
        onCancel?.();
    };

    const renderCheckIcon = (option: PickerOption) => {
        if ((multiple && valueCache?.includes(option.value)) || (!multiple && option?.value === innerValue)) {
            return <Icon name="check" color={COLOR.primary} size={SIZE.icon_mini} />;
        }
        return null;
    };

    return (
        <Overlay visible={visible} position="bottom" onPress={handleOverlayPress} onRequestClose={handleBackClose}>
            <View style={StyleSheet.flatten([styles.wrapper, style])}>
                {/* 头部 */}
                {title || multiple ? (
                    <Flex alignItems="center" justifyContent="space-between" style={styles.header}>
                        {/* 操作按钮 */}
                        <Button
                            type="text"
                            onPress={handleCancel}
                            style={{ wrapper: styles.actionButton, text: { color: COLOR.text_subtitle, fontSize: SIZE.font_h4 } }}>
                            {cancelText}
                        </Button>
                        {/* 标题文本 */}
                        <Flex justifyContent="center" alignItems="center" grow={1}>
                            {_.isString(title) ? (
                                <Text size={SIZE.font_h2} weight={SIZE.weight_title}>
                                    {title}
                                </Text>
                            ) : (
                                title
                            )}
                        </Flex>
                        {/* 操作按钮 */}
                        <Button
                            type="text"
                            onPress={handleConfirm}
                            style={{ wrapper: styles.actionButton, text: { color: COLOR.text_primary, fontSize: SIZE.font_h4 } }}>
                            {confirmText}
                        </Button>
                    </Flex>
                ) : null}

                {/* 内容 */}
                <ScrollView style={{ maxHeight: maxHeight }}>
                    {options.map(option => {
                        return (
                            <PressHighlight disabled={option.disabled} onPress={() => handleOptionPress(option.value)} key={option.value}>
                                <Flex
                                    alignItems="center"
                                    justifyContent="space-between"
                                    style={StyleSheet.flatten([styles.option, option.disabled ? styles.disabled : {}])}>
                                    <Flex alignItems="center" grow={1}>
                                        <Flex column shrink={0}>
                                            <Text size={SIZE.font_h2}>{option.title}</Text>
                                            <Text color={COLOR.text_desc}>{option.desc}</Text>
                                        </Flex>
                                        <Flex grow={1}>{option?.content}</Flex>
                                    </Flex>
                                    <Flex alignItems="center" justifyContent="flex-end" shrink={0} style={styles.checkIcon}>
                                        {renderCheckIcon(option)}
                                    </Flex>
                                </Flex>
                            </PressHighlight>
                        );
                    })}
                </ScrollView>

                <Grabber />
            </View>
        </Overlay>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: COLOR.white,
        borderTopEndRadius: SIZE.radius_large,
        borderTopStartRadius: SIZE.radius_large,
        overflow: 'hidden',
        width: '100%',
    },
    header: {
        backgroundColor: COLOR.white,
        borderBottomWidth: SIZE.border_default,
        borderColor: COLOR.border_default,
        minHeight: SIZE.action_sheet_option_height,
        paddingHorizontal: SIZE.space_small,
        paddingVertical: SIZE.space_middle,
        position: 'relative',
    },
    actionButton: {
        flexShrink: 0,
    },
    option: {
        backgroundColor: COLOR.white,
        minHeight: SIZE.picker_item_height,
        paddingHorizontal: SIZE.space_ultra,
        paddingVertical: SIZE.space_middle,
    },
    disabled: {
        opacity: COLOR.opacity_disabled_option,
    },
    checkIcon: {
        width: SIZE.icon_middle,
    },
});
