import { StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';

export interface SeparatorProps {
    color?: string; // 颜色
    style?: ViewStyle; // 样式
}

export default function Separator(props: SeparatorProps) {
    const { color = COLOR.border_default, style } = props;
    return <View style={StyleSheet.flatten([styles.wrapper, { backgroundColor: color }, style])} />;
}

const styles = StyleSheet.create({
    wrapper: {
        bottom: 0,
        height: SIZE.border_default,
        left: 0,
        position: 'absolute',
        width: '100%',
    },
});
