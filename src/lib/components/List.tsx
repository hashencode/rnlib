import { Fragment, Key, useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import ListItem from '@/lib/components/ListItem';
import { IListProps } from '@/lib/_types/.components';
import useStyle from '@/lib/hooks/useStyle';

export default function List(props: IListProps) {
    const { items, renderItem, rowKey, style } = props;

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
    divider: { borderBottomWidth: SIZE.border_default, borderColor: COLOR.border_default, marginLeft: SIZE.space_large, marginVertical: 0 },
});
