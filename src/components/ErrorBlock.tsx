import { isValidElement, ReactElement, ReactNode } from 'react';
import { ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';
import useStyle from '../hooks/useStyle';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import { Flex, ImageX, TextX } from './index';
import { Source } from 'react-native-turbo-image';

export interface IErrorBlockProps {
    extra?: ReactNode; // 操作区域
    fullscreen?: boolean; // 全屏显示
    image?: ReactElement | ImageSourcePropType; // 主图
    ImageStyleProps?: StyleProp<ImageStyle>; // 主图样式
    subtitle?: ReactNode; // 副标题
    title?: ReactNode; // 标题

    style?: {
        root?: StyleProp<ViewStyle>; // 根节点样式
        image?: StyleProp<ImageStyle>; // 图片样式
        title?: StyleProp<TextStyle>; // 标题样式
        subtitle?: StyleProp<TextStyle>; // 副标题样式
    }; // 样式
}

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
        return <ImageX source={image as Source} style={imageStyle} />;
    };

    return (
        <Flex justifyContent="center" alignItems="center" column style={rootStyle}>
            {/* 图标 */}
            {renderImage()}

            {fullscreen ? (
                <Flex column rowGap={SIZE.space_md} alignItems="center">
                    <TextX size={SIZE.font_h1} style={style?.title}>
                        {title}
                    </TextX>
                    <TextX size={SIZE.font_secondary} color={COLOR.text_desc} style={style?.subtitle}>
                        {subtitle}
                    </TextX>
                </Flex>
            ) : (
                <TextX size={SIZE.font_h5} color={COLOR.text_desc} style={style?.title}>
                    {title}
                </TextX>
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
