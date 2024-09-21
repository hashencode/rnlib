import { Text as TextOrigin } from 'react-native';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { COLOR, SIZE } from '../scripts/const';
import { ITextProps } from '../_types/components';
import useStyle from '../hooks/useStyle';
import { isAndroid } from '../scripts/utils';

export default function Text(props: ITextProps) {
    const { style, weight = 'normal', size = SIZE.font_basic, color = COLOR.text_title, children, ...rest } = props;

    const platformStyle = isAndroid() ? { lineHeight: 1.3 * (style?.fontSize || size) } : {};

    const rootStyle = useStyle<TextStyle>({
        defaultStyle: [
            {
                fontSize: size,
                color,
                fontWeight: weight,
            },
            platformStyle,
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
