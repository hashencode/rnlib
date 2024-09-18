import { StyleSheet } from 'react-native';
import { Flex, TextBox } from '@/lib/components';
import { mergeElement } from '@/lib/scripts/utils';
import { COLOR, SIZE } from '@/lib/scripts/const';
import { ITagProps } from '@/lib/_types/.components';
import useStyle from '@/lib/hooks/useStyle';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export default function Tag(props: ITagProps) {
    const {
        icon,
        borderColor = COLOR.border_default,
        backgroundColor = COLOR.bg_controller,
        color = COLOR.text_title,
        style,
        bordered = true,
    } = props;

    // 头部样式
    const rootStyle = useStyle<TextStyle>({
        defaultStyle: [styles.root],
        extraStyle: [style?.root, { borderWidth: bordered ? SIZE.border_default : 0, color, backgroundColor, borderColor }],
    });

    return (
        <Flex alignItems="center" justifyContent="center" columnGap={SIZE.space_sm} style={rootStyle}>
            {mergeElement(icon, { size: SIZE.tag_icon_size, color })}
            <TextBox size={SIZE.font_mini} color={color} style={style?.text}>
                {props.children}
            </TextBox>
        </Flex>
    );
}

const styles = StyleSheet.create({
    root: {
        borderRadius: SIZE.radius_md,
        height: SIZE.tag_height,
        paddingHorizontal: SIZE.space_md,
    },
});
