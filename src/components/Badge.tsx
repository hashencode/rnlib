import { StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import { Flex, TextX } from './index';
import useStyle from '../hooks/useStyle';
import { IBadgeProps } from '../_types/components';

export default function Badge(props: IBadgeProps) {
    const { dot, style } = props;

    // 根节点样式
    const rootStyle = useStyle<ViewStyle>({
        defaultStyle: [dot ? styles.dot : styles.default],
        extraStyle: [style?.root],
    });

    if (dot) {
        return <View style={rootStyle} />;
    }

    return (
        <Flex alignItems="center" justifyContent="center" style={rootStyle}>
            <TextX size={SIZE.badge_font_size} color={COLOR.text_white} style={style?.text}>
                {props.children}
            </TextX>
        </Flex>
    );
}

const styles = StyleSheet.create({
    default: {
        backgroundColor: COLOR.danger,
        borderRadius: SIZE.badge_size / 2,
        height: SIZE.badge_size,
        minWidth: SIZE.badge_size,
        paddingHorizontal: SIZE.space_sm,
    },
    dot: {
        backgroundColor: COLOR.danger,
        borderRadius: SIZE.badge_size / 2,
        height: SIZE.badge_dot_size,
        width: SIZE.badge_dot_size,
    },
});
