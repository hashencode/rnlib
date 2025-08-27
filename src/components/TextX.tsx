import { isNil } from 'lodash';
import { PropsWithChildren, isValidElement } from 'react';
import { StyleProp, Text, TextProps } from 'react-native';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import useStyle from '../hooks/useStyle';
import { COLOR, SIZE } from '../scripts/const';

export interface ITextXProps extends TextProps, PropsWithChildren {
    color?: TextStyle['color']; // 颜色
    size?: number; // 字体大小
    weight?: TextStyle['fontWeight']; // 字重
    style?: StyleProp<TextStyle>; // 样式
}

export default function TextX(props: ITextXProps) {
    const { style, weight = 'normal', size = SIZE.font_basic, color = COLOR.text_title, children, ...rest } = props;

    const rootStyle = useStyle<TextStyle>({
        defaultStyle: [
            {
                fontSize: (style as TextStyle)?.fontSize || size,
                color,
                fontWeight: weight,
            },
        ],
        extraStyle: [style],
    });

    if (isNil(children)) {
        return null;
    }

    if (isValidElement(children)) {
        return children;
    }

    return (
        <Text style={rootStyle} allowFontScaling={false} {...rest}>
            {children}
        </Text>
    );
}
