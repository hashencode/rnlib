import { DimensionValue, ImageStyle, NativeSyntheticEvent, StyleProp } from 'react-native';
import TurboImage, { Failure, TurboImageProps } from 'react-native-turbo-image';

export interface IImageXProps extends Omit<TurboImageProps, 'style'> {
    height?: number; // 高度
    radius?: number; // 圆角
    size?: DimensionValue; // 宽高尺寸
    style?: StyleProp<ImageStyle>; // 样式
    width?: number; // 宽度
    onError?: (error: NativeSyntheticEvent<Failure>) => void;
}

export default function ImageX(props: IImageXProps) {
    const { height = props.size, radius = 0, style = {}, width = props.size, onError, ...rest } = props;

    return <TurboImage onFailure={onError} {...rest} style={[{ width, height, borderRadius: radius }, style]} />;
}
