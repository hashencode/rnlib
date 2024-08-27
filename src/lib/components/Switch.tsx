import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import { useMergedState } from '../hooks';
import { Flex } from './index';

export interface SwitchProProps {
    defaultValue?: boolean; // 默认值
    disabled?: boolean; // 禁用
    size?: 'small' | 'middle'; // 尺寸
    style?: ViewStyle; // 样式
    value?: boolean; // 受控值,
    onChange?: (value: boolean) => void; // 值变动事件回调
    onPress?: () => void; // 点击事件回调
}

export default function Switch(props: SwitchProProps) {
    const { size = 'middle', style, disabled, onPress, onChange, value, defaultValue = false } = props;

    const [innerValue, handleChange] = useMergedState(false, {
        defaultValue,
        value,
        onChange,
    });

    // 处理点击事件
    const handlePress = () => {
        if (disabled) {
            return;
        }
        handleChange(!innerValue);
        onPress?.();
    };

    // 渲染开关主体
    const renderSwitch = () => {
        // 判断是否设置了value
        const bodyActiveStyle = innerValue ? styles.body_active : {};
        return (
            <Flex alignItems="center" style={StyleSheet.flatten([styles.body, styles[`body_${size}`], bodyActiveStyle])}>
                <View style={StyleSheet.flatten([styles.handle, styles[`handle_${size}`]])} />
            </Flex>
        );
    };

    return (
        <Pressable
            disabled={disabled}
            style={StyleSheet.flatten([styles.wrapper, disabled ? styles.disabled : {}, style])}
            onPress={handlePress}>
            {renderSwitch()}
        </Pressable>
    );
}

const handleWidthMiddle = SIZE.switch_height_middle - 2 * SIZE.switch_border_middle;
const handleWidthSmall = SIZE.switch_height_small - 2 * SIZE.switch_border_small;

const styles = StyleSheet.create({
    wrapper: {
        overflow: 'hidden',
        position: 'relative',
    },
    disabled: {
        opacity: COLOR.opacity_disabled_controller,
    },
    body: {
        alignItems: 'center',
        backgroundColor: COLOR.switch_close_background,
        borderColor: COLOR.switch_close_background,
        borderRadius: SIZE.switch_radius,
    },
    body_active: {
        backgroundColor: COLOR.primary,
        borderColor: COLOR.primary,
        justifyContent: 'flex-end',
    },
    body_small: {
        borderWidth: SIZE.switch_border_small,
        height: SIZE.switch_height_small,
        width: SIZE.switch_width_small,
    },
    body_middle: {
        borderWidth: SIZE.switch_border_middle,
        height: SIZE.switch_height_middle,
        width: SIZE.switch_width_middle,
    },
    handle: {
        backgroundColor: COLOR.white,
    },
    handleShadow: {
        borderRadius: handleWidthMiddle,
    },
    handle_small: {
        borderRadius: handleWidthSmall,
        height: handleWidthSmall,
        width: handleWidthSmall,
    },
    handle_middle: {
        borderRadius: handleWidthMiddle,
        height: handleWidthMiddle,
        width: handleWidthMiddle,
    },
});
