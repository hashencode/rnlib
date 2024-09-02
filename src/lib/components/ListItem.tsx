import { StyleSheet, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import { Flex, Icon, PressHighlight, SwipeableRow, Text } from '@/lib/components';
import { mergeElement } from '@/lib/scripts/utils';
import { IListItemProps } from '@/lib/_types/.components';
import useStyle from '@/lib/hooks/useStyle';
import { useMemo } from 'react';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export default function ListItem(props: IListItemProps) {
    const {
        leftActions,
        rightActions,
        disabled,
        icon,
        style,
        title,
        subtitle,
        extra,
        extraTitle,
        extraSubtitle,
        showArrow,
        children,
        onPress,
    } = props;

    // 根节点样式
    const rootStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.root],
        extraStyle: [style?.root],
    });

    // 图标样式
    const iconStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.icon],
        extraStyle: [style?.icon],
    });

    // 主体样式
    const bodyStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.body],
        extraStyle: [style?.body],
    });

    // 额外区域样式
    const extraStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.extra],
        extraStyle: [style?.extra, { marginRight: showArrow ? SIZE.space_middle : SIZE.space_large }],
    });

    // 额外区域标题样式
    const extraTitleStyle = useStyle<TextStyle>({
        defaultStyle: [styles.extraText],
        extraStyle: [style?.extraTitle],
    });

    // 额外区域标题样式
    const extraSubtitleStyle = useStyle<TextStyle>({
        defaultStyle: [styles.extraText],
        extraStyle: [style?.extraSubtitle],
    });

    // 图标节点
    const iconEl = useMemo(() => {
        return mergeElement(icon, {
            size: SIZE.icon_mini,
            style: iconStyle,
        });
    }, [icon, iconStyle]);

    // 主体元素
    const itemElement = (
        <Flex block alignItems="center" style={rootStyle}>
            {iconEl}

            <Flex alignItems="stretch" style={bodyStyle}>
                <Flex column justifyContent="center" grow={1} shrink={0} style={style?.main}>
                    <Text size={SIZE.font_h3} style={style?.title}>
                        {title}
                    </Text>
                    <Text size={SIZE.font_secondary} color={COLOR.text_desc} style={style?.subTitle}>
                        {subtitle}
                    </Text>
                    {children}
                </Flex>

                <Flex column alignItems="flex-end" justifyContent="center" style={extraStyle}>
                    <Text size={SIZE.font_h3} style={extraTitleStyle}>
                        {extraTitle}
                    </Text>
                    <Text size={SIZE.font_h5} color={COLOR.text_desc} style={extraSubtitleStyle}>
                        {extraSubtitle}
                    </Text>
                    {extra}
                </Flex>
                {showArrow ? <Icon name="chevron-right" size={SIZE.icon_small} color={COLOR.icon_touchable} style={styles.arrow} /> : null}
            </Flex>
        </Flex>
    );

    // 无反馈效果
    return (
        <PressHighlight disabled={disabled} onPress={onPress}>
            {leftActions || rightActions ? (
                <SwipeableRow leftActions={leftActions} rightActions={rightActions}>
                    {itemElement}
                </SwipeableRow>
            ) : (
                itemElement
            )}
        </PressHighlight>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: COLOR.white,
        overflow: 'hidden',
        paddingLeft: SIZE.space_large,
    },
    icon: {
        borderRadius: SIZE.radius_middle,
        flexShrink: 0,
        marginRight: SIZE.space_large,
        overflow: 'hidden',
    },
    body: {
        minHeight: SIZE.list_item_min_height,
        paddingVertical: SIZE.space_large,
        position: 'relative',
    },
    extra: {
        marginRight: SIZE.space_large,
    },
    extraText: {
        textAlign: 'right',
    },
    arrow: {
        alignSelf: 'center',
        marginRight: SIZE.space_middle,
    },
});
