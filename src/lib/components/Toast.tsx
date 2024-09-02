import { StyleSheet, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import { useUpdateEffect } from 'ahooks';
import { Flex, Icon, Loading, Overlay, Text } from '@/lib/components';
import { IconNames } from './Icon';

export interface ToastProps {
    afterClose?: () => void; // 关闭回调函数
    content?: string; // 内容文本
    style?: ViewStyle; // 样式
    type?: 'success' | 'error' | 'loading' | 'info'; // 提示类型
    visible?: boolean; // 显隐
}

enum IconMap {
    'success' = 'check',
    'error' = 'x',
}

export default function Toast(props: ToastProps) {
    const { visible, content, type = 'info', style, afterClose } = props;

    const isInfo = type === 'info';

    // 关闭回调
    useUpdateEffect(() => {
        if (!visible) {
            afterClose?.();
        }
    }, [visible]);

    // 渲染图标
    const renderIcon = () => {
        if (!type || isInfo) {
            return null;
        }
        if (type === 'loading') {
            return <Loading size={SIZE.toast_icon_size} color={COLOR.white} />;
        }
        return <Icon name={IconMap[type] as IconNames} size={SIZE.toast_icon_size} color={COLOR.white} />;
    };

    return (
        <Overlay visible={visible} backgroundColor="transparent" afterDestroy={afterClose}>
            <Flex
                alignItems="center"
                justifyContent="center"
                column
                rowGap={SIZE.space_middle}
                style={StyleSheet.flatten([styles.wrapper, isInfo ? styles.noIcon : styles.hasIcon, style])}>
                {renderIcon()}
                <Text size={SIZE.font_h4} color={COLOR.text_white}>
                    {content}
                </Text>
            </Flex>
        </Overlay>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: COLOR.toast_background,
        borderRadius: SIZE.radius_large,
        padding: SIZE.space_large,
    },
    noIcon: {
        maxWidth: SIZE.toast_width_max,
    },
    hasIcon: {
        height: SIZE.toast_big_size,
        width: SIZE.toast_big_size,
    },
});
