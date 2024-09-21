import { StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import { TextX } from './index';
import { IGroupProps } from '../_types/components';
import useStyle from '../hooks/useStyle';

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
