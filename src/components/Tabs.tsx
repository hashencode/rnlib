import { useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import _ from 'lodash';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Flex, PressHighlight, TextX } from './index';
import { useMergedState } from '../hooks';
import { ITabsItemValue, ITabsProps } from '../_types/components';
import useStyle from '../hooks/useStyle';

export default function Tabs(props: ITabsProps) {
    const { value, defaultValue, scrollable, items = [], style, headerConfig, onChange } = props;

    const [isLayoutEnd, setIsLayoutEnd] = useState(false);
    const rootWidth = useRef<number>(0);
    const parentRects = useRef<{ [key: ITabsItemValue]: any }>({});
    const childRects = useRef<{ [key: ITabsItemValue]: any }>({});
    const underlineX = useRef<number>(0);
    const scrollViewRef = useRef<ScrollView>(null);

    const translateXAnim = useSharedValue(0);
    const widthAnim = useSharedValue(0);
    const [innerValue, handleChange] = useMergedState('', {
        defaultValue,
        value,
        onChange,
    });

    // 头部样式
    const headerStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.header],
        extraStyle: [style?.header],
    });

    // 选项卡样式
    const tabItemStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.tabItem],
        extraStyle: [style?.tabItem],
    });

    // 分割线样式
    const dividerStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.divider],
        extraStyle: [style?.divider],
    });

    // 获取最外层的宽度
    const getWrapperWidth = (ev: LayoutChangeEvent) => {
        rootWidth.current = ev.nativeEvent.layout.width;
        setIsLayoutEnd(true);
    };

    // 获取触摸区域的宽度信息
    const getHeaderRect = (val: ITabsItemValue, ev: LayoutChangeEvent) => {
        const { width, x } = ev.nativeEvent.layout;
        parentRects.current = { ...parentRects.current, [val]: { width, x } };
    };

    // 获取实际展示的节点的宽度和偏移量
    const getTabItemRect = (val: ITabsItemValue, ev: LayoutChangeEvent) => {
        const { width } = ev.nativeEvent.layout;
        childRects.current = { ...childRects.current, [val]: { width } };
    };

    useEffect(() => {
        if (!_.isUndefined(innerValue) && isLayoutEnd) {
            // width
            let underlineWidth = 0;
            const parentRectsValue = parentRects.current;
            const childRectsValue = childRects.current;
            if (!_.isNil(innerValue) && innerValue in parentRectsValue && innerValue in childRectsValue) {
                const { width, x } = parentRectsValue[innerValue];
                const { width: childWidth } = childRectsValue[innerValue];
                underlineX.current = x + (width - childWidth) / 2;
                underlineWidth = childWidth;
            }
            widthAnim.value = withTiming(underlineWidth, {
                duration: 200,
            });
            // translateX
            const lineX = underlineX.current;
            const rootCenter = rootWidth.current / 2;
            const tabCenter = parentRects.current[innerValue]?.width / 2;
            translateXAnim.value = withTiming(lineX, {
                duration: 200,
            });
            if (scrollable && scrollViewRef) {
                if (lineX > rootCenter) {
                    scrollViewRef?.current?.scrollTo({ x: lineX - rootCenter + tabCenter, animated: true });
                } else {
                    scrollViewRef?.current?.scrollTo({ x: 0, animated: true });
                }
            }
        }
    }, [innerValue, isLayoutEnd]);

    // 下划线宽度动画样式
    const widthAnimStyle = useAnimatedStyle(() => {
        return {
            width: widthAnim.value,
        };
    });

    // 位移动画样式
    const translateXAnimStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateXAnim.value }],
        };
    });

    // 渲染头部节点
    const renderHeader = (
        <Flex block alignItems="center" justifyContent="space-around" style={headerStyle} columnGap={SIZE.space_2xl}>
            {items.map(item => {
                const isActive = innerValue === item.value;
                return (
                    <PressHighlight
                        underlayColor="transparent"
                        disabled={item?.disabled}
                        style={tabItemStyle}
                        onPress={() => handleChange(item.value)}
                        onLayout={ev => getHeaderRect(item.value, ev)}
                        key={item.value}>
                        <TextX
                            size={SIZE.font_h3}
                            color={isActive ? COLOR.text_primary : COLOR.text_title}
                            onLayout={ev => getTabItemRect(item.value, ev)}
                            style={style?.label}>
                            {item?.label}
                        </TextX>
                    </PressHighlight>
                );
            })}
            <Animated.View style={[styles.underline, style?.underline, widthAnimStyle, translateXAnimStyle]} />
        </Flex>
    );

    return (
        <View style={style?.root}>
            {scrollable ? (
                <ScrollView
                    ref={scrollViewRef}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    {...headerConfig}
                    onLayout={ev => {
                        getWrapperWidth(ev);
                        headerConfig?.onLayout?.(ev);
                    }}>
                    {renderHeader}
                </ScrollView>
            ) : (
                <View onLayout={ev => getWrapperWidth(ev)}>{renderHeader}</View>
            )}
            <View style={dividerStyle}></View>
            <View style={style?.body}>{items.find(item => item.value === innerValue)?.children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'relative',
    },
    divider: {
        borderBottomColor: COLOR.border_default,
        borderBottomWidth: SIZE.border_default,
    },
    tabItem: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        flexShrink: 0,
        justifyContent: 'center',
        minHeight: SIZE.tabs_height,
        position: 'relative',
    },
    underline: {
        backgroundColor: COLOR.primary,
        borderRadius: SIZE.border_default,
        bottom: 0,
        height: SIZE.border_bold,
        position: 'absolute',
    },
});
