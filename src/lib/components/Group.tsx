import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import _ from 'lodash';
import { Text } from '@/lib/components';

export interface GroupProps {
    children?: ReactNode; // 内容插槽
    first?: boolean; // 是否是首行
    footer?: ReactNode | string; // 底部插槽
    header?: ReactNode | string; // 头部插槽
    style?: {
        wrapper?: ViewStyle; // 最外层样式
        header?: ViewStyle; // 头部样式
        body?: ViewStyle; // 主要内容样式
        footer?: ViewStyle; // 底部样式
    }; // 样式
}

export default function Group(props: GroupProps) {
    const { header, footer, first, style } = props;
    const headPaddingStyle = { paddingTop: first ? 0 : SIZE.space_lg };

    return (
        <View style={StyleSheet.flatten([styles.wrapper, style?.wrapper])}>
            {header ? (
                <View style={StyleSheet.flatten([styles.header, headPaddingStyle])}>
                    {_.isString(header) ? (
                        <Text size={SIZE.font_h5} color={COLOR.text_desc}>
                            {header}
                        </Text>
                    ) : (
                        header
                    )}
                </View>
            ) : (
                <View style={styles.headerPlaceholder} />
            )}
            <View style={style?.body}>{props.children}</View>
            {footer ? (
                <View style={StyleSheet.flatten([styles.footer, style?.footer])}>
                    {_.isString(footer) ? (
                        <Text size={SIZE.font_h5} color={COLOR.text_desc}>
                            {footer}
                        </Text>
                    ) : (
                        footer
                    )}
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
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
