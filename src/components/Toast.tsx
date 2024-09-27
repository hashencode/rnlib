import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import { Flex, Icon, Loading, Overlay, TextX } from './index';
import { IconNames } from './Icon';
import useStyle from '../hooks/useStyle';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { ToastIconMap } from '../scripts/enum';

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
    const { content, type = 'info', duration = 2500, style, afterClose } = props;

    const [visible, setVisible] = useState(true);
    const timer = useRef<NodeJS.Timeout | null>();

    // 关闭回调
    useEffect(() => {
        if (!visible) {
            afterClose?.();
        } else if (duration) {
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
        extraStyle: [type === 'info' ? styles.noIcon : styles.hasIcon, style?.root],
    });

    const clearTimer = () => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        setVisible(false);
        timer.current = null;
    };

    // 渲染图标
    const renderIcon = () => {
        switch (type) {
            case 'loading':
                return <Loading size={SIZE.toast_icon_size} color={COLOR.white} />;
            case 'error':
            case 'success':
                return <Icon name={ToastIconMap[type] as IconNames} size={SIZE.toast_icon_size} color={COLOR.white} />;
            default:
                return null;
        }
    };

    return (
        <Overlay visible={visible} backgroundColor="transparent" afterDestroy={afterClose}>
            <Flex alignItems="center" justifyContent="center" column rowGap={SIZE.space_md} style={rootStyle}>
                {renderIcon()}
                <TextX size={SIZE.font_h4} color={COLOR.text_white} style={style?.content}>
                    {content}
                </TextX>
            </Flex>
        </Overlay>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: COLOR.toast_background,
        borderRadius: SIZE.radius_lg,
        padding: SIZE.space_lg,
    },
    noIcon: {
        maxWidth: SIZE.toast_width_max,
    },
    hasIcon: {
        height: SIZE.toast_big_size,
        width: SIZE.toast_big_size,
    },
});
