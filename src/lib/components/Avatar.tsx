import { useMemo, useState } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import { Flex, Image, TextBox } from '@/lib/components';
import _ from 'lodash';
import { AvatarStatusMap, TextSizeMap } from '@/lib/scripts/enum';
import { IAvatarProps } from '@/lib/_types/.components';
import useStyle from '@/lib/hooks/useStyle';

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
                <Image
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
                    <TextBox size={_.isNumber(size) ? size : TextSizeMap[size]} style={style?.text}>
                        {props?.children || alt}
                    </TextBox>
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
