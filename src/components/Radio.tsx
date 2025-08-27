import { ReactNode, useMemo } from 'react';
import { Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { StyleProps } from 'react-native-reanimated';
import { useMergedState } from '../hooks';
import { COLOR, SIZE } from '../scripts/const';
import { Flex, Icon, TextX } from './index';

export type IRadioValue = boolean;

export interface IRadioProps {
    defaultValue?: IRadioValue; // 默认值
    disabled?: boolean; // 禁用
    label?: ReactNode; // 文本
    value?: IRadioValue; // 受控值

    style?: {
        icon?: StyleProp<TextStyle>; // 图标样式
        iconContainer?: StyleProp<ViewStyle>; // 图标容器样式
        label?: StyleProp<TextStyle>; // 文本样式
        root?: StyleProp<ViewStyle>; // 根节点样式
    }; // 样式

    onChange?: (val: IRadioValue) => void; // 值变动事件回调
}

export default function Radio(props: IRadioProps) {
    const { label, defaultValue, disabled, value, style, onChange } = props;

    const [innerValue, handleChange] = useMergedState<IRadioValue>(false, {
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
        let styleArray: StyleProps[] = [styles.iconContainer];
        if (disabled) {
            // 禁用
            styleArray.push(styles.iconContainerDisabled);
        } else if (innerValue) {
            styleArray.push(styles.iconContainerActive);
        }
        return StyleSheet.flatten(styleArray);
    }, [disabled, innerValue]);

    return (
        <Pressable onPress={handlePress} disabled={disabled}>
            <Flex alignItems="center" columnGap={SIZE.space_sm} style={style?.root}>
                <Flex alignItems="center" justifyContent="center" style={containerStyle}>
                    {innerValue ? (
                        <Icon
                            name="check"
                            size={SIZE.icon_xxs}
                            strokeWidth={SIZE.icon_stroke_xl}
                            color={disabled ? COLOR.text_desc : COLOR.white}
                        />
                    ) : null}
                </Flex>
                <TextX size={SIZE.font_h3} color={disabled ? COLOR.text_desc : COLOR.text_title} style={style?.label}>
                    {label}
                </TextX>
            </Flex>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        borderColor: COLOR.border_controller,
        borderRadius: SIZE.checkbox_size,
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
