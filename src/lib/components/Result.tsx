import { StyleSheet } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import { Flex, Icon, Text } from '@/lib/components';
import { IResultProps } from '@/lib/_types/.components';
import useStyle from '@/lib/hooks/useStyle';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

const IconMap = {
    success: {
        icon: 'check-circle-2',
        color: COLOR.primary,
    },
    info: {
        icon: 'info',
        color: COLOR.primary,
    },
    error: {
        icon: 'x-circle',
        color: COLOR.danger,
    },
    waiting: {
        icon: 'clock-4',
        color: COLOR.success,
    },
    warning: {
        icon: 'alert-circle',
        color: COLOR.warning,
    },
};

export default function Result(props: IResultProps) {
    const { title, type = 'info', subtitle, extra, style } = props;

    // 根节点样式
    const rootStyle = useStyle<TextStyle>({
        defaultStyle: [styles.root],
        extraStyle: [style?.root],
    });

    return (
        <Flex justifyContent="center" alignItems="center" column style={rootStyle} rowGap={SIZE.space_2xl}>
            {/* 图标 */}
            <Icon
                name={IconMap[type].icon}
                size={SIZE.result_icon_size}
                fill={IconMap[type].color}
                color={COLOR.white}
                strokeWidth={SIZE.icon_stroke_sm}
                style={style?.icon}
            />
            <Flex column rowGap={SIZE.space_md} alignItems="center">
                <Text size={SIZE.font_h2} style={style?.title}>
                    {title}
                </Text>
                <Text size={SIZE.font_secondary} color={COLOR.text_desc} style={style?.subtitle}>
                    {subtitle}
                </Text>
            </Flex>

            {extra}
        </Flex>
    );
}

const styles = StyleSheet.create({
    root: {
        paddingHorizontal: SIZE.space_lg,
        paddingVertical: SIZE.space_2xl,
    },
});
