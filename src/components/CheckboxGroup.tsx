import { StyleProp, ViewStyle } from 'react-native';

import { useMergedState } from '../hooks';
import { SIZE } from '../scripts/const';
import Checkbox, { ICheckboxProps, ICheckboxValue } from './Checkbox';
import { Flex } from './index';

export interface ICheckboxGroupOptions {
    disabled?: boolean; // 禁用
    label: string; // 文本
    value: ICheckboxGroupOptionValue; // 选项值
}

export type ICheckboxGroupOptionValue = number | string;

export interface ICheckboxGroupProps {
    defaultValue?: ICheckboxGroupValue; // 默认值
    onChange?: (value: ICheckboxGroupValue) => void;
    options?: ICheckboxGroupOptions[]; // 子项

    style?: {
        option?: ICheckboxProps['style'];
        root?: StyleProp<ViewStyle>; // 根节点样式
    }; // 样式

    value?: ICheckboxGroupValue; // 受控值
}

export type ICheckboxGroupValue = ICheckboxGroupOptionValue[];

export default function CheckboxGroup(props: ICheckboxGroupProps) {
    const { defaultValue, onChange, options = [], style, value } = props;

    const [innerValue, handleChange] = useMergedState<ICheckboxGroupValue>([], {
        defaultValue,
        onChange,
        value,
    });

    // 处理子项的变更
    const handleOptionChange = (val: ICheckboxValue, option: ICheckboxGroupOptions) => {
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
        <Flex columnGap={SIZE.space_2xl} rowGap={SIZE.space_md} style={style?.root}>
            {options.map(option => {
                return (
                    <Checkbox
                        disabled={option.disabled}
                        key={option.value}
                        label={option.label}
                        onChange={val => handleOptionChange(val, option)}
                        style={style?.option}
                        value={innerValue.includes(option.value)}
                    />
                );
            })}
        </Flex>
    );
}
