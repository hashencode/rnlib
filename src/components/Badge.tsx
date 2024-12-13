import { ReactNode } from 'react';
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

import useStyle from '../hooks/useStyle';
import { COLOR, SIZE } from '../scripts/const';
import { Flex, TextX } from './index';

export interface IBadgeProps {
    children?: ReactNode; // 内容插槽
    dot?: boolean; // 红点模式

    style?: {
        root?: StyleProp<ViewStyle>; // 根节点样式
        text?: StyleProp<TextStyle>; // 文本样式
    }; // 样式
}

export default function Badge(props: IBadgeProps) {
    const { dot, style } = props;

    // 根节点样式
    const rootStyle = useStyle<ViewStyle>({
        defaultStyle: [dot ? styles.dot : styles.default],
        extraStyle: [style?.root],
    });

    if (dot) {
        return <View style={rootStyle} />;
    }

    return (
        <Flex alignItems="center" justifyContent="center" style={rootStyle}>
            <TextX color={COLOR.text_white} size={SIZE.badge_font_size} style={style?.text}>
                {props.children}
            </TextX>
        </Flex>
    );
}

const styles = StyleSheet.create({
    default: {
        backgroundColor: COLOR.danger,
        borderRadius: SIZE.badge_size / 2,
        height: SIZE.badge_size,
        minWidth: SIZE.badge_size,
        paddingHorizontal: SIZE.space_sm,
    },
    dot: {
        backgroundColor: COLOR.danger,
        borderRadius: SIZE.badge_size / 2,
        height: SIZE.badge_dot_size,
        width: SIZE.badge_dot_size,
    },
});
