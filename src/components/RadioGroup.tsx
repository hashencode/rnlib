import { StyleProp, ViewStyle } from 'react-native';

import { useMergedState } from '../hooks';
import { SIZE } from '../scripts/const';
import { ICheckboxProps } from './Checkbox';
import { Flex } from './index';
import Radio, { IRadioValue } from './Radio';

export interface IRadioGroupOptions {
    disabled?: boolean; // 禁用
    label: string; // 文本
    value: IRadioGroupOptionValue; // 选项值
}

export type IRadioGroupOptionValue = number | string | undefined;

export interface IRadioGroupProps {
    defaultValue?: IRadioGroupOptionValue; // 默认值
    onChange?: (value: IRadioGroupOptionValue) => void;
    options?: IRadioGroupOptions[]; // 子项

    style?: {
        option?: ICheckboxProps['style'];
        root?: StyleProp<ViewStyle>; // 根节点样式
    }; // 样式

    value?: IRadioGroupOptionValue; // 受控值
}

export default function RadioGroup(props: IRadioGroupProps) {
    const { defaultValue, onChange, options = [], style, value } = props;

    const [innerValue, handleChange] = useMergedState<IRadioGroupOptionValue>(undefined, {
        defaultValue,
        onChange,
        value,
    });

    // 处理子项的变更
    const handleOptionChange = (val: IRadioValue, option: IRadioGroupOptions) => {
        const optionValue = option.value;
        if (innerValue !== optionValue) {
            handleChange(optionValue);
        }
    };

    return (
        <Flex columnGap={SIZE.space_2xl} rowGap={SIZE.space_md} style={style?.root}>
            {options.map(option => {
                return (
                    <Radio
                        disabled={option.disabled}
                        key={option.value}
                        label={option.label}
                        onChange={val => handleOptionChange(val, option)}
                        value={innerValue === option.value}
                    />
                );
            })}
        </Flex>
    );
}
