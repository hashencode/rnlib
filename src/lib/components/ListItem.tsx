import React, { ReactElement, ReactNode } from 'react';
import { ImageStyle, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import _ from 'lodash';
import { Flex, Icon, PressHighlight, SwipeableRow, Text } from './index';
import { mergeElement } from '@/lib/scripts/utils';

export interface ListItemActions {
    color?: string; // 背景色
    content?: ReactNode; // 内容插槽
    width?: number; // 操作按钮宽度
    onPress?: () => void; // 点击回调函数
}

export interface ListItemProps {
    actions?: ListItemActions[]; // 操作按钮
    children?: ReactNode; // 内容插槽
    disabled?: boolean; // 禁用
    extra?: ReactNode; // 右侧附加元素
    extraSubtitle?: string; // 额外内容副标题
    extraTitle?: string; // 额外内容标题
    last?: boolean; // 尾项，不显示分割线
    icon?: ReactElement; // 左侧图标
    showArrow?: boolean; // 显示右侧箭头
    subtitle?: string; // 副标题
    title?: string; // 主标题,
    style?: {
        wrapper?: ViewStyle; // 最外层样式
        icon?: ImageStyle; // 图标样式
        main?: ViewStyle; // 主要区域样式
        content?: ViewStyle; // 内容区域样式
        contentTitle?: TextStyle; // 内容标题样式
        contentSubtitle?: TextStyle; // 内容副标题样式
        extra?: ViewStyle; // 额外内容区域样式
        extraTitle?: TextStyle; // 额外内容标题样式
        extraSubtitle?: TextStyle; // 额外内容副标题样式
        divider?: ViewStyle; // 分割线样式
    }; // 样式
    onPress?: () => void; // 点击事件回调
}

export default function ListItem(props: ListItemProps) {
    const { actions, disabled, last, icon, style, title, subtitle, extra, extraTitle, extraSubtitle, showArrow, onPress } = props;
    const showMainPart = title || subtitle;

    // 主体元素
    const itemElement = (
        <Flex block alignItems="center" style={StyleSheet.flatten([styles.wrapper, disabled ? styles.disabled : {}, style?.wrapper])}>
            {/* 渲染图标 */}
            {mergeElement(icon, {
                size: SIZE.icon_mini,
                style: StyleSheet.flatten([styles.icon, style?.icon]),
            })}

            <Flex alignItems="stretch" style={StyleSheet.flatten([styles.main, style?.main])}>
                {!last ? <View style={StyleSheet.flatten([styles.divider, style?.divider])}></View> : null}

                {showMainPart ? (
                    <Flex column justifyContent="center" grow={1} shrink={0} style={style?.content}>
                        <Text size={SIZE.font_h3} style={style?.contentTitle}>
                            {title}
                        </Text>
                        <Text size={SIZE.font_secondary} color={COLOR.text_desc} style={style?.contentSubtitle}>
                            {subtitle}
                        </Text>
                        {props?.children}
                    </Flex>
                ) : null}

                <Flex column alignItems="flex-end" justifyContent="center" style={StyleSheet.flatten([styles.extra, style?.extra])}>
                    <Text size={SIZE.font_h3} style={StyleSheet.flatten([styles.extraText, style?.extraTitle])}>
                        {extraTitle}
                    </Text>
                    <Text
                        size={SIZE.font_h5}
                        color={COLOR.text_desc}
                        style={StyleSheet.flatten([styles.extraText, style?.extraSubtitle])}>
                        {extraSubtitle}
                    </Text>
                    {extra}
                </Flex>
                {showArrow ? (
                    <Icon name="chevron-right" size={SIZE.icon_small} color={COLOR.icon_touchable} style={styles.arrow} />
                ) : null}
            </Flex>
        </Flex>
    );

    // 无反馈效果
    return (
        <PressHighlight disabled={onPress ? disabled : true} onPress={onPress}>
            {_.isUndefined(actions) ? itemElement : <SwipeableRow actions={actions}>{itemElement}</SwipeableRow>}
        </PressHighlight>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: COLOR.white,
        overflow: 'hidden',
        paddingLeft: SIZE.space_large,
    },
    disabled: {
        opacity: COLOR.opacity_disabled_option,
        pointerEvents: 'none',
    },
    icon: {
        borderRadius: SIZE.radius_middle,
        flexShrink: 0,
        marginRight: SIZE.space_large,
        overflow: 'hidden',
    },
    main: {
        minHeight: SIZE.list_item_min_height,
        paddingVertical: SIZE.space_large,
        position: 'relative',
    },
    divider: {
        backgroundColor: COLOR.border_default,
        bottom: 0,
        height: SIZE.border_default,
        left: 0,
        position: 'absolute',
        width: '100%',
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
