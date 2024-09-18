import { useEffect } from 'react';
import { COLOR } from '@/lib/scripts/const';
import Icon from './Icon';
import { StyleSheet } from 'react-native';
import { SIZE } from '@/lib/scripts/const';
import Animated, { cancelAnimation, useAnimatedStyle, useSharedValue, Easing, withRepeat, withTiming } from 'react-native-reanimated';
import { mergeElement } from '@/lib/scripts/utils';
import { ILoadingProps } from '@/lib/_types/.components';

export default function Loading(props: ILoadingProps) {
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

    return <Animated.View style={[styles.root, animatedStyle, style]}>{mergeElement(icon, { size, color })}</Animated.View>;
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
});
