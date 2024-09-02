import { useMemo } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import { useMergedState } from '../hooks';
import { Flex, Icon, Text } from '@/lib/components';

export type CheckboxValue = boolean;

export interface CheckboxProps {
    defaultValue?: CheckboxValue; // 默认值
    disabled?: boolean; // 禁用
    indeterminate?: boolean; // 半选
    label?: string; // 文本
    style?: ViewStyle; // 样式
    value?: CheckboxValue; // 受控值
    onChange?: (val: CheckboxValue) => void; // 值变动事件回调
}

export default function Checkbox(props: CheckboxProps) {
    const { indeterminate = false, label, defaultValue, disabled, value, style, onChange } = props;

    const [innerValue, handleChange] = useMergedState<CheckboxValue>(false, {
        defaultValue,
        value,
        onChange,
    });

    // 处理点击事件
    const handlePress = () => {
        handleChange(!innerValue);
    };

    // 边框样式
    const boxStyle = useMemo(() => {
        if (disabled) {
            return styles.iconBoxDisabled;
        } else {
            if (indeterminate) {
                return {};
            }
            return innerValue ? styles.iconBoxActive : {};
        }
    }, [disabled, innerValue]);

    // 渲染图标
    const renderIcon = () => {
        if (indeterminate) {
            return <Icon name="minus" size={SIZE.icon_tiny} color={disabled ? COLOR.text_desc : COLOR.primary} />;
        }
        if (innerValue) {
            return <Icon name="check" size={SIZE.icon_tiny} color={disabled ? COLOR.text_desc : COLOR.white} />;
        }
        return null;
    };

    return (
        <Pressable onPress={handlePress} disabled={disabled}>
            <Flex alignItems="center" columnGap={SIZE.space_small} style={style}>
                <Flex alignItems="center" justifyContent="center" style={StyleSheet.flatten([styles.iconBox, boxStyle])}>
                    {renderIcon()}
                </Flex>
                <Text size={SIZE.font_h3} color={disabled ? COLOR.text_desc : COLOR.text_title}>
                    {label}
                </Text>
            </Flex>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    iconBox: {
        borderColor: COLOR.border_controller,
        borderRadius: SIZE.radius_middle,
        borderWidth: SIZE.border_default,
        height: SIZE.checkbox_size,
        width: SIZE.checkbox_size,
    },
    iconBoxActive: {
        backgroundColor: COLOR.primary,
        borderColor: COLOR.primary,
    },
    iconBoxDisabled: {
        backgroundColor: COLOR.bg_disabled,
        borderColor: COLOR.border_disabled,
    },
});
