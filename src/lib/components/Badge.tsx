import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import { Flex, Text } from '@/lib/components';

export interface BadgeProps {
    bordered?: boolean; // 显示边框
    children?: ReactNode; // 内容插槽
    dot?: boolean; // 红点模式
    style?: ViewStyle; // 样式
}

export default function Badge(props: BadgeProps) {
    const { bordered = true, dot, style } = props;

    if (dot) {
        return <View style={StyleSheet.flatten([styles.dot, style])} />;
    }

    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            style={StyleSheet.flatten([styles.wrapper, bordered ? styles.bordered : {}, style])}>
            <Text size={SIZE.badge_font_size} color={COLOR.text_white}>
                {props.children}
            </Text>
        </Flex>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: COLOR.danger,
        borderRadius: SIZE.badge_size / 2,
        height: SIZE.badge_size,
        minWidth: SIZE.badge_size,
        paddingHorizontal: SIZE.space_small,
    },
    dot: {
        backgroundColor: COLOR.danger,
        borderRadius: SIZE.badge_size / 2,
        height: SIZE.badge_dot_size,
        width: SIZE.badge_dot_size,
    },
    bordered: {
        borderColor: COLOR.white,
        borderWidth: SIZE.border_default,
    },
});
