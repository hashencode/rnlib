import { ReactNode, useEffect, useRef, useState } from 'react';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import useStyle from '../hooks/useStyle';
import { COLOR, SIZE } from '../scripts/const';
import { ToastIconMap } from '../scripts/enum';
import { IconNames } from './Icon';
import { Flex, Icon, Loading, Overlay, TextX } from './index';

export interface IToastProps {
    afterClose?: () => void; // 关闭回调函数
    content?: ReactNode; // 内容文本
    duration?: number; // 显示时长
    id?: string; // 唯一id
    style?: {
        content?: StyleProp<TextStyle>; // 内容样式
        root?: StyleProp<ViewStyle>; // 根节点样式
    }; // 样式

    type?: 'error' | 'info' | 'loading' | 'success'; // 提示类型
}

export default function Toast(props: IToastProps) {
    const { afterClose, content, duration = 1200, style, type = 'info' } = props;

    const [visible, setVisible] = useState(true);
    const timer = useRef<NodeJS.Timeout | null>();

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
            case 'error':
            case 'success':
                return <Icon color={COLOR.white} name={ToastIconMap[type] as IconNames} size={SIZE.toast_icon_size} />;
            case 'loading':
                return <Loading color={COLOR.white} size={SIZE.toast_icon_size} />;
            default:
                return null;
        }
    };

    return (
        <Overlay afterDestroy={afterClose} backgroundColor="transparent" visible={visible}>
            <Flex alignItems="center" column justifyContent="center" rowGap={SIZE.space_md} style={rootStyle}>
                {renderIcon()}
                <TextX color={COLOR.text_white} size={SIZE.font_h4} style={style?.content}>
                    {content}
                </TextX>
            </Flex>
        </Overlay>
    );
}

const styles = StyleSheet.create({
    hasIcon: {
        height: SIZE.toast_big_size,
        width: SIZE.toast_big_size,
    },
    noIcon: {
        maxWidth: SIZE.toast_width_max,
    },
    root: {
        backgroundColor: COLOR.toast_background,
        borderRadius: SIZE.radius_lg,
        padding: SIZE.space_lg,
    },
});
