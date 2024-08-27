import React, { Key, ReactElement, useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import ListItem, { ListItemProps } from '../components/ListItem';

export interface ListProps {
    items: ListItemProps[]; // 数据源
    itemRender?: (item: ListItemProps, index: number) => ReactElement; // 渲染函数
    keyExtractor?: (item: ListItemProps) => Key; // 唯一键生成函数
    style?: {
        wrapper?: ViewStyle; // 最外层样式
    }; // 样式
}

export default function List(props: ListProps) {
    const { items, itemRender, keyExtractor, style } = props;
    const lastIndex = useMemo(() => {
        if (!items) {
            return 0;
        }
        return items.length - 1;
    }, [items]);

    return (
        <View style={StyleSheet.flatten([styles.wrapper, style?.wrapper])}>
            {items?.map((item, index) => {
                const basicProps: { isLast: boolean; key: Key } = { isLast: index === lastIndex, key: index };

                if (itemRender || keyExtractor) {
                    if (keyExtractor) {
                        basicProps.key = keyExtractor(item);
                    }
                    if (itemRender) {
                        return React.cloneElement(itemRender(item, index), {
                            last: index === lastIndex,
                            key: basicProps.key,
                        });
                    }
                }
                return <ListItem {...basicProps} {...item} />;
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: COLOR.white,
        borderRadius: SIZE.radius_large,
        overflow: 'hidden',
    },
});
