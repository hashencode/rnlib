import { DimensionValue, Image, ImageStyle, LayoutChangeEvent, StyleProp, View } from 'react-native';
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

        if (isUndefined(height) && imageWidth) {
            // 本地图片无法使用getSize来获取图片的尺寸
            if ((source as Source)?.uri) {
                Image.getSize((source as Source)?.uri as string, (_width, _height) => {
                    const aspectRatio = _height / _width;
                    if (isUndefined(innerHeight)) {
                        setInnerHeight(imageWidth * aspectRatio);
                    }
                });
            } else {
                setInnerHeight(imageHeight);
            }
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

    // 如果是本地图片且需要自适应
    if (!(source as Source)?.uri && (isUndefined(width) || isUndefined(height))) {
        return (
            <View style={{ width: '100%', height: '100%' }} onLayout={handleLayout}>
                <Image
                    source={source as any}
                    onError={onError}
                    resizeMode={FastImage.resizeMode.stretch}
                    {...rest}
                    style={[{ width: innerWidth || 1, height: innerHeight || 1, borderRadius: radius }, style]}
                />
            </View>
        );
    }

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
