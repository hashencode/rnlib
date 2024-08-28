import { useMemo } from 'react';
import { StyleSheet, Text as TextOrigin } from 'react-native';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { COLOR, SIZE } from '@/lib/scripts/const';
import { ITextProps } from '@/lib/_types/.components';

export default function Text(props: ITextProps) {
    const { style, weight = 'regular', size = SIZE.font_basic, color = COLOR.text_title, children, ...rest } = props;

    const defaultStyle: TextStyle = useMemo(() => {
        return {
            fontSize: size,
            color,
            weight,
        };
    }, [size, color, weight]);

    if (!children) {
        return null;
    }

    return (
        <TextOrigin style={StyleSheet.flatten([defaultStyle, style])} {...rest}>
            {children}
        </TextOrigin>
    );
}
