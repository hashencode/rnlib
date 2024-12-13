import { ReactNode, useMemo } from 'react';
import { Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { StyleProps } from 'react-native-reanimated';

import { useMergedState } from '../hooks';
import { COLOR, SIZE } from '../scripts/const';
import { Flex, Icon, TextX } from './index';

export interface ICheckboxProps {
    defaultValue?: ICheckboxValue; // 默认值
    disabled?: boolean; // 禁用
    indeterminate?: boolean; // 半选
    label?: ReactNode; // 文本
    onChange?: (val: ICheckboxValue) => void; // 值变动事件回调

    style?: {
        icon?: StyleProp<TextStyle>; // 图标样式
        iconContainer?: StyleProp<ViewStyle>; // 图标容器样式
        label?: StyleProp<TextStyle>; // 文本样式
        root?: StyleProp<ViewStyle>; // 根节点样式
    }; // 样式

    value?: ICheckboxValue; // 受控值
}

export type ICheckboxValue = boolean;

export default function Checkbox(props: ICheckboxProps) {
    const { defaultValue, disabled, indeterminate = false, label, onChange, style, value } = props;

    const [innerValue, handleChange] = useMergedState<ICheckboxValue>(false, {
        defaultValue,
        onChange,
        value,
    });

    // 处理点击事件
    const handlePress = () => {
        handleChange(!innerValue);
    };

    // 图标容器样式
    const containerStyle = useMemo(() => {
        let styleArray: StyleProps[] = [styles.iconContainer];
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
            return (
                <Icon
                    color={disabled ? COLOR.text_desc : COLOR.primary}
                    name="minus"
                    size={SIZE.icon_xxs}
                    strokeWidth={SIZE.icon_stroke_xl}
                    style={style?.icon}
                />
            );
        }
        if (innerValue) {
            return (
                <Icon
                    color={disabled ? COLOR.text_desc : COLOR.white}
                    name="check"
                    size={SIZE.icon_xxs}
                    strokeWidth={SIZE.icon_stroke_xl}
                    style={style?.icon}
                />
            );
        }
        return null;
    };

    return (
        <Pressable disabled={disabled} onPress={handlePress}>
            <Flex alignItems="center" columnGap={SIZE.space_md} style={style?.root}>
                <Flex alignItems="center" justifyContent="center" style={containerStyle}>
                    {renderIcon()}
                </Flex>
                <TextX color={disabled ? COLOR.text_desc : COLOR.text_title} size={SIZE.font_h3} style={style?.label}>
                    {label}
                </TextX>
            </Flex>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        borderColor: COLOR.border_controller,
        borderRadius: SIZE.radius_md,
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
