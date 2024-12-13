import _ from 'lodash';
import { isValidElement, PropsWithChildren } from 'react';
import { StyleProp, Text, TextProps } from 'react-native';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import useStyle from '../hooks/useStyle';
import { COLOR, SIZE } from '../scripts/const';

export interface ITextXProps extends PropsWithChildren, TextProps {
    color?: TextStyle['color']; // 颜色
    size?: number; // 字体大小
    style?: StyleProp<TextStyle>; // 样式
    weight?: TextStyle['fontWeight']; // 字重
}

export default function TextX(props: ITextXProps) {
    const { children, color = COLOR.text_title, size = SIZE.font_basic, style, weight = 'normal', ...rest } = props;

    const rootStyle = useStyle<TextStyle>({
        defaultStyle: [
            {
                color,
                fontSize: (style as TextStyle)?.fontSize || size,
                fontWeight: weight,
            },
        ],
        extraStyle: [style],
    });

    if (_.isNil(children)) {
        return null;
    }

    if (isValidElement(children)) {
        return children;
    }

    return (
        <Text style={rootStyle} {...rest}>
            {children}
        </Text>
    );
}
