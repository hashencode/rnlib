import { ReactElement, useEffect } from 'react';
import { COLOR } from '@/lib/scripts/const';
import Icon from './Icon';
import { StyleSheet, ViewStyle } from 'react-native';
import { SIZE } from '@/lib/scripts/const';
import Animated, { cancelAnimation, useAnimatedStyle, useSharedValue, Easing, withRepeat, withTiming } from 'react-native-reanimated';
import { mergeElement } from '@/lib/scripts/utils';

export interface LoadingProps {
    icon?: ReactElement; // 自定义图标
    color?: string; // 颜色
    size?: number; // 尺寸
    style?: ViewStyle; // 样式
}

export default function Loading(props: LoadingProps) {
    const { icon = <Icon name="loader"></Icon>, color = COLOR.icon_touchable, size = SIZE.icon_md, style } = props;

    const angle = useSharedValue(0);

    useEffect(() => {
        angle.value = withRepeat(withTiming(1, { duration: 1800, easing: Easing.linear }), -1);
        return () => {
            cancelAnimation(angle);
        };
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${angle.value * 360}deg` }],
        };
    });

    return <Animated.View style={[styles.wrapper, animatedStyle, style]}>{mergeElement(icon, { size, color })}</Animated.View>;
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
});
