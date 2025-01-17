import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import { TextX } from './index';
import useStyle from '../hooks/useStyle';
import { ReactNode } from 'react';

export interface IGroupProps {
    children?: ReactNode; // 内容插槽
    first?: boolean; // 是否是首行
    footer?: ReactNode | string; // 底部插槽
    header?: ReactNode | string; // 头部插槽
    style?: {
        root?: StyleProp<ViewStyle>; // 最外层样式
        header?: StyleProp<ViewStyle>; // 头部样式
        body?: StyleProp<ViewStyle>; // 主要内容样式
        footer?: StyleProp<ViewStyle>; // 底部样式
    }; // 样式
}

export default function Group(props: IGroupProps) {
    const { header, footer, first, style } = props;

    // 根节点样式
    const rootStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.root],
        extraStyle: [style?.root],
    });

    // 头部节点样式
    const headerStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.header, { paddingTop: first ? 0 : SIZE.space_lg }],
        extraStyle: [style?.header],
    });

    // 页脚节点样式
    const footerStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.footer],
        extraStyle: [style?.footer],
    });

    return (
        <View style={rootStyle}>
            {header ? (
                <TextX size={SIZE.font_h5} color={COLOR.text_desc} style={headerStyle}>
                    {header}
                </TextX>
            ) : (
                <View style={styles.headerPlaceholder} />
            )}
            <View style={style?.body}>{props.children}</View>
            {footer ? (
                <TextX size={SIZE.font_h5} color={COLOR.text_desc} style={footerStyle}>
                    {footer}
                </TextX>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
    },
    header: {
        paddingVertical: SIZE.space_md,
    },
    headerPlaceholder: {
        height: SIZE.space_lg,
    },
    footer: {
        paddingVertical: SIZE.space_md,
    },
});
