import { DimensionValue, Image, ImageStyle, LayoutChangeEvent, StyleProp } from 'react-native';
import { useState } from 'react';
import { isUndefined } from 'lodash';
import FastImage, { FastImageProps, Source } from '@d11/react-native-fast-image';

export interface IImageXProps extends Omit<FastImageProps, 'style'> {
    height?: DimensionValue; // 高度
    radius?: number; // 圆角
    style?: StyleProp<ImageStyle>; // 样式
    width?: DimensionValue; // 宽度
    onError?: () => void;
    onLayout?: (event: LayoutChangeEvent) => void;
    onLoad?: () => void;
}

export default function ImageX(props: IImageXProps) {
    const { height, radius = 0, style = {}, width, source, onError, onLayout, ...rest } = props;

    const [innerHeight, setInnerHeight] = useState(height);
    const [innerWidth, setInnerWidth] = useState(width);

    const handleLayout = (event: LayoutChangeEvent) => {
        const imageWidth = event.nativeEvent.layout.width;
        const imageHeight = event.nativeEvent.layout.height;
        onLayout?.(event);

        if (isUndefined(height) && imageWidth && (source as Source)?.uri) {
            Image.getSize((source as Source)?.uri as string, (_width, _height) => {
                const aspectRatio = _height / _width;
                if (isUndefined(innerHeight)) {
                    setInnerHeight(imageWidth * aspectRatio);
                }
            });
        }

        if (isUndefined(width) && imageHeight && (source as Source)?.uri) {
            Image.getSize((source as Source)?.uri as string, (_width, _height) => {
                const aspectRatio = _width / _height;
                if (isUndefined(imageWidth)) {
                    setInnerWidth(imageHeight * aspectRatio);
                }
            });
        }
    };

    return (
        <FastImage
            source={source}
            onLayout={handleLayout}
            onError={onError}
            resizeMode={FastImage.resizeMode.stretch}
            {...rest}
            style={[{ width: innerWidth || 1, height: innerHeight || 1, borderRadius: radius }, style as FastImageProps['style']]}
        />
    );
}
