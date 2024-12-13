import _ from 'lodash';
import { Fragment, Key, ReactElement, ReactNode, useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useMergedState } from '../hooks';
import useStyle from '../hooks/useStyle';
import { COLOR, SIZE } from '../scripts/const';
import { mergeElement } from '../scripts/utils';
import { Icon, ListItem } from './index';
import { IListItemProps } from './ListItem';

export interface ICheckListOptions {
    children?: ReactNode; // 内容插槽
    disabled?: boolean; // 禁用
    icon?: ReactElement; // 左侧图标
    subtitle?: ReactNode; // 副标题
    title?: ReactNode; // 主标题,
    value: ICheckListRawValue; // 列表项值
}
export interface ICheckListProps {
    checkedIcon?: ReactElement; // 选中图标
    defaultValue?: ICheckListValue; // 默认值
    multiple?: boolean; // 多选
    onChange?: (val: ICheckListValue) => void; // 值变动事件回调
    options?: ICheckListOptions[]; // 列表项
    renderItem?: (item: IListItemProps, index: number) => ReactElement; // 渲染函数
    rowKey?: (item: IListItemProps) => Key; // 唯一键生成函数

    style?: {
        divider?: StyleProp<ViewStyle>; // 分割线样式
        root?: StyleProp<ViewStyle>; // 最外层样式
    }; // 样式

    value?: ICheckListValue; // 受控值
}

export type ICheckListRawValue = number | string;

export type ICheckListValue = ICheckListRawValue | ICheckListRawValue[] | undefined;

export default function CheckList(props: ICheckListProps) {
    const { checkedIcon = <Icon name="check" />, defaultValue, multiple, onChange, options, renderItem, rowKey, style, value } = props;

    const [innerValue, handleChange] = useMergedState<ICheckListValue>(multiple ? [] : undefined, {
        defaultValue,
        onChange,
        value,
    });

    // 根节点样式
    const rootStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.root],
        extraStyle: [style?.root],
    });

    // 分割线样式
    const dividerStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.divider],
        extraStyle: [style?.divider],
    });

    // 最后一项的序号
    const lastIndex = useMemo(() => {
        if (!options) {
            return 0;
        }
        return options.length - 1;
    }, [options]);

    // 处理列表项点击
    const handleListItemPress = (itemValue: ICheckListRawValue) => {
        if (multiple) {
            if (_.isArray(innerValue)) {
                if (innerValue.includes(itemValue as ICheckListRawValue)) {
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
    const renderExtra = (itemValue: ICheckListValue) => {
        const iconEl = mergeElement(checkedIcon, {
            color: COLOR.primary,
            size: SIZE.icon_xs,
        });
        if (multiple && _.isArray(innerValue) && innerValue.includes(itemValue as ICheckListRawValue)) {
            return iconEl;
        } else if (innerValue === itemValue) {
            return iconEl;
        }
        return null;
    };

    if (!options) {
        return null;
    }

    return (
        <View style={rootStyle}>
            {options?.map((item, index) => {
                const isLast = index === lastIndex;
                let keyValue: Key = rowKey ? rowKey(item) : index;
                let itemNode = renderItem ? (
                    renderItem(item, index)
                ) : (
                    <ListItem
                        extra={renderExtra(item.value)}
                        onPress={() => {
                            handleListItemPress(item.value);
                        }}
                        {...item}
                    />
                );
                return (
                    <Fragment key={keyValue}>
                        {itemNode}
                        {isLast ? null : <View style={dividerStyle}></View>}
                    </Fragment>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    divider: { borderBottomWidth: SIZE.border_default, borderColor: COLOR.border_default, marginLeft: SIZE.space_lg, marginVertical: 0 },
    root: {
        backgroundColor: COLOR.white,
    },
});
