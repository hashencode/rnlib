import { ITextProps } from '../_types/components';
import _ from 'lodash';
import { COLOR, SIZE } from '../scripts/const';
import useStyle from '../hooks/useStyle';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { Text } from 'react-native';
import { isValidElement } from 'react';

export default function TextX(props: ITextProps) {
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
