import React from 'react';
import { ViewStyle } from 'react-native';
import { SIZE } from '@/lib/scripts/const';
import Checkbox, { CheckboxValue } from './Checkbox';
import { useMergedState } from '../hooks';
import { Flex } from './index';

export type CheckboxGroupOptionValue = string | number;

export interface CheckboxGroupOptions {
    disabled?: boolean; // 禁用
    label: string; // 文本
    value: CheckboxGroupOptionValue; // 选项值
}

export type CheckboxGroupValue = CheckboxGroupOptionValue[];

export interface CheckboxGroupProps {
    defaultValue?: CheckboxGroupValue; // 默认值
    options?: CheckboxGroupOptions[]; // 子项
    style?: ViewStyle; // 样式
    value?: CheckboxGroupValue; // 受控值
    onChange?: (value: CheckboxGroupValue) => void;
}

export default function CheckboxGroup(props: CheckboxGroupProps) {
    const { defaultValue, value, onChange, options = [], style } = props;

    const [innerValue, handleChange] = useMergedState<CheckboxGroupValue>([], {
        defaultValue,
        value,
        onChange,
    });

    // 处理子项的变更
    const handleOptionChange = (val: CheckboxValue, option: CheckboxGroupOptions) => {
        const optionValue = option.value;
        if (val) {
            if (innerValue.includes(optionValue)) {
                return handleChange(innerValue.filter(item => item !== optionValue));
            } else {
                return handleChange([...innerValue, optionValue]);
            }
        } else {
            return handleChange(innerValue.filter(item => item !== optionValue));
        }
    };

    return (
        <Flex rowGap={SIZE.space_middle} columnGap={SIZE.space_max} style={style}>
            {options.map(option => {
                return (
                    <Checkbox
                        key={option.value}
                        label={option.label}
                        value={innerValue.includes(option.value)}
                        disabled={option.disabled}
                        onChange={val => handleOptionChange(val, option)}
                    />
                );
            })}
        </Flex>
    );
}
