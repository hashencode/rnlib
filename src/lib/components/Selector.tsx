import { ReactNode, useState } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import _ from 'lodash';
import { useMergedState } from '../hooks';
import { Flex, Icon, Text } from '@/lib/components';

export type SelectorRawValue = number | string;
export type SelectorValue = SelectorRawValue | SelectorRawValue[] | undefined;
export interface SelectorOption {
    content?: ReactNode; // 内容插槽
    desc?: string; // 描述文本
    disabled?: boolean; // 禁用
    title?: string; // 主文本
    value: SelectorRawValue; // 选项值
}
export interface SelectProps {
    defaultValue?: SelectorValue; // 默认值
    multiple?: boolean; // 多选
    options: SelectorOption[]; // 选项
    optionStyle?: ViewStyle; // 选项样式
    style?: ViewStyle; // 样式
    value?: SelectorValue; // 受控值
    onChange?: (val: SelectorValue) => void; // 值变动事件回调
}

export default function Selector(props: SelectProps) {
    const { optionStyle, defaultValue, multiple, options = [], style, value, onChange } = props;

    const [innerValue, handleChange] = useMergedState<SelectorValue>(multiple ? [] : undefined, {
        defaultValue,
        value,
    });
    const [valueCache, setValueCache] = useState<SelectorRawValue[]>(innerValue as SelectorRawValue[]);

    // 处理选项点击
    const handleOptionPress = (val: SelectorRawValue) => {
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

    return (
        <Flex wrap="wrap" gap={SIZE.space_large} style={StyleSheet.flatten([styles.wrapper, style])}>
            {options.map(option => {
                const isActive = (multiple && valueCache?.includes(option.value)) || (!multiple && option?.value === innerValue);
                return (
                    <Pressable
                        disabled={option.disabled}
                        onPress={() => handleOptionPress(option.value)}
                        key={option.value}
                        style={StyleSheet.flatten([
                            styles.option,
                            isActive ? styles.active : {},
                            option.disabled ? styles.disabled : {},
                            optionStyle,
                        ])}>
                        <Flex alignItems="center" column>
                            <Text size={SIZE.font_h5} color={isActive ? COLOR.text_primary : COLOR.text_title} numberOfLines={1}>
                                {option.title}
                            </Text>
                            <Text size={SIZE.font_secondary} color={COLOR.text_desc} numberOfLines={1} ellipsizeMode="tail">
                                {option.desc}
                            </Text>
                            {option?.content}
                        </Flex>
                        {isActive ? (
                            <>
                                <View style={styles.iconBackground} />
                                <Icon name="check" size={SIZE.selector_icon_size} color={COLOR.white} style={styles.checkIcon} />
                            </>
                        ) : null}
                    </Pressable>
                );
            })}
        </Flex>
    );
}

const styles = StyleSheet.create({
    wrapper: {},
    option: {
        backgroundColor: COLOR.selector_option_background,
        borderRadius: SIZE.radius_middle,
        overflow: 'hidden',
        padding: SIZE.space_middle,
        position: 'relative',
    },
    active: {
        backgroundColor: COLOR.underlay_primary,
    },
    disabled: {
        opacity: COLOR.opacity_disabled_controller,
    },
    iconBackground: {
        borderBottomColor: COLOR.primary,
        borderLeftColor: 'transparent',
        borderRightColor: COLOR.primary,
        borderTopColor: 'transparent',
        borderWidth: SIZE.selector_icon_size - 2,
        bottom: 0,
        height: 0,
        position: 'absolute',
        right: 0,
        width: 0,
    },
    checkIcon: {
        bottom: 0,
        position: 'absolute',
        right: 0,
    },
});
