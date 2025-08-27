import { ReactNode } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import useStyle from '../hooks/useStyle';
import { COLOR, SIZE } from '../scripts/const';
import { Flex, Icon, TextX } from './index';

export interface IResultProps {
    extra?: ReactNode; // 额外元素
    subtitle?: ReactNode; // 副标题
    title?: ReactNode; // 标题
    type: 'success' | 'info' | 'waiting' | 'error' | 'warning'; // 类型

    style?: {
        icon?: StyleProp<TextStyle>; // 图标样式
        root?: StyleProp<ViewStyle>; // 根节点样式
        subtitle?: StyleProp<TextStyle>; // 副标题样式
        title?: StyleProp<TextStyle>; // 标题样式
    }; // 样式
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

export default function Result(props: IResultProps) {
    const { title, type = 'info', subtitle, extra, style } = props;

    // 根节点样式
    const rootStyle = useStyle<TextStyle>({
        defaultStyle: [styles.root],
        extraStyle: [style?.root],
    });

    return (
        <Flex justifyContent="center" alignItems="center" column style={rootStyle} rowGap={SIZE.space_2xl}>
            {/* 图标 */}
            <Icon
                name={IconMap[type].icon}
                size={SIZE.result_icon_size}
                fill={IconMap[type].color}
                color={COLOR.white}
                strokeWidth={SIZE.icon_stroke_sm}
                style={style?.icon}
            />
            <Flex column rowGap={SIZE.space_md} alignItems="center">
                <TextX size={SIZE.font_h2} style={style?.title}>
                    {title}
                </TextX>
                <TextX size={SIZE.font_secondary} color={COLOR.text_desc} style={style?.subtitle}>
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
