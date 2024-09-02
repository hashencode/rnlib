import { SIZE } from '@/lib/scripts/const';
import Checkbox from './Checkbox';
import { useMergedState } from '../hooks';
import { Flex } from '@/lib/components';
import { ICheckboxGroupOptions, ICheckboxGroupProps, ICheckboxGroupValue, ICheckboxValue } from '@/lib/_types/.components';

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
        <Flex rowGap={SIZE.space_middle} columnGap={SIZE.space_max} style={style?.root}>
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
