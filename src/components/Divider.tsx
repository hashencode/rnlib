import { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import useStyle from '../hooks/useStyle';
import { COLOR, SIZE } from '../scripts/const';
import { Flex, TextX } from './index';

export interface IDividerProps extends PropsWithChildren {
    orientation?: 'center' | 'left' | 'right'; // 文字位置
    style?: {
        divider?: StyleProp<ViewStyle>;
        root?: StyleProp<ViewStyle>;
        text?: StyleProp<TextStyle>;
    }; // 样式

    type?: 'horizontal' | 'vertical'; // 水平还是垂直类型
}

export default function Divider(props: IDividerProps) {
    const { children, orientation = 'center', style, type = 'horizontal' } = props;
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
    horizontalSeparator: {
        backgroundColor: COLOR.border_default,
        flexGrow: 1,
        flexShrink: 0,
        height: SIZE.border_default,
    },
    text: {
        color: COLOR.text_subtitle,
        marginHorizontal: SIZE.space_xl,
    },
    vertical: {
        height: SIZE.divider_vertical_height,
        marginHorizontal: SIZE.space_lg,
    },
    verticalSeparator: {
        backgroundColor: COLOR.border_default,
        height: '100%',
        width: SIZE.border_default,
    },
});
