import { ReactNode } from 'react';
import { ScrollView, StatusBar, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { SIZE } from '../../src';
import Head from '../../src/components/Head';

export interface IDefaultLayoutProps {
    children?: ReactNode; // 插槽
    head?: ReactNode;

    style?: {
        body?: StyleProp<ViewStyle>; // 主体样式
        content?: StyleProp<ViewStyle>; // 内容区域样式
        root?: StyleProp<ViewStyle>; // 最外层样式
    }; // 样式
}

export default function DefaultLayout(props: IDefaultLayoutProps) {
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView style={[styles.root]}>
            {/*顶部安全区域*/}
            <View style={[styles.safeTop, { height: insets.top }]} />
            <StatusBar />
            <View style={[styles.body]}>
                {/*头部*/}
                <Head title={props.head} />
                {/*主体内容*/}
                <ScrollView>
                    <View style={[styles.scrollContent]}>{props?.children}</View>
                </ScrollView>
            </View>
            {/*底部安全区域*/}
            <View style={[styles.safeBottom, { height: insets.bottom }]} />
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
