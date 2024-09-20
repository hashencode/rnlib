import { useEffect } from 'react';
import { COLOR } from '../scripts/const';
import { SIZE } from '../scripts/const';
import Animated, { cancelAnimation, useAnimatedStyle, useSharedValue, Easing, withRepeat, withTiming } from 'react-native-reanimated';
import { ILoadingProps } from '../_types/.components';
import Icon from '../components/Icon';

export default function Loading(props: ILoadingProps) {
    const { color = COLOR.icon_touchable, size = SIZE.icon_md, style } = props;

    const angle = useSharedValue(0);

    useEffect(() => {
        cancelAnimation(angle);
        angle.value = 0;
        angle.value = withRepeat(withTiming(365, { duration: 1000, easing: Easing.linear }), -1, false);
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${angle.value}deg` }],
        };
    });

    return (
        <Animated.View style={[animatedStyle, style]}>
            <Icon name="loader-circle" color={color} size={size}></Icon>
        </Animated.View>
    );
}
