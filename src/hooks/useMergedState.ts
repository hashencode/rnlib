import { useState } from 'react';
import { isUndefined } from 'lodash';
import { useUpdateEffect } from 'ahooks';

export default function useMergedState<T>(
    defaultStateValue: T,
    options?: { defaultValue?: T; value?: T; onChange?: (val: T) => void },
): [T, (val: T) => void] {
    const { defaultValue, value, onChange } = options || {};

    const [innerValue, setInnerValue] = useState(() => {
        if (!isUndefined(value)) {
            return value;
        } else if (!isUndefined(defaultValue)) {
            return defaultValue;
        } else {
            return defaultStateValue;
        }
    });

    useUpdateEffect(() => {
        if (!isUndefined(value)) {
            setInnerValue(value);
        }
    }, [value]);

    // 处理值的变动
    const handleChange = (newValue: T) => {
        if (isUndefined(value)) {
            setInnerValue(newValue);
        }
        onChange?.(newValue);
    };

    return [innerValue, handleChange];
}
