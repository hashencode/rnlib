import React, { ReactNode } from 'react';
import { Pressable, PressableProps, StyleSheet, View, ViewStyle } from 'react-native';

export interface PressOpacityProps extends PressableProps {
    children?: ReactNode | string; // 插槽
    separator?: ReactNode; // 分割线
    style?: ViewStyle; // 样式
}

export default function PressOpacity(props: PressOpacityProps) {
    const { separator, style, ...rest } = props;

    const renderContent = (pressed: boolean) => {
        return (
            <View style={styles.wrapper}>
                <View style={StyleSheet.flatten([styles.content, { opacity: pressed ? 0.5 : 1 }])}>{props?.children}</View>
                {separator}
            </View>
        );
    };

    return (
        <Pressable style={style} {...rest}>
            {({ pressed }) => renderContent(pressed)}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
    },
    content: {
        position: 'relative',
    },
});
