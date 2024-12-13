import { Source } from '@d11/react-native-fast-image';
import _ from 'lodash';
import { ReactNode, useMemo, useState } from 'react';
import { ImageStyle, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import useStyle from '../hooks/useStyle';
import { COLOR, SIZE } from '../scripts/const';
import { AvatarStatusMap, TextSizeMap } from '../scripts/enum';
import { Flex, ImageX, TextX } from './index';

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
    const { alt, shape = 'circle', size = 'md', source, style } = props;

    const [loadStatus, setLoadStatus] = useState(AvatarStatusMap['加载中']);

    const sizeStyle = useMemo(() => {
        let width = 0;
        let height = 0;
        if (_.isNumber(size)) {
            width = height = size;
        } else {
            width = height = SIZE[`avatar_size_${size}`];
        }
        return { borderRadius: shape === 'circle' ? width : SIZE.radius_md, height, width };
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
                    height={sizeStyle.height}
                    onError={() => setLoadStatus(AvatarStatusMap['加载失败'])}
                    radius={sizeStyle.borderRadius}
                    source={source}
                    style={style?.image}
                    width={sizeStyle.width}
                />
            ) : null}
            {(loadStatus === AvatarStatusMap['加载失败'] && alt) || props?.children ? (
                <Flex alignItems="center" justifyContent="center">
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
