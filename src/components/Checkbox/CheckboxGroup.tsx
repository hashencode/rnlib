import { StyleProp, ViewStyle } from 'react-native';
import { useMergedState } from '../../hooks';
import { SIZE } from '../../scripts/const.ts';
import { Flex } from '../index.tsx';
import Checkbox, { ICheckboxProps, ICheckboxValue } from './Checkbox.tsx';

export type ICheckboxGroupOptionValue = string | number;

export interface ICheckboxGroupOptions {
    disabled?: boolean; // 禁用
    label: string; // 文本
    value: ICheckboxGroupOptionValue; // 选项值
}

export type ICheckboxGroupValue = ICheckboxGroupOptionValue[];

export interface ICheckboxGroupProps {
    defaultValue?: ICheckboxGroupValue; // 默认值
    options?: ICheckboxGroupOptions[]; // 子项
    value?: ICheckboxGroupValue; // 受控值

    style?: {
        option?: ICheckboxProps['style'];
        root?: StyleProp<ViewStyle>; // 根节点样式
    }; // 样式

    onChange?: (value: ICheckboxGroupValue) => void;
}

export default function CheckboxGroup(props: ICheckboxGroupProps) {
    const { defaultValue, value, onChange, options = [], style } = props;

    const [innerValue, handleChange] = useMergedState<ICheckboxGroupValue>([], {
        defaultValue,
        value,
        onChange,
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
        <Flex rowGap={SIZE.space_md} columnGap={SIZE.space_2xl} style={style?.root}>
            {options.map(option => {
                return (
                    <Checkbox
                        key={option.value}
                        label={option.label}
                        value={innerValue.includes(option.value)}
                        disabled={option.disabled}
                        onChange={val => handleOptionChange(val, option)}
                        style={style?.option}
                    />
                );
            })}
        </Flex>
    );
}
