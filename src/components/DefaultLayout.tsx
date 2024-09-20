import { ScrollView, StatusBar, StyleSheet, View, ViewStyle } from 'react-native';
import { Flex, Head } from './index';
import { SCROLL_BASIC_CONFIG, SIZE } from '../scripts/const';
import useTheme from '../hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import _ from 'lodash';
import { IDefaultLayoutProps } from '../_types/components';
import useStyle from '../hooks/useStyle';

export default function DefaultLayout(props: IDefaultLayoutProps) {
    const { scrollable = true, statusBarConfig, head, footer, style } = props;

    const { theme } = useTheme();

    // 根节点样式
    const rootStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.fullSize],
        extraStyle: [style?.root],
    });

    // 滚动区域样式
    const scrollViewStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.fullSize],
        extraStyle: [style?.scrollView],
    });

    // 滚动内容样式
    const scrollContentStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.contentContainer],
        extraStyle: [style?.contentContainer],
    });

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
            <Flex column style={rootStyle}>
                {_.isString(head) ? <Head title={head} /> : head}
                {scrollable ? (
                    <ScrollView {...SCROLL_BASIC_CONFIG} style={scrollViewStyle} contentContainerStyle={scrollContentStyle}>
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
