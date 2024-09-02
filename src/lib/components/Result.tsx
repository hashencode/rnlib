import { ReactNode } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import { Flex, Icon, Text } from '@/lib/components';

export interface ResultProps {
    style?: ViewStyle; // 样式
    subtitle?: ReactNode | string; // 副标题
    title?: ReactNode | string; // 标题
    type: 'success' | 'info' | 'waiting' | 'error' | 'warning'; // 类型
}

const IconMap = {
    success: {
        icon: 'check-circle-2',
        color: COLOR.primary,
    },
    info: {
        icon: 'info',
        color: COLOR.primary,
    },
    error: {
        icon: 'x-circle',
        color: COLOR.danger,
    },
    waiting: {
        icon: 'clock-4',
        color: COLOR.success,
    },
    warning: {
        icon: 'alert-circle',
        color: COLOR.warning,
    },
};

export default function Result(props: ResultProps) {
    const { title, type = 'info', subtitle, style } = props;

    return (
        <Flex justifyContent="center" alignItems="center" column style={StyleSheet.flatten([styles.wrapper, style])}>
            {/* 图标 */}
            <Icon
                name={IconMap[type].icon}
                size={SIZE.result_icon_size}
                fill={IconMap[type].color}
                color={COLOR.white}
                strokeWidth={SIZE.result_icon_stroke_width}
                style={styles.icon}
            />

            <Text size={SIZE.font_h2} style={styles.title}>
                {title}
            </Text>
            <Text size={SIZE.font_secondary} color={COLOR.text_desc}>
                {subtitle}
            </Text>
        </Flex>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: SIZE.space_large,
        paddingVertical: SIZE.space_max,
    },
    icon: {
        marginBottom: SIZE.space_max,
    },
    title: {
        marginBottom: SIZE.space_middle,
    },
});
