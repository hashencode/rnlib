import { SIZE } from '../scripts/const';
import Radio from './Radio';
import { useMergedState } from '../hooks';
import { Flex } from './index';
import { IRadioGroupOptions, IRadioGroupOptionValue, IRadioGroupProps, IRadioValue } from '../_types/components';

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
