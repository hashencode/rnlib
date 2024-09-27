import { useStyle, useTheme } from '../hooks';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { ScrollView, ScrollViewProps, StatusBar, StatusBarProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Head } from './index';
import _ from 'lodash';
import { SCROLL_BASIC_CONFIG, SIZE } from '../scripts/const';
import { ReactNode } from 'react';

export interface IDefaultLayoutProps {
    children?: ReactNode; // 插槽
    head?: ReactNode; // 头部插槽
    footer?: ReactNode; // 底部插槽
    safeAreaConfig?: SafeAreaViewProps; // 安全区域配置
    statusBarConfig?: StatusBarProps; // 状态栏配置
    scrollConfig?: ScrollViewProps; // 滚动区域配置
    defaultScroll?: Boolean; // 是否可滚动

    style?: {
        root?: StyleProp<ViewStyle>; // 最外层样式
        body?: StyleProp<ViewStyle>; // 主体样式
        content?: StyleProp<ViewStyle>; // 内容区域样式
    }; // 样式
}

export default function DefaultLayout(props: IDefaultLayoutProps) {
    const { statusBarConfig, safeAreaConfig, scrollConfig, defaultScroll = true, head, footer, style } = props;

    const { theme } = useTheme();

    // 滚动区域样式
    const bodyStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.body],
        extraStyle: [style?.body],
    });

    // 滚动区域样式
    const scrollContentStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.scrollContent],
        extraStyle: [style?.content],
    });

    // 非滚动区域样式
    const contentStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.content],
        extraStyle: [style?.content],
    });

    return (
        <SafeAreaView {...safeAreaConfig} style={style?.root}>
            {/* 无传入背景色则使用白色背景，黑色字体，否则使用自定义颜色，白色字体 */}
            {/* todo: 解决ios下无法设置状态栏颜色的bug */}
            <StatusBar hidden={theme.statusBar.hidden} {...statusBarConfig} />
            <View style={bodyStyle}>
                {_.isString(head) ? <Head title={head} /> : head}
                {defaultScroll ? (
                    <ScrollView {...SCROLL_BASIC_CONFIG} {...scrollConfig}>
                        <View style={scrollContentStyle}>{props?.children}</View>
                    </ScrollView>
                ) : (
                    <View style={contentStyle}>{props?.children}</View>
                )}
                {footer}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    body: {
        height: '100%',
        position: 'relative',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: SIZE.space_lg,
    },
});
