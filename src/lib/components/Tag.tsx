import React, { ReactElement, ReactNode } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Flex, Text } from './index';
import { mergeElement } from '@/lib/scripts/utils';
import { COLOR, SIZE } from '@/lib/scripts/const';

export interface TagProps {
    backgroundColor?: string; // 背景颜色
    borderColor?: string; // 边框颜色
    bordered?: boolean; // 显示边框
    children?: ReactNode; // 内容插槽
    icon?: ReactElement; // 图标
    style?: ViewStyle; // 样式
    textColor?: string; // 文本颜色
}

export default function Tag(props: TagProps) {
    const { icon, style, borderColor = COLOR.border_default, backgroundColor = COLOR.white, textColor, bordered = true } = props;

    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            columnGap={SIZE.space_small}
            style={StyleSheet.flatten([
                styles.wrapper,
                { borderColor, backgroundColor, borderWidth: bordered ? SIZE.border_default : 0 },
                style,
            ])}>
            {mergeElement(icon, { color: textColor, size: SIZE.tag_icon_size })}
            <Text size={SIZE.font_mini} color={textColor}>
                {props.children}
            </Text>
        </Flex>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: SIZE.radius_middle,
        height: SIZE.tag_height,
        paddingHorizontal: SIZE.space_middle,
    },
});
