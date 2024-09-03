import { Image as ImageOrigin, ImageProps as ImageOriginProps, ImageResizeMode, ImageStyle } from 'react-native';
import { SIZE } from '@/lib/scripts/const';

export interface ImageProps extends ImageOriginProps {
    height?: number; // 高度
    radius?: number; // 圆角
    resizeMode?: ImageResizeMode; // 图片裁剪模式
    size?: number; // 宽高尺寸
    style?: ImageStyle; // 样式
    width?: number; // 宽度
}

export default function Image(props: ImageProps) {
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
