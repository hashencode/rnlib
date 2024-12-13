import FastImage, { FastImageProps } from '@d11/react-native-fast-image';
import _ from 'lodash';
import { useRef, useState } from 'react';
import { DimensionValue, ImageStyle, LayoutChangeEvent, StyleProp } from 'react-native';

export interface IImageXProps extends Omit<FastImageProps, 'style'> {
    height?: number; // 高度
    onError?: () => void;
    onLayout?: (event: LayoutChangeEvent) => void;
    onLoad?: () => void;
    radius?: number; // 圆角
    size?: DimensionValue; // 宽高尺寸
    style?: StyleProp<ImageStyle>; // 样式
    width?: DimensionValue; // 宽度
}

export default function ImageX(props: IImageXProps) {
    const { height, onError, onLayout, radius = 0, style = {}, width = props.size, ...rest } = props;

    const imageWidth = useRef(0);
    const [innerHeight, setInnerHeight] = useState(props.size || height);

    const handleLayout = (event: LayoutChangeEvent) => {
        imageWidth.current = event.nativeEvent.layout.width;
        onLayout?.(event);
    };

    const handleLoad = (event: any) => {
        const { height: originalHeight, width: originalWidth } = event.nativeEvent;
        if (originalWidth && originalHeight) {
            const aspectRatio = originalHeight / originalWidth;
            if (_.isUndefined(innerHeight)) {
                setInnerHeight(imageWidth.current * aspectRatio);
            }
        }
    };

    return (
        <FastImage
            onError={onError}
            onLayout={handleLayout}
            onLoad={handleLoad}
            {...rest}
            style={[{ borderRadius: radius, height: innerHeight, width }, style as FastImageProps['style']]}
        />
    );
}
