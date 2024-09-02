import { ReactNode, useMemo, useState } from 'react';
import { ImageSourcePropType, ImageStyle, StyleSheet } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import { Flex, Image, Text } from '@/lib/components';
import _ from 'lodash';

export interface AvatarProps {
    alt?: string; // 未加载完成时显示的文本
    children?: ReactNode; // 内容插槽
    shape?: 'circle' | 'square'; // 形状
    size?: 'large' | 'middle' | 'small' | number; // 尺寸
    source?: ImageSourcePropType; // 图片来源
    style?: ImageStyle; // 样式
}

enum TextSizeMap {
    large = SIZE.font_h2,
    middle = SIZE.font_h5,
    small = SIZE.font_mini,
}

export default function Avatar(props: AvatarProps) {
    const { alt, shape = 'circle', source, size = 'middle', style } = props;

    const [loadEnd, setLoadEnd] = useState(false);

    const sizeStyle = useMemo(() => {
        let width = 0;
        let height = 0;
        if (_.isNumber(size)) {
            width = height = size;
        } else {
            width = height = SIZE[`avatar_size_${size}`];
        }
        return { width, height, borderRadius: shape === 'circle' ? width : SIZE.radius_middle };
    }, [size, shape]);

    return (
        <Flex alignItems="center" justifyContent="center" style={StyleSheet.flatten([styles.wrapper, sizeStyle, style])}>
            {source ? (
                <Image
                    source={source}
                    width={sizeStyle.width}
                    height={sizeStyle.height}
                    radius={sizeStyle.borderRadius}
                    onLoadEnd={() => setLoadEnd(true)}
                />
            ) : null}
            {!loadEnd ? (
                <Flex style={styles.alt} justifyContent="center" alignItems="center">
                    <Text size={_.isNumber(size) ? size : TextSizeMap[size]}>{alt}</Text>
                </Flex>
            ) : null}
            {props?.children}
        </Flex>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: COLOR.bg_controller,
        borderRadius: SIZE.radius_middle,
        position: 'relative',
    },
    alt: {
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
    },
});
