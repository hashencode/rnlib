import { useMemo } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import { useMergedState } from '../hooks';
import { Flex, Icon, Text } from '@/lib/components';
import { ICheckboxProps, ICheckboxValue } from '@/lib/_types/.components';

export default function Checkbox(props: ICheckboxProps) {
    const { indeterminate = false, label, defaultValue, disabled, value, style, onChange } = props;

    const [innerValue, handleChange] = useMergedState<ICheckboxValue>(false, {
        defaultValue,
        value,
        onChange,
    });

    // 处理点击事件
    const handlePress = () => {
        handleChange(!innerValue);
    };

    // 图标容器样式
    const containerStyle = useMemo(() => {
        let styleArray: ViewStyle[] = [styles.iconContainer];
        if (disabled) {
            // 禁用
            styleArray.push(styles.iconContainerDisabled);
        } else if (innerValue && !indeterminate) {
            // 非班选状态且有值
            styleArray.push(styles.iconContainerActive);
        }
        // 如果存在自定义样式
        if (style?.iconContainer) {
            styleArray.push(style?.iconContainer);
        }
        return StyleSheet.flatten(styleArray);
    }, [disabled, innerValue, indeterminate, style?.iconContainer]);

    // 渲染图标
    const renderIcon = () => {
        if (indeterminate) {
            return <Icon name="minus" size={SIZE.icon_tiny} color={disabled ? COLOR.text_desc : COLOR.primary} style={style?.icon} />;
        }
        if (innerValue) {
            return <Icon name="check" size={SIZE.icon_tiny} color={disabled ? COLOR.text_desc : COLOR.white} style={style?.icon} />;
        }
        return null;
    };

    return (
        <Pressable onPress={handlePress} disabled={disabled}>
            <Flex alignItems="center" columnGap={SIZE.space_middle} style={style?.root}>
                <Flex alignItems="center" justifyContent="center" style={containerStyle}>
                    {renderIcon()}
                </Flex>
                <Text size={SIZE.font_h3} color={disabled ? COLOR.text_desc : COLOR.text_title} style={style?.label}>
                    {label}
                </Text>
            </Flex>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        borderColor: COLOR.border_controller,
        borderRadius: SIZE.radius_middle,
        borderWidth: SIZE.border_default,
        height: SIZE.checkbox_size,
        width: SIZE.checkbox_size,
    },
    iconContainerActive: {
        backgroundColor: COLOR.primary,
        borderColor: COLOR.primary,
    },
    iconContainerDisabled: {
        backgroundColor: COLOR.bg_disabled,
        borderColor: COLOR.border_disabled,
    },
});
