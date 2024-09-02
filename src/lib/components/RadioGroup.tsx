import { ViewStyle } from 'react-native';
import { SIZE } from '@/lib/scripts/const';
import Radio, { RadioValue } from './Radio';
import { useMergedState } from '../hooks';
import { Flex } from '@/lib/components';

export type RadioGroupOptionValue = string | number;

export interface RadioGroupOptions {
    disabled?: boolean; // 禁用
    label: string; // 文本
    value: RadioGroupOptionValue; // 选项值
}

export interface RadioGroupProps {
    defaultValue?: RadioGroupOptionValue; // 默认值
    options?: RadioGroupOptions[]; // 子项
    style?: ViewStyle; // 样式
    value?: RadioGroupOptionValue; // 受控值
    onChange?: (value: RadioGroupOptionValue) => void;
}

export default function RadioGroup(props: RadioGroupProps) {
    const { defaultValue, value, onChange, options = [], style } = props;

    const [innerValue, handleChange] = useMergedState<RadioGroupOptionValue>('', {
        defaultValue,
        value,
        onChange,
    });

    // 处理子项的变更
    const handleOptionChange = (val: RadioValue, option: RadioGroupOptions) => {
        const optionValue = option.value;
        if (innerValue !== optionValue) {
            handleChange(optionValue);
        }
    };

    return (
        <Flex rowGap={SIZE.space_middle} columnGap={SIZE.space_max} style={style}>
            {options.map(option => {
                return (
                    <Radio
                        key={option.value}
                        label={option.label}
                        value={innerValue === option.value}
                        disabled={option.disabled}
                        onChange={val => handleOptionChange(val, option)}
                    />
                );
            })}
        </Flex>
    );
}
