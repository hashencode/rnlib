import { StyleProp, ViewStyle } from 'react-native';
import { useMergedState } from '../hooks';
import { SIZE } from '../scripts/const';
import { ICheckboxProps } from './Checkbox';
import Radio, { IRadioValue } from './Radio';
import { Flex } from './index';

export type IRadioGroupOptionValue = string | number | undefined;

export interface IRadioGroupOptions {
    disabled?: boolean; // 禁用
    label: string; // 文本
    value: IRadioGroupOptionValue; // 选项值
}

export interface IRadioGroupProps {
    defaultValue?: IRadioGroupOptionValue; // 默认值
    options?: IRadioGroupOptions[]; // 子项
    value?: IRadioGroupOptionValue; // 受控值

    style?: {
        option?: ICheckboxProps['style'];
        root?: StyleProp<ViewStyle>; // 根节点样式
    }; // 样式

    onChange?: (value: IRadioGroupOptionValue) => void;
}

export default function RadioGroup(props: IRadioGroupProps) {
    const { defaultValue, value, onChange, options = [], style } = props;

    const [innerValue, handleChange] = useMergedState<IRadioGroupOptionValue>(undefined, {
        defaultValue,
        value,
        onChange,
    });

    // 处理子项的变更
    const handleOptionChange = (val: IRadioValue, option: IRadioGroupOptions) => {
        const optionValue = option.value;
        if (innerValue !== optionValue) {
            handleChange(optionValue);
        }
    };

    return (
        <Flex rowGap={SIZE.space_md} columnGap={SIZE.space_2xl} style={style?.root}>
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
