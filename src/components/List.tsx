import { Fragment, Key, ReactElement, useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import ListItem, { IListItemProps } from './ListItem';
import useStyle from '../hooks/useStyle';

export interface IListProps {
    items: IListItemProps[]; // 数据源
    renderItem?: (item: IListItemProps, index: number) => ReactElement; // 渲染函数
    rowKey?: (item: IListItemProps) => Key; // 唯一键生成函数

    style?: {
        divider?: StyleProp<ViewStyle>; // 分割线样式
        root?: StyleProp<ViewStyle>; // 根节点样式
    }; // 样式
}

export default function List(props: IListProps) {
    const { items, renderItem, rowKey, style } = props;

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
        if (!items) {
            return 0;
        }
        return items.length - 1;
    }, [items]);

    return (
        <View style={rootStyle}>
            {items?.map((item, index) => {
                const isLast = index === lastIndex;
                let keyValue: Key = rowKey ? rowKey(item) : index;
                let itemNode = renderItem ? renderItem(item, index) : <ListItem {...item} />;
                return (
                    <Fragment key={keyValue}>
                        {itemNode}
                        {isLast ? null : <View style={dividerStyle} />}
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
