import { useUpdateEffect } from 'ahooks';
import _ from 'lodash';
import { useState } from 'react';

export default function useMergedState<T>(
    defaultStateValue: T,
    options?: { defaultValue?: T; onChange?: (val: T) => void; value?: T },
): [T, (val: T) => void] {
    const { defaultValue, onChange, value } = options || {};

    const [innerValue, setInnerValue] = useState(() => {
        if (!_.isUndefined(value)) {
            return value;
        } else if (!_.isUndefined(defaultValue)) {
            return defaultValue;
        } else {
            return defaultStateValue;
        }
    });

    useUpdateEffect(() => {
        if (!_.isUndefined(value)) {
            setInnerValue(value);
        }
    }, [value]);

    // 处理值的变动
    const handleChange = (newValue: T) => {
        if (_.isUndefined(value)) {
            setInnerValue(newValue);
        }
        onChange?.(newValue);
    };

    return [innerValue, handleChange];
}
