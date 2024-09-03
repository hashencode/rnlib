import { Fragment, Key, useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import { useMergedState } from '../hooks';
import _ from 'lodash';
import { Icon, ListItem } from '@/lib/components';
import { mergeElement } from '@/lib/scripts/utils';
import { ICheckListProps, ICheckListRawValue, ICheckListValue } from '@/lib/_types/.components';
import useStyle from '@/lib/hooks/useStyle';

export default function CheckList(props: ICheckListProps) {
    const { options, rowKey, renderItem, checkedIcon = <Icon name="check" />, defaultValue, multiple, style, value, onChange } = props;

    const [innerValue, handleChange] = useMergedState<ICheckListValue>(multiple ? [] : undefined, {
        defaultValue,
        value,
        onChange,
    });

    // 根元素样式
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
            size: SIZE.icon_xs,
            color: COLOR.primary,
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
    root: {
        backgroundColor: COLOR.white,
    },
    divider: { borderBottomWidth: SIZE.border_default, borderColor: COLOR.border_default, marginLeft: SIZE.space_lg, marginVertical: 0 },
});
