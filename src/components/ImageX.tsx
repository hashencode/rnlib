import { ImageStyle, StyleProp } from 'react-native';
import { SIZE } from '../scripts/const';
import TurboImage, { TurboImageProps } from 'react-native-turbo-image';

export interface IImageXProps extends Omit<TurboImageProps, 'style'> {
    height?: number; // 高度
    radius?: number; // 圆角
    size?: number; // 宽高尺寸
    style?: StyleProp<ImageStyle>; // 样式
    width?: number; // 宽度
}

export default function ImageX(props: IImageXProps) {
    const { height = props.size, radius = SIZE.radius_md, style = {}, width = props.size, ...rest } = props;

    return <TurboImage {...rest} style={[{ width, height, borderRadius: radius }, style]} />;
}
