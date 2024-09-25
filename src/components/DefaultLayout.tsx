import { IDefaultLayoutProps } from '../_types/components';
import { useStyle, useTheme } from '../hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar, StyleSheet, View, ViewStyle } from 'react-native';
import { Head } from './index';
import _ from 'lodash';
import { SCROLL_BASIC_CONFIG, SIZE } from '../scripts/const';

export default function DefaultLayout(props: IDefaultLayoutProps) {
    const { statusBarConfig, safeAreaConfig, scrollConfig, defaultScroll = true, head, footer, style } = props;

    const { theme } = useTheme();

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
            <View style={styles.container}>
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
    container: {
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
