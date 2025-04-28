import { StyleProp } from 'react-native/types';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Overlay } from './index';
import Flex from './Flex';
import TextX from './TextX';
import { COLOR, SIZE } from '../scripts/const';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export interface IToastProps {
    afterClose?: () => void; // 关闭回调函数
    content?: ReactNode; // 内容文本
    id?: string; // 唯一id
    type?: 'success' | 'error' | 'loading' | 'info'; // 提示类型
    duration?: number; // 显示时长

    style?: {
        root?: StyleProp<ViewStyle>; // 根节点样式
        content?: StyleProp<TextStyle>; // 内容样式
    }; // 样式
}

export default function Toast(props: IToastProps) {
    const { afterClose, content, duration = 1200, style } = props;

    const [visible, setVisible] = useState(true);
    const timer = useRef<NodeJS.Timeout | null>(null);

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

    const clearTimer = () => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        setVisible(false);
        timer.current = null;
    };

    return (
        <Overlay afterDestroy={afterClose} backgroundColor="transparent" visible={visible}>
            <Flex alignItems="center" column grow={1} justifyContent="center">
                <Flex style={[styles.root, style?.root]}>
                    <TextX color={COLOR.text_white} size={SIZE.font_h4} style={style?.content}>
                        {content}
                    </TextX>
                </Flex>
            </Flex>
        </Overlay>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: COLOR.toast_background,
        borderRadius: SIZE.radius_lg,
        maxWidth: SIZE.toast_width_max,
        padding: SIZE.space_lg,
        zIndex: 99,
    },
    noIcon: {
        maxWidth: SIZE.toast_width_max,
    },
    hasIcon: {
        height: SIZE.toast_big_size,
        width: SIZE.toast_big_size,
    },
});
