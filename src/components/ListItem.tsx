import { PropsWithChildren, ReactElement, ReactNode, useMemo } from 'react';
import { ImageStyle, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { TextStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import useStyle from '../hooks/useStyle';
import { COLOR, SIZE } from '../scripts/const';
import { mergeElement } from '../scripts/utils';
import { Flex, Icon, PressHighlight, SwipeableRow, TextX } from './index';
import { ISwipeableRowProps } from './SwipeableRow';

export interface IListItemProps extends PropsWithChildren {
    disabled?: boolean; // 禁用
    extra?: ReactNode; // 右侧附加节点
    extraSubtitle?: ReactNode; // 额外内容副标题
    extraTitle?: ReactNode; // 额外内容标题
    icon?: ReactElement; // 左侧图标
    leftActions?: ISwipeableRowProps['leftActions']; // 左侧操作按钮
    onPress?: () => void; // 点击事件回调
    rightActions?: ISwipeableRowProps['rightActions']; // 右侧操作按钮
    showArrow?: boolean; // 显示右侧箭头
    style?: {
        body?: StyleProp<ViewStyle>; // 内容区域样式
        extra?: StyleProp<ViewStyle>; // 额外内容区域样式
        extraSubtitle?: StyleProp<TextStyle>; // 额外内容副标题样式
        extraTitle?: StyleProp<TextStyle>; // 额外内容标题样式
        icon?: StyleProp<ImageStyle>; // 图标样式
        main?: StyleProp<ViewStyle>; // 主要内容区域样式
        root?: StyleProp<ViewStyle>; // 最外层样式
        subTitle?: StyleProp<TextStyle>; // 内容副标题样式
        title?: StyleProp<TextStyle>; // 内容标题样式
    }; // 样式

    subtitle?: ReactNode; // 副标题

    title?: ReactNode; // 主标题
}

export default function ListItem(props: IListItemProps) {
    const {
        children,
        disabled,
        extra,
        extraSubtitle,
        extraTitle,
        icon,
        leftActions,
        onPress,
        rightActions,
        showArrow,
        style,
        subtitle,
        title,
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
        extraStyle: [{ marginRight: showArrow ? SIZE.space_md : SIZE.space_lg }, style?.extra],
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
            size: SIZE.icon_xs,
            style: iconStyle,
        });
    }, [icon, iconStyle]);

    // 主体节点
    const itemElement = (
        <Flex alignItems="center" block style={rootStyle}>
            {iconEl}

            <Flex alignItems="stretch" style={bodyStyle}>
                <Flex column grow={1} justifyContent="center" style={style?.main}>
                    <TextX size={SIZE.font_h3} style={style?.title}>
                        {title}
                    </TextX>
                    <TextX color={COLOR.text_desc} size={SIZE.font_secondary} style={style?.subTitle}>
                        {subtitle}
                    </TextX>
                    {children}
                </Flex>

                <Flex alignItems="flex-end" column justifyContent="center" shrink={0} style={extraStyle}>
                    <TextX size={SIZE.font_h3} style={extraTitleStyle}>
                        {extraTitle}
                    </TextX>
                    <TextX color={COLOR.text_desc} size={SIZE.font_h5} style={extraSubtitleStyle}>
                        {extraSubtitle}
                    </TextX>
                    {extra}
                </Flex>
                {showArrow ? <Icon color={COLOR.icon_touchable} name="chevron-right" size={SIZE.icon_sm} style={styles.arrow} /> : null}
            </Flex>
        </Flex>
    );

    const content =
        leftActions || rightActions ? (
            <SwipeableRow leftActions={leftActions} rightActions={rightActions}>
                {itemElement}
            </SwipeableRow>
        ) : (
            itemElement
        );

    if (onPress) {
        return (
            <PressHighlight disabled={disabled} onPress={onPress}>
                {content}
            </PressHighlight>
        );
    }

    return <>{content}</>;
}

const styles = StyleSheet.create({
    arrow: {
        alignSelf: 'center',
        marginRight: SIZE.space_md,
    },
    body: {
        minHeight: SIZE.list_item_min_height,
        paddingVertical: SIZE.space_lg,
        position: 'relative',
    },
    extra: {
        marginRight: SIZE.space_lg,
    },
    extraText: {
        textAlign: 'right',
    },
    icon: {
        borderRadius: SIZE.radius_md,
        flexShrink: 0,
        marginRight: SIZE.space_lg,
        overflow: 'hidden',
    },
    root: {
        backgroundColor: COLOR.white,
        overflow: 'hidden',
        paddingLeft: SIZE.space_lg,
    },
});
