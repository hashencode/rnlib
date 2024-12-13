import { DimensionValue, ImageStyle, LayoutChangeEvent, StyleProp } from 'react-native';
import { useRef, useState } from 'react';
import _ from 'lodash';
import FastImage, { FastImageProps } from '@d11/react-native-fast-image';

export interface IImageXProps extends Omit<FastImageProps, 'style'> {
    height?: number; // 高度
    radius?: number; // 圆角
    size?: DimensionValue; // 宽高尺寸
    style?: StyleProp<ImageStyle>; // 样式
    width?: DimensionValue; // 宽度
    onError?: () => void;
    onLayout?: (event: LayoutChangeEvent) => void;
    onLoad?: () => void;
}

export default function ImageX(props: IImageXProps) {
    const { height, radius = 0, style = {}, width = props.size, onError, onLayout, ...rest } = props;

    const imageWidth = useRef(0);
    const [innerHeight, setInnerHeight] = useState(props.size || height);

    const handleLayout = (event: LayoutChangeEvent) => {
        imageWidth.current = event.nativeEvent.layout.width;
        onLayout?.(event);
    };

    const handleLoad = (event: any) => {
        const { width: originalWidth, height: originalHeight } = event.nativeEvent;
        if (originalWidth && originalHeight) {
            const aspectRatio = originalHeight / originalWidth;
            if (_.isUndefined(innerHeight)) {
                setInnerHeight(imageWidth.current * aspectRatio);
            }
        }
    };

    return (
        <FastImage
            onLayout={handleLayout}
            onLoad={handleLoad}
            onError={onError}
            {...rest}
            style={[{ width, height: innerHeight, borderRadius: radius }, style as FastImageProps['style']]}
        />
    );
}
