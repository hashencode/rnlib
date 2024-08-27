import React, { ReactNode } from 'react';
import { Pressable, PressableProps, StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR } from '@/lib/scripts/const';

export interface PressHighlightProps extends PressableProps {
    children?: ReactNode | string; // 插槽
    separator?: ReactNode; // 分割线
    style?: ViewStyle; // 样式
    underlayColor?: string; // 遮罩颜色
}

export default function PressHighlight(props: PressHighlightProps) {
    const { underlayColor = COLOR.underlay_touchable, separator, style, ...rest } = props;

    const renderContent = (pressed: boolean) => {
        return (
            <>
                <View style={styles.wrapper}>
                    <View style={StyleSheet.flatten([styles.overlay, { backgroundColor: pressed ? underlayColor : 'transparent' }])} />
                    {props?.children}
                </View>
                {separator}
            </>
        );
    };

    return (
        <Pressable style={StyleSheet.flatten([styles.pressable, style])} {...rest}>
            {({ pressed }) => renderContent(pressed)}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressable: {
        width: '100%',
    },
    wrapper: {
        position: 'relative',
    },
    overlay: {
        height: '100%',
        left: 0,
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 1,
    },
});
