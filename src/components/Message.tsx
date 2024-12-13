import { ReactNode, useEffect, useRef, useState } from 'react';
import { StyleProp, StyleSheet, TextStyle, useWindowDimensions, View, ViewStyle } from 'react-native';

import useStyle from '../hooks/useStyle';
import { COLOR, SIZE } from '../scripts/const';
import { Flex, TextX } from './index';
import Animated, { FadeIn, FadeOut, runOnJS } from 'react-native-reanimated';

export interface IMessageProps {
    afterClose?: () => void; // 关闭回调函数
    content?: ReactNode; // 内容文本
    duration?: number; // 显示时长
    id?: string; // 唯一id
    style?: {
        content?: StyleProp<TextStyle>; // 内容样式
        root?: StyleProp<ViewStyle>; // 根节点样式
    }; // 样式
}

export default function Message(props: IMessageProps) {
    const { afterClose, content, duration = 3000, style } = props;

    const [visible, setVisible] = useState(true);
    const timer = useRef<NodeJS.Timeout | null>();
    const { width: deviceWidth } = useWindowDimensions();

    // 关闭回调
    useEffect(() => {
        if (visible && duration) {
            timer.current = setTimeout(() => {
                clearTimer();
            }, duration);
        }
        return () => {
            clearTimer();
        };
    }, [visible]);

    // 根节点样式
    const rootStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.root],
        extraStyle: [style?.root, { width: deviceWidth - SIZE.space_md * 2 }],
    });

    const clearTimer = () => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        setVisible(false);
        timer.current = null;
    };

    const handleAfterClose = () => {
        setVisible(false);
        afterClose?.();
    };

    return (
        <View style={styles.container}>
            {visible ? (
                <Animated.View
                    entering={FadeIn}
                    exiting={FadeOut.withCallback(finished => {
                        if (finished) {
                            runOnJS(handleAfterClose)();
                        }
                    })}>
                    <Flex style={rootStyle}>
                        <TextX size={SIZE.font_h5} style={style?.content}>
                            {content}
                        </TextX>
                    </Flex>
                </Animated.View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        left: 0,
        position: 'absolute',
        top: 0,
        zIndex: 99,
    },
    root: {
        backgroundColor: COLOR.white,
        borderColor: COLOR.border_controller,
        borderRadius: SIZE.radius_md,
        borderWidth: SIZE.border_default,
        margin: SIZE.space_md,
        padding: SIZE.space_lg,
        width: '100%',
    },
});
