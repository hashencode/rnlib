import { DimensionValue, Image, ImageRequireSource, ImageStyle, LayoutChangeEvent, StyleProp } from 'react-native';
import { useRef, useState } from 'react';
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

    const imageWidth = useRef(0);
    const [innerHeight, setInnerHeight] = useState(height);
    const [sourceValue, setSourceValue] = useState<Source | ImageRequireSource>();

    const handleLayout = (event: LayoutChangeEvent) => {
        imageWidth.current = event.nativeEvent.layout.width;
        onLayout?.(event);

        if (isUndefined(height) && (source as Source)?.uri) {
            Image.getSize((source as Source)?.uri as string, (width: number, height: number) => {
                const aspectRatio = height / width;
                if (isUndefined(innerHeight)) {
                    setInnerHeight(imageWidth.current * aspectRatio);
                }
                setSourceValue(source);
            });
        }
    };

    return (
        <FastImage
            source={sourceValue}
            onLayout={handleLayout}
            onError={onError}
            resizeMode={FastImage.resizeMode.stretch}
            {...rest}
            style={[{ width, height: innerHeight || 800, borderRadius: radius }, style as FastImageProps['style']]}
        />
    );
}
