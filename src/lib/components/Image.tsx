import { Image as ImageOrigin } from 'react-native';
import { SIZE } from '@/lib/scripts/const';
import { IImageProps } from '@/lib/_types/.components';

export default function Image(props: IImageProps) {
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
