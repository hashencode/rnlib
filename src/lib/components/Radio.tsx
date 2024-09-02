import { useMemo } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import { useMergedState } from '../hooks';
import { Flex, Icon, Text } from '@/lib/components';

export type RadioValue = boolean;

export interface RadioProps {
    defaultValue?: RadioValue; // 默认值
    disabled?: boolean; // 禁用
    label?: string; // 文本
    style?: ViewStyle; // 样式
    value?: RadioValue; // 受控值
    onChange?: (val: RadioValue) => void; // 值变动事件回调
}

export default function Radio(props: RadioProps) {
    const { label, defaultValue, disabled, value, style, onChange } = props;

    const [innerValue, handleChange] = useMergedState<RadioValue>(false, {
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
            return innerValue ? styles.iconBoxActive : {};
        }
    }, [disabled, innerValue]);

    return (
        <Pressable onPress={handlePress} disabled={disabled}>
            <Flex alignItems="center" columnGap={SIZE.space_small} style={style}>
                <Flex alignItems="center" justifyContent="center" style={StyleSheet.flatten([styles.iconBox, boxStyle])}>
                    {innerValue ? <Icon name="check" size={SIZE.icon_tiny} color={disabled ? COLOR.text_desc : COLOR.white} /> : null}
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
        borderRadius: SIZE.checkbox_size,
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
