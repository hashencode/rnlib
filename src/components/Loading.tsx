import { ReactElement, useEffect } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import Animated, { Easing, cancelAnimation, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { COLOR, SIZE } from '../scripts/const';
import Icon from './Icon';

export interface ILoadingProps {
    color?: TextStyle['color']; // 颜色
    icon?: ReactElement; // 自定义图标
    size?: number; // 尺寸
    style?: StyleProp<ViewStyle>; // 样式
}

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
            <Icon color={color} name="loader-circle" size={size} strokeWidth={SIZE.icon_stroke_sm} />
        </Animated.View>
    );
}
