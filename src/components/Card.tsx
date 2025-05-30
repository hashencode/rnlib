import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import { Flex, TextX } from './index';
import { mergeElement } from '../scripts/utils';
import useStyle from '../hooks/useStyle';
import { ReactElement, ReactNode } from 'react';

export interface ICardProps {
    children?: ReactNode; // 内容插槽
    extra?: ReactElement; // 头部额外节点
    footer?: ReactElement; // 页脚节点
    icon?: ReactElement; // 头部图标
    title?: string; // 标题

    style?: {
        body?: StyleProp<ViewStyle>; // 主体样式
        footer?: StyleProp<ViewStyle>; // 页脚节点
        header?: StyleProp<ViewStyle>; // 头部样式
        root?: StyleProp<ViewStyle>; // 根节点样式
        title?: StyleProp<TextStyle>; // 标题样式
    }; // 样式
}

export default function Card(props: ICardProps) {
    const { title, extra, icon, style } = props;
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
                <Flex justifyContent="space-between" alignItems="center" wrap="nowrap" columnGap={SIZE.space_md} style={headerStyle}>
                    <Flex alignItems="center" columnGap={SIZE.space_md} grow={1}>
                        {/* 图标 */}
                        {mergeElement(icon, { size: SIZE.icon_xs })}
                        {/* 标题 */}
                        <TextX size={SIZE.font_h4} weight={SIZE.weight_title} style={style?.title}>
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
    root: {
        backgroundColor: COLOR.white,
        borderRadius: SIZE.radius_lg,
        overflow: 'hidden',
        width: '100%',
    },
    header: {
        borderBottomWidth: SIZE.border_default,
        borderColor: COLOR.border_default,
        marginHorizontal: SIZE.space_lg,
        paddingVertical: SIZE.space_lg,
    },
    body: {
        padding: SIZE.space_lg,
    },
    footer: {
        borderColor: COLOR.border_default,
        borderTopWidth: SIZE.border_default,
        marginHorizontal: SIZE.space_lg,
        paddingVertical: SIZE.space_lg,
    },
});
