import { ReactNode, useMemo, useState } from 'react';
import { ImageStyle, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import { Flex, ImageX, TextX } from './index';
import _ from 'lodash';
import { AvatarStatusMap, TextSizeMap } from '../scripts/enum';
import useStyle from '../hooks/useStyle';
import { Source } from '@d11/react-native-fast-image';

export interface IAvatarProps {
    alt?: string; // 未加载完成时显示的文本
    children?: ReactNode; // 内容插槽
    shape?: 'circle' | 'square'; // 形状
    size?: 'lg' | 'md' | 'sm' | number; // 尺寸
    source?: Source; // 图片来源

    style?: {
        image?: StyleProp<ImageStyle>; // 图片样式
        root?: StyleProp<ViewStyle>; // 根节点样式
        text?: StyleProp<TextStyle>; // 文本样式
    }; // 样式
}

export default function Avatar(props: IAvatarProps) {
    const { alt, shape = 'circle', source, size = 'md', style } = props;

    const [loadStatus, setLoadStatus] = useState(AvatarStatusMap['加载中']);

    const sizeStyle = useMemo(() => {
        let width = 0;
        let height = 0;
        if (_.isNumber(size)) {
            width = height = size;
        } else {
            width = height = SIZE[`avatar_size_${size}`];
        }
        return { width, height, borderRadius: shape === 'circle' ? width : SIZE.radius_md };
    }, [size, shape]);

    // 根节点样式
    const rootStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.root, sizeStyle],
        extraStyle: [style?.root],
    });

    return (
        <Flex alignItems="center" justifyContent="center" style={rootStyle}>
            {source ? (
                <ImageX
                    source={source}
                    width={sizeStyle.width}
                    height={sizeStyle.height}
                    radius={sizeStyle.borderRadius}
                    onError={() => setLoadStatus(AvatarStatusMap['加载失败'])}
                    style={style?.image}
                />
            ) : null}
            {(loadStatus === AvatarStatusMap['加载失败'] && alt) || props?.children ? (
                <Flex justifyContent="center" alignItems="center">
                    <TextX size={_.isNumber(size) ? size : TextSizeMap[size]} style={style?.text}>
                        {props?.children || alt}
                    </TextX>
                </Flex>
            ) : null}
        </Flex>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: COLOR.bg_controller,
        borderRadius: SIZE.radius_md,
        position: 'relative',
    },
});
