import { useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import { useMergedState } from '../hooks';
import { IRadioProps, IRadioValue } from '../_types/components';
import { Flex, Icon, TextX } from './index';
import { StyleProps } from 'react-native-reanimated';

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
                            strokeWidth={SIZE.icon_stroke_lg}
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
