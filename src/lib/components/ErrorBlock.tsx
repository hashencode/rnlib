import { isValidElement } from 'react';
import { ImageStyle, StyleSheet, View } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';
import { IErrorBlockProps } from '../_types/.components';
import useStyle from '../hooks/useStyle';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { Flex, ImageX, TextBox } from '../components';

export default function ErrorBlock(props: IErrorBlockProps) {
    const { title, subtitle, extra, fullscreen, image, style } = props;
    const imageSize = fullscreen ? SIZE.error_block_fullscreen_icon_size : SIZE.error_block_icon_size;

    // 根节点样式
    const rootStyle = useStyle<TextStyle>({
        defaultStyle: [styles.root],
        extraStyle: [style?.root],
    });

    // 图片样式
    const imageStyle = useStyle<ImageStyle>({
        defaultStyle: [styles.image],
        extraStyle: [{ width: imageSize, height: imageSize }, style?.image],
    });

    const renderImage = () => {
        if (!image) {
            return null;
        }
        if (isValidElement(image)) {
            return image;
        }
        return <ImageX source={image as ImageSourcePropType} style={imageStyle} />;
    };

    return (
        <Flex justifyContent="center" alignItems="center" column style={rootStyle}>
            {/* 图标 */}
            {renderImage()}

            {fullscreen ? (
                <Flex column rowGap={SIZE.space_md} alignItems="center">
                    <TextBox size={SIZE.font_h1} style={style?.title}>
                        {title}
                    </TextBox>
                    <TextBox size={SIZE.font_secondary} color={COLOR.text_desc} style={style?.subtitle}>
                        {subtitle}
                    </TextBox>
                </Flex>
            ) : (
                <TextBox size={SIZE.font_h5} color={COLOR.text_desc} style={style?.title}>
                    {title}
                </TextBox>
            )}

            {extra ? <View style={styles.extra}>{extra}</View> : extra}
        </Flex>
    );
}

const styles = StyleSheet.create({
    root: {
        paddingHorizontal: SIZE.space_xl,
    },
    image: {
        marginBottom: SIZE.space_lg,
    },
    extra: {
        marginTop: SIZE.space_lg,
    },
});
