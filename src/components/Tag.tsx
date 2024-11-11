import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Flex, TextX } from './index';
import { mergeElement } from '../scripts/utils';
import { COLOR, SIZE } from '../scripts/const';
import useStyle from '../hooks/useStyle';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { ReactElement, ReactNode } from 'react';

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
        icon,
        borderColor = COLOR.border_default,
        backgroundColor = COLOR.bg_controller,
        color = COLOR.text_title,
        style,
        bordered = true,
    } = props;

    // 根节点样式
    const rootStyle = useStyle<TextStyle>({
        defaultStyle: [styles.root],
        extraStyle: [{ borderWidth: bordered ? SIZE.border_default : 0, color, backgroundColor, borderColor }, style?.root],
    });

    return (
        <Flex alignItems="center" justifyContent="center" columnGap={SIZE.space_sm} style={rootStyle}>
            {mergeElement(icon, { size: SIZE.tag_icon_size, color })}
            <TextX size={SIZE.font_mini} color={color} style={style?.text}>
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
