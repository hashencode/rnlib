import React, { ReactElement, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import _ from 'lodash';
import { Flex, Text } from './index';
import { mergeElement } from '@/lib/scripts/utils';

export interface CardProps {
    children?: ReactNode; // 内容插槽
    extra?: ReactElement; // 额外元素
    icon?: ReactElement; // 头部图标
    style?: {
        wrapper?: ViewStyle;
        header?: ViewStyle;
        body?: ViewStyle;
    }; // 样式
    title?: string; // 标题
}

export default function Card(props: CardProps) {
    const { title, extra, icon, style } = props;
    const showHeader = icon || title || extra;

    return (
        <View style={StyleSheet.flatten([styles.wrapper, style?.wrapper])}>
            {/* 头部 */}
            {showHeader ? (
                <Flex justifyContent="space-between" alignItems="center" wrap="nowrap" columnGap={SIZE.space_middle} style={styles.header}>
                    <Flex alignItems="center" columnGap={SIZE.space_middle} grow={1}>
                        {/* 图标 */}
                        {mergeElement(icon, { size: SIZE.icon_mini })}
                        {/* 标题 */}
                        {_.isString(title) ? (
                            <Text size={SIZE.font_h4} weight={SIZE.weight_title}>
                                {title}
                            </Text>
                        ) : (
                            title
                        )}
                    </Flex>
                    {/* 额外元素 */}
                    {props?.extra}
                </Flex>
            ) : null}
            {/* 内容 */}
            <View style={StyleSheet.flatten([styles.body, style?.body])}>{props?.children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: COLOR.white,
        borderRadius: SIZE.radius_large,
        overflow: 'hidden',
        width: '100%',
    },
    header: {
        borderBottomWidth: SIZE.border_default,
        borderColor: COLOR.border_default,
        marginHorizontal: SIZE.space_large,
        minHeight: SIZE.card_header_height,
    },
    body: {
        padding: SIZE.space_large,
    },
});
