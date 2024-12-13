import { ReactNode } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import useStyle from '../hooks/useStyle';
import { COLOR, SIZE } from '../scripts/const';
import { Flex, Icon, TextX } from './index';

export interface IResultProps {
    extra?: ReactNode; // 额外元素
    style?: {
        icon?: StyleProp<TextStyle>; // 图标样式
        root?: StyleProp<ViewStyle>; // 根节点样式
        subtitle?: StyleProp<TextStyle>; // 副标题样式
        title?: StyleProp<TextStyle>; // 标题样式
    }; // 样式
    subtitle?: ReactNode; // 副标题
    title?: ReactNode; // 标题

    type: 'error' | 'info' | 'success' | 'waiting' | 'warning'; // 类型
}

const IconMap = {
    error: {
        color: COLOR.danger,
        icon: 'x-circle',
    },
    info: {
        color: COLOR.primary,
        icon: 'info',
    },
    success: {
        color: COLOR.primary,
        icon: 'check-circle-2',
    },
    waiting: {
        color: COLOR.success,
        icon: 'clock-4',
    },
    warning: {
        color: COLOR.warning,
        icon: 'alert-circle',
    },
};

export default function Result(props: IResultProps) {
    const { extra, style, subtitle, title, type = 'info' } = props;

    // 根节点样式
    const rootStyle = useStyle<TextStyle>({
        defaultStyle: [styles.root],
        extraStyle: [style?.root],
    });

    return (
        <Flex alignItems="center" column justifyContent="center" rowGap={SIZE.space_2xl} style={rootStyle}>
            {/* 图标 */}
            <Icon
                color={COLOR.white}
                fill={IconMap[type].color}
                name={IconMap[type].icon}
                size={SIZE.result_icon_size}
                strokeWidth={SIZE.icon_stroke_sm}
                style={style?.icon}
            />
            <Flex alignItems="center" column rowGap={SIZE.space_md}>
                <TextX size={SIZE.font_h2} style={style?.title}>
                    {title}
                </TextX>
                <TextX color={COLOR.text_desc} size={SIZE.font_secondary} style={style?.subtitle}>
                    {subtitle}
                </TextX>
            </Flex>

            {extra}
        </Flex>
    );
}

const styles = StyleSheet.create({
    root: {
        paddingHorizontal: SIZE.space_lg,
        paddingVertical: SIZE.space_2xl,
    },
});
