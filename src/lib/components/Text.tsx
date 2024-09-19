import { useMemo } from 'react';
import { StyleSheet, Text as TextOrigin } from 'react-native';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { COLOR, SIZE } from '@/lib/scripts/const';
import { ITextProps } from '@/lib/_types/.components';
import useStyle from '@/lib/hooks/useStyle';

export default function Text(props: ITextProps) {
    const { style, weight = 'normal', size = SIZE.font_basic, color = COLOR.text_title, children, ...rest } = props;

    const rootStyle = useStyle<TextStyle>({
        defaultStyle: [
            {
                fontSize: size,
                color,
                fontWeight: weight,
            },
        ],
        extraStyle: [style],
    });

    if (!children) {
        return null;
    }

    return (
        <TextOrigin style={rootStyle} {...rest}>
            {children}
        </TextOrigin>
    );
}
