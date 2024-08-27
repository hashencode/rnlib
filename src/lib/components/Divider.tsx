import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import _ from 'lodash';
import { Flex, Text } from './index';

export interface DividerProps {
    children?: ReactNode | string; // 插槽
    orientation?: 'left' | 'center' | 'right'; // 文字位置
    style?: ViewStyle; // 样式
    type?: 'horizontal' | 'vertical'; // 分割方向
}

export default function Divider(props: DividerProps) {
    const { type = 'horizontal', orientation = 'center', style } = props;
    const hasContent = !_.isNil(props?.children);
    const isHorizontal = type === 'horizontal';

    return (
        <Flex
            alignItems="center"
            justifyContent="center"
            columnGap={hasContent ? SIZE.space_ultra : 0}
            style={StyleSheet.flatten([styles[type], style])}>
            {isHorizontal ? (
                <>
                    <View style={StyleSheet.flatten([styles.horizontalSeparator, { flexGrow: orientation === 'left' ? 0.1 : 1 }])} />
                    <Text size={SIZE.font_h5}>{props.children}</Text>
                    <View style={StyleSheet.flatten([styles.horizontalSeparator, { flexGrow: orientation === 'right' ? 0.1 : 1 }])} />
                </>
            ) : (
                <View style={styles.verticalSeparator} />
            )}
        </Flex>
    );
}

const styles = StyleSheet.create({
    horizontal: {
        height: SIZE.divider_horizontal_height,
    },
    vertical: {
        height: SIZE.divider_vertical_height,
        marginHorizontal: SIZE.space_large,
    },
    horizontalSeparator: {
        backgroundColor: COLOR.border_default,
        flexGrow: 1,
        flexShrink: 0,
        height: SIZE.border_default,
    },
    verticalSeparator: {
        backgroundColor: COLOR.border_default,
        height: '100%',
        width: SIZE.border_default,
    },
});
