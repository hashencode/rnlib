import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import { Flex, TextX } from './index';
import useStyle from '../hooks/useStyle';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { PropsWithChildren } from 'react';

export interface IDividerProps extends PropsWithChildren {
    orientation?: 'left' | 'center' | 'right'; // 文字位置
    type?: 'horizontal' | 'vertical'; // 水平还是垂直类型

    style?: {
        divider?: StyleProp<ViewStyle>;
        root?: StyleProp<ViewStyle>;
        text?: StyleProp<TextStyle>;
    }; // 样式
}

export default function Divider(props: IDividerProps) {
    const { type = 'horizontal', orientation = 'center', style, children } = props;
    const isHorizontal = type === 'horizontal';

    // 根节点样式
    const rootStyle = useStyle<ViewStyle>({
        defaultStyle: [styles[type]],
        extraStyle: [style?.root],
    });

    // 左侧分割线样式
    const leftStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.horizontalSeparator],
        extraStyle: [{ flexGrow: orientation === 'left' ? 0.1 : 1 }, style?.divider],
    });

    // 文本样式
    const textStyle = useStyle<TextStyle>({
        defaultStyle: [styles.text],
        extraStyle: [style?.text],
    });

    // 右侧分割线样式
    const rightStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.horizontalSeparator],
        extraStyle: [{ flexGrow: orientation === 'right' ? 0.1 : 1 }, style?.divider],
    });

    return (
        <Flex alignItems="center" justifyContent="center" style={rootStyle}>
            {isHorizontal ? (
                <>
                    <View style={leftStyle} />
                    <TextX size={SIZE.font_h5} style={textStyle}>
                        {children}
                    </TextX>
                    <View style={rightStyle} />
                </>
            ) : (
                <View style={styles.verticalSeparator} />
            )}
        </Flex>
    );
}

const styles = StyleSheet.create({
    horizontal: {
        marginVertical: SIZE.divider_horizontal_height / 2,
    },
    vertical: {
        height: SIZE.divider_vertical_height,
        marginHorizontal: SIZE.space_lg,
    },
    horizontalSeparator: {
        backgroundColor: COLOR.border_default,
        flexGrow: 1,
        flexShrink: 0,
        height: SIZE.border_default,
    },
    verticalSeparator: {
        backgroundColor: COLOR.border_default,
        height: '100%',
        width: SIZE.border_default,
    },
    text: {
        color: COLOR.text_subtitle,
        marginHorizontal: SIZE.space_xl,
    },
});
