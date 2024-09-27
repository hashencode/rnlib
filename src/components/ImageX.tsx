import { Image as ImageOrigin, ImageResizeMode, ImageStyle, StyleProp } from 'react-native';
import { SIZE } from '../scripts/const';
import { ImageProps as ImageOriginProps } from 'react-native/Libraries/Image/Image';

export interface IImageProps extends ImageOriginProps {
    height?: number; // 高度
    radius?: number; // 圆角
    resizeMode?: ImageResizeMode; // 图片裁剪模式
    size?: number; // 宽高尺寸
    style?: StyleProp<ImageStyle>; // 样式
    width?: number; // 宽度
}

export default function ImageX(props: IImageProps) {
    const {
        defaultSource = require('../assets/images/imagePlaceholder.jpg'),
        height = props.size,
        radius = SIZE.radius_md,
        style = {},
        width = props.size,
        ...rest
    } = props;

    return <ImageOrigin defaultSource={defaultSource} width={width} height={height} borderRadius={radius} {...rest} style={style} />;
}
