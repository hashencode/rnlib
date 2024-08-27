import React, { ReactElement, ReactNode, useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import { useMergedState } from '../hooks';
import _ from 'lodash';
import { Icon, ListItem } from './index';
import { mergeElement } from '@/lib/scripts/utils';

export type CheckListRawValue = number | string;
export type CheckListValue = CheckListRawValue | CheckListRawValue[] | undefined;

export interface CheckListOptions {
    children?: ReactNode; // 内容插槽
    disabled?: boolean; // 禁用
    extra?: ReactNode; // 右侧附加元素
    icon?: ReactElement; // 左侧图标
    subtitle?: string; // 副标题
    title?: string; // 主标题,
    value: CheckListRawValue; // 列表项值
}

export interface CheckListProps {
    defaultValue?: CheckListValue; // 默认值
    checkedIcon?: ReactElement; // 选中图标
    options?: CheckListOptions[]; // 列表项
    multiple?: boolean; // 多选
    style?: {
        wrapper?: ViewStyle; // 最外层样式
    }; // 样式
    value?: CheckListValue; // 受控值
    onChange?: (val: CheckListValue) => void; // 值变动事件回调
}

export default function CheckList(props: CheckListProps) {
    const { options, checkedIcon = <Icon name="check" />, defaultValue, multiple, style, value, onChange } = props;

    const [innerValue, handleChange] = useMergedState<CheckListValue>(multiple ? [] : undefined, {
        defaultValue,
        value,
        onChange,
    });
    const lastIndex = useMemo(() => {
        if (!options) {
            return 0;
        }
        return options.length - 1;
    }, [options]);

    const handleListItemPress = (itemValue: CheckListRawValue) => {
        if (multiple) {
            if (_.isArray(innerValue)) {
                if (innerValue.includes(itemValue as CheckListRawValue)) {
                    handleChange(innerValue.filter(item => item !== itemValue));
                } else {
                    handleChange([...innerValue, itemValue]);
                }
            }
        } else {
            handleChange(itemValue);
        }
    };

    // 渲染右侧区域
    const renderExtra = (itemValue: CheckListValue) => {
        const iconEl = mergeElement(checkedIcon, {
            size: SIZE.icon_mini,
            color: COLOR.primary,
        });
        if (multiple) {
            if (_.isArray(innerValue)) {
                if (innerValue.includes(itemValue as CheckListRawValue)) {
                    return iconEl;
                }
            }
            return null;
        } else {
            if (innerValue === itemValue) {
                return iconEl;
            }
            return null;
        }
    };

    if (!options) {
        return null;
    }
    return (
        <View style={StyleSheet.flatten([styles.wrapper, style?.wrapper])}>
            {options.map((item, index) => {
                return (
                    <ListItem
                        {...item}
                        last={index === lastIndex}
                        key={index}
                        extra={renderExtra(item.value)}
                        onPress={() => {
                            handleListItemPress(item.value);
                        }}
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: SIZE.radius_middle,
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
    },
});
