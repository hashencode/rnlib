import _ from 'lodash';
import { ReactNode } from 'react';
import { ScrollView, ScrollViewProps, StatusBar, StatusBarProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView, SafeAreaViewProps, useSafeAreaInsets } from 'react-native-safe-area-context';

import { SCROLL_BASIC_CONFIG, SIZE } from '../scripts/const';
import { Head } from './index';

export interface IDefaultLayoutProps {
    children?: ReactNode; // 插槽
    defaultScroll?: Boolean; // 是否可滚动
    footer?: ReactNode; // 底部插槽
    head?: ReactNode; // 头部插槽
    safeAreaConfig?: SafeAreaViewProps; // 安全区域配置
    safeBottomColor?: string; // 底部安全区域颜色
    safeTopColor?: string; // 顶部安全区域颜色
    scrollConfig?: ScrollViewProps; // 滚动区域配置
    statusBarConfig?: StatusBarProps; // 状态栏配置

    style?: {
        body?: StyleProp<ViewStyle>; // 主体样式
        content?: StyleProp<ViewStyle>; // 内容区域样式
        root?: StyleProp<ViewStyle>; // 最外层样式
    }; // 样式
}

export default function DefaultLayout(props: IDefaultLayoutProps) {
    const {
        defaultScroll = true,
        footer,
        head,
        safeAreaConfig,
        safeBottomColor = 'transparent',
        safeTopColor = 'transparent',
        scrollConfig,
        statusBarConfig,
        style,
    } = props;
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView {...safeAreaConfig} style={[styles.root, style?.root]}>
            {/*顶部安全区域*/}
            <View style={[styles.safeTop, { backgroundColor: safeTopColor, height: insets.top }]} />
            <StatusBar {...statusBarConfig} />
            <View style={[styles.body, style?.body]}>
                {/*头部*/}
                {_.isString(head) ? <Head title={head} /> : head}
                {/*主体内容*/}
                {defaultScroll ? (
                    // 自带滑动区域
                    <ScrollView {...SCROLL_BASIC_CONFIG} {...scrollConfig}>
                        <View style={[styles.scrollContent, style?.content]}>{props?.children}</View>
                    </ScrollView>
                ) : (
                    // 无滑动区域
                    <View style={[styles.content, style?.content]}>{props?.children}</View>
                )}
                {/*底部*/}
                {footer}
            </View>
            {/*底部安全区域*/}
            <View style={[styles.safeBottom, { backgroundColor: safeBottomColor, height: insets.bottom }]} />
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
    root: {
        backgroundColor: '#f7f7f7',
    },
    safeBottom: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        width: '100%',
    },
    safeTop: {
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
    },
    scrollContent: {
        padding: SIZE.space_lg,
    },
});
