import { ReactElement, ReactNode } from 'react';
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

import useStyle from '../hooks/useStyle';
import { COLOR, SIZE } from '../scripts/const';
import { mergeElement } from '../scripts/utils';
import { Flex, TextX } from './index';

export interface ICardProps {
    children?: ReactNode; // 内容插槽
    extra?: ReactElement; // 头部额外节点
    footer?: ReactElement; // 页脚节点
    icon?: ReactElement; // 头部图标
    style?: {
        body?: StyleProp<ViewStyle>; // 主体样式
        footer?: StyleProp<ViewStyle>; // 页脚节点
        header?: StyleProp<ViewStyle>; // 头部样式
        root?: StyleProp<ViewStyle>; // 根节点样式
        title?: StyleProp<TextStyle>; // 标题样式
    }; // 样式

    title?: string; // 标题
}

export default function Card(props: ICardProps) {
    const { extra, icon, style, title } = props;
    const showHeader = icon || title || extra;

    // 根节点样式
    const rootStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.root],
        extraStyle: [style?.root],
    });

    // 头部节点样式
    const headerStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.header],
        extraStyle: [style?.header],
    });

    // 主体节点样式
    const bodyStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.body],
        extraStyle: [style?.body],
    });

    // 页脚节点样式
    const footerStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.footer],
        extraStyle: [style?.footer],
    });

    return (
        <View style={rootStyle}>
            {/* 头部 */}
            {showHeader ? (
                <Flex alignItems="center" columnGap={SIZE.space_md} justifyContent="space-between" style={headerStyle} wrap="nowrap">
                    <Flex alignItems="center" columnGap={SIZE.space_md} grow={1}>
                        {/* 图标 */}
                        {mergeElement(icon, { size: SIZE.icon_xs })}
                        {/* 标题 */}
                        <TextX size={SIZE.font_h4} style={style?.title} weight={SIZE.weight_title}>
                            {title}
                        </TextX>
                    </Flex>
                    {/* 额外节点 */}
                    {props?.extra}
                </Flex>
            ) : null}
            {/* 主体 */}
            {props?.children ? <View style={bodyStyle}>{props.children}</View> : null}
            {/* 页脚 */}
            {props?.footer ? <View style={footerStyle}>{props.footer}</View> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        padding: SIZE.space_lg,
    },
    footer: {
        borderColor: COLOR.border_default,
        borderTopWidth: SIZE.border_default,
        marginHorizontal: SIZE.space_lg,
        paddingVertical: SIZE.space_lg,
    },
    header: {
        borderBottomWidth: SIZE.border_default,
        borderColor: COLOR.border_default,
        marginHorizontal: SIZE.space_lg,
        paddingVertical: SIZE.space_lg,
    },
    root: {
        backgroundColor: COLOR.white,
        borderRadius: SIZE.radius_lg,
        overflow: 'hidden',
        width: '100%',
    },
});
