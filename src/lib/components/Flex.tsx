import { ReactNode, useMemo } from 'react';
import { FlexAlignType, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

export interface FlexProps extends ViewProps {
    alignItems?: FlexAlignType; // alignItems
    alignSelf?: 'auto' | FlexAlignType; // alignSelf
    block?: boolean; // 占满整行
    children?: ReactNode; // 插槽
    column?: boolean; // 垂直排列
    columnGap?: number; // columnGap
    gap?: number; // gap
    grow?: number; // flexGrow
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'; // justifyContent
    rowGap?: number; // rowGap
    shrink?: number; // flexShrink
    style?: ViewStyle; // 样式
    wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'; // flexWrap
}

export default function Flex(props: FlexProps) {
    const {
        alignItems = 'flex-start',
        alignSelf = 'auto',
        block,
        column,
        columnGap,
        gap,
        grow = 0,
        justifyContent = 'flex-start',
        rowGap,
        shrink = 1,
        style = {},
        wrap = 'nowrap',
        ...rest
    } = props;

    const defaultStyle: ViewStyle = useMemo(() => {
        const flexDirection = column ? 'column' : 'row';
        const width = block ? '100%' : 'auto';
        return {
            display: 'flex',
            flexWrap: wrap,
            flexGrow: grow,
            flexShrink: shrink,
            width,
            flexDirection,
            justifyContent,
            alignItems,
            alignSelf,
            rowGap,
            columnGap,
            gap,
        };
    }, [block, column, wrap, grow, shrink, justifyContent, alignItems, alignSelf, rowGap, columnGap, gap]);

    return (
        <View {...rest} style={StyleSheet.flatten([defaultStyle, style])}>
            {props?.children}
        </View>
    );
}
