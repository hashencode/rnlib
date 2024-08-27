import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { SIZE } from '@/lib/scripts/const';

export interface FloatingPanelProps {
    style?: ViewStyle; // 样式
}

export default function FloatingPanel(props: FloatingPanelProps) {
    const { style } = props;

    return <View style={StyleSheet.flatten([styles.wrapper, style])} />;
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: SIZE.radius_middle,
        height: SIZE.tag_height,
        paddingHorizontal: SIZE.space_middle,
    },
});
