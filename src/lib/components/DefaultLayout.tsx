import { ReactNode } from 'react';
import { ScrollView, StatusBar, StyleSheet, View, ViewStyle } from 'react-native';
import { Flex } from '@/lib/components';
import { SCROLL_BASIC_CONFIG, SIZE } from '@/lib/scripts/const';
import useTheme from '../hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface DefaultLayoutProps {
    children?: ReactNode; // 插槽
    head?: ReactNode; // 头部插槽
    footer?: ReactNode; // 底部插槽
    statusBarConfig?: {
        whiteText?: boolean;
        backgroundColor?: string;
    }; // 状态栏配置
    scrollable?: boolean; // 是否使用scrollView
    style?: {
        wrapper?: ViewStyle; // 最外层样式
        scrollView?: ViewStyle; // 滚动区域样式
        contentContainer?: ViewStyle; // 主要内容区域样式
    }; // 样式
}

export default function DefaultLayout(props: DefaultLayoutProps) {
    const { scrollable = true, statusBarConfig, head, footer, style } = props;

    const { theme } = useTheme();

    return (
        <SafeAreaView style={styles.fullSize}>
            {/* 无传入背景色则使用白色背景，黑色字体，否则使用自定义颜色，白色字体 */}
            {/* todo: 解决ios下无法设置状态栏颜色的bug */}
            <StatusBar
                hidden={theme.statusBar.hidden}
                backgroundColor={statusBarConfig?.backgroundColor || 'transparent'}
                barStyle={statusBarConfig?.whiteText ? 'light-content' : 'dark-content'}
                {...statusBarConfig}
            />
            <Flex column style={StyleSheet.flatten([styles.fullSize, style?.wrapper])}>
                {head}
                {scrollable ? (
                    <ScrollView
                        {...SCROLL_BASIC_CONFIG}
                        style={StyleSheet.flatten([styles.fullSize, style?.scrollView])}
                        contentContainerStyle={StyleSheet.flatten([styles.contentContainer, style?.contentContainer])}>
                        {props?.children}
                    </ScrollView>
                ) : (
                    <View style={styles.fullSize}>{props?.children}</View>
                )}
                {footer}
            </Flex>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    fullSize: {
        flex: 1,
        flexGrow: 1,
        position: 'relative',
        width: '100%',
    },
    contentContainer: {
        padding: SIZE.space_lg,
    },
});
