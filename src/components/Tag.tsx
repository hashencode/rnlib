import { ReactElement, ReactNode } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import useStyle from '../hooks/useStyle';
import { COLOR, SIZE } from '../scripts/const';
import { mergeElement } from '../scripts/utils';
import { Flex, TextX } from './index';

export interface ITagProps {
    backgroundColor?: ViewStyle['backgroundColor']; // 背景色
    borderColor?: ViewStyle['borderColor']; // 边框色
    bordered?: boolean; // 显示边框
    children?: ReactNode; // 内容插槽
    color?: TextStyle['color']; // 文本和图标颜色
    icon?: ReactElement; // 图标

    style?: {
        root?: StyleProp<ViewStyle>; // 根节点样式
        text?: StyleProp<TextStyle>; // 文本样式
    }; // 样式
}

export default function Tag(props: ITagProps) {
    const {
        backgroundColor = COLOR.bg_controller,
        borderColor = COLOR.border_default,
        bordered = true,
        color = COLOR.text_title,
        icon,
        style,
    } = props;

    // 根节点样式
    const rootStyle = useStyle<TextStyle>({
        defaultStyle: [styles.root],
        extraStyle: [{ backgroundColor, borderColor, borderWidth: bordered ? SIZE.border_default : 0, color }, style?.root],
    });

    return (
        <Flex alignItems="center" columnGap={SIZE.space_sm} justifyContent="center" style={rootStyle}>
            {mergeElement(icon, { color, size: SIZE.tag_icon_size })}
            <TextX color={color} size={SIZE.font_mini} style={style?.text}>
                {props.children}
            </TextX>
        </Flex>
    );
}

const styles = StyleSheet.create({
    root: {
        borderRadius: SIZE.radius_md,
        paddingHorizontal: SIZE.space_md,
        paddingVertical: SIZE.space_xs,
    },
});
