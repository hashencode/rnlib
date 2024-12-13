import { Source } from '@d11/react-native-fast-image';
import { isValidElement, ReactElement, ReactNode } from 'react';
import { ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import useStyle from '../hooks/useStyle';
import { COLOR, SIZE } from '../scripts/const';
import { Flex, ImageX, TextX } from './index';

export interface IErrorBlockProps {
    extra?: ReactNode; // 操作区域
    fullscreen?: boolean; // 全屏显示
    image?: ImageSourcePropType | ReactElement; // 主图
    ImageStyleProps?: StyleProp<ImageStyle>; // 主图样式
    style?: {
        image?: StyleProp<ImageStyle>; // 图片样式
        root?: StyleProp<ViewStyle>; // 根节点样式
        subtitle?: StyleProp<TextStyle>; // 副标题样式
        title?: StyleProp<TextStyle>; // 标题样式
    }; // 样式
    subtitle?: ReactNode; // 副标题

    title?: ReactNode; // 标题
}

export default function ErrorBlock(props: IErrorBlockProps) {
    const { extra, fullscreen, image, style, subtitle, title } = props;
    const imageSize = fullscreen ? SIZE.error_block_fullscreen_icon_size : SIZE.error_block_icon_size;

    // 根节点样式
    const rootStyle = useStyle<TextStyle>({
        defaultStyle: [styles.root],
        extraStyle: [style?.root],
    });

    // 图片样式
    const imageStyle = useStyle<ImageStyle>({
        defaultStyle: [styles.image],
        extraStyle: [{ height: imageSize, width: imageSize }, style?.image],
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
        <Flex alignItems="center" column justifyContent="center" style={rootStyle}>
            {/* 图标 */}
            {renderImage()}

            {fullscreen ? (
                <Flex alignItems="center" column rowGap={SIZE.space_md}>
                    <TextX size={SIZE.font_h1} style={style?.title}>
                        {title}
                    </TextX>
                    <TextX color={COLOR.text_desc} size={SIZE.font_secondary} style={style?.subtitle}>
                        {subtitle}
                    </TextX>
                </Flex>
            ) : (
                <TextX color={COLOR.text_desc} size={SIZE.font_h5} style={style?.title}>
                    {title}
                </TextX>
            )}

            {extra ? <View style={styles.extra}>{extra}</View> : extra}
        </Flex>
    );
}

const styles = StyleSheet.create({
    extra: {
        marginTop: SIZE.space_lg,
    },
    image: {
        marginBottom: SIZE.space_lg,
    },
    root: {
        paddingHorizontal: SIZE.space_xl,
    },
});
