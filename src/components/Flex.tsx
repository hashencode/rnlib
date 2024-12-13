import { ReactNode } from 'react';
import { FlexAlignType, StyleProp, View, ViewProps, ViewStyle } from 'react-native';

import useStyle from '../hooks/useStyle';

export interface IFlexProps extends ViewProps {
    alignItems?: FlexAlignType; // alignItems
    alignSelf?: 'auto' | FlexAlignType; // alignSelf
    block?: boolean; // 占满整行
    children?: ReactNode; // 插槽
    column?: boolean; // 垂直排列
    columnGap?: number; // columnGap
    gap?: number; // gap
    grow?: number; // flexGrow
    justifyContent?: 'center' | 'flex-end' | 'flex-start' | 'space-around' | 'space-between' | 'space-evenly'; // justifyContent
    rowGap?: number; // rowGap
    shrink?: number; // flexShrink
    style?: StyleProp<ViewStyle>; // 样式
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'; // flexWrap
}

export default function Flex(props: IFlexProps) {
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

    const rootStyle = useStyle({
        defaultStyle: [
            {
                alignItems,
                alignSelf,
                columnGap,
                display: 'flex',
                flexDirection: column ? 'column' : 'row',
                flexGrow: grow,
                flexShrink: shrink,
                flexWrap: wrap,
                gap,
                justifyContent,
                rowGap,
                width: block ? '100%' : 'auto',
            },
        ],
        extraStyle: [style],
    });

    return (
        <View {...rest} style={rootStyle}>
            {props?.children}
        </View>
    );
}
