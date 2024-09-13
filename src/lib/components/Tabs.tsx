import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { LayoutChangeEvent, Pressable, ScrollView, StyleSheet, ViewStyle, View } from 'react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';
import _ from 'lodash';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Flex, Text } from '@/lib/components';
import { useMergedState } from '../hooks';

type TabsItemValue = string;

export interface TabsItem {
    content?: ReactNode; // 内容插槽
    extra?: ReactNode; // 选项额外节点
    title?: string; // 主文本
    value: TabsItemValue; // 选项值
}

export interface TabsProps {
    defaultValue?: TabsItemValue; // 默认值
    items?: TabsItem[]; // 内容项
    scrollable?: boolean; // 可滚动
    style?: {
        wrapper?: ViewStyle; // 最外层样式
        header?: ViewStyle; // Tab栏样式
        body?: ViewStyle; // 内容区域样式
        underline?: ViewStyle; // 下划线样式
    }; // 样式
    value?: TabsItemValue; // 受控值
    onChange?: (val: TabsItemValue) => void; // 切换选项事件回调
}

export default function Tabs(props: TabsProps) {
    const { value, defaultValue, scrollable, items = [], style, onChange } = props;
    const [isLayoutEnd, setIsLayoutEnd] = useState(false);
    const wrapperWidth = useRef<number>(0);
    const parentRects = useRef<{ [key: TabsItemValue]: any }>({});
    const childRects = useRef<{ [key: TabsItemValue]: any }>({});
    const underlineX = useRef<number>(0);
    const scrollViewRef = useRef<ScrollView>(null);
    const translateXAnim = useSharedValue(0);
    const widthAnim = useSharedValue(0);
    const [innerValue, handleChange] = useMergedState('', {
        defaultValue,
        value,
        onChange,
    });

    // 获取最外层的宽度
    const getWrapperWidth = (ev: LayoutChangeEvent) => {
        wrapperWidth.current = ev.nativeEvent.layout.width;
        setIsLayoutEnd(true);
    };

    // 获取触摸区域的宽度信息
    const getParentRect = (val: TabsItemValue, ev: LayoutChangeEvent) => {
        const { width, x } = ev.nativeEvent.layout;
        parentRects.current = { ...parentRects.current, [val]: { width, x } };
    };

    // 获取实际展示的节点的宽度和偏移量
    const getChildRect = (val: TabsItemValue, ev: LayoutChangeEvent) => {
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
            const wrapperCenter = wrapperWidth.current / 2;
            const tabCenter = parentRects.current[innerValue]?.width / 2;
            translateXAnim.value = withTiming(lineX, {
                duration: 200,
            });
            if (scrollable && scrollViewRef) {
                if (lineX > wrapperCenter) {
                    scrollViewRef?.current?.scrollTo({ x: lineX - wrapperCenter + tabCenter, animated: true });
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
    const renderHeader = () => {
        return (
            <Flex
                block
                alignItems="center"
                justifyContent="space-around"
                style={StyleSheet.flatten([styles.header, style?.header])}
                columnGap={SIZE.space_2xl}>
                {items.map(item => {
                    const isActive = innerValue === item.value;
                    return (
                        <Pressable
                            style={styles.tabItem}
                            onPress={() => handleChange(item.value)}
                            onLayout={ev => getParentRect(item.value, ev)}
                            key={item.value}>
                            <Flex
                                alignItems="center"
                                justifyContent="center"
                                column
                                shrink={0}
                                onLayout={ev => getChildRect(item.value, ev)}>
                                <Text size={SIZE.font_h3} color={isActive ? COLOR.text_primary : COLOR.text_title}>
                                    {item?.title}
                                </Text>
                                {item?.extra}
                            </Flex>
                        </Pressable>
                    );
                })}
                <Animated.View style={[styles.underline, style?.underline, widthAnimStyle, translateXAnimStyle]} />
            </Flex>
        );
    };

    // 渲染主体
    const renderBody = useMemo(() => {
        return <View style={style?.body}>{items.find(item => item.value === innerValue)?.content}</View>;
    }, [items, innerValue]);

    if (scrollable) {
        return (
            <>
                <ScrollView ref={scrollViewRef} showsHorizontalScrollIndicator={false} horizontal onLayout={ev => getWrapperWidth(ev)}>
                    {renderHeader()}
                </ScrollView>
                {renderBody}
            </>
        );
    }

    return (
        <View style={style?.wrapper} onLayout={ev => getWrapperWidth(ev)}>
            {renderHeader()}
            {renderBody}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
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
        bottom: -SIZE.border_default,
        height: SIZE.border_bold,
        position: 'absolute',
    },
});
