import { ReactNode, useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, ScrollView, ScrollViewProps, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { COLOR, SIZE } from '../scripts/const';
import { isNil, isUndefined } from 'lodash';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Flex, PressHighlight, TextX } from './index';
import { useMergedState } from '../hooks';
import useStyle from '../hooks/useStyle';

export type ITabsItemValue = string;

export interface ITabsItem {
    disabled?: boolean; // 禁用
    children?: ReactNode; // 内容插槽
    label?: ReactNode; // 主文本
    value: ITabsItemValue; // 选项值
}

export interface ITabsProps {
    defaultValue?: ITabsItemValue; // 默认值
    destroyInactiveTabPane?: boolean; // 隐藏是是否销毁节点
    items?: ITabsItem[]; // 内容项
    scrollable?: boolean; // 可滚动
    headerConfig?: ScrollViewProps; // 头部滚动配置项
    value?: ITabsItemValue; // 受控值

    style?: {
        divider?: StyleProp<ViewStyle>; // 分割线样式
        header?: StyleProp<ViewStyle>; // 头部样式
        label?: StyleProp<TextStyle>; // 选项卡文本样式
        labelActive?: StyleProp<TextStyle>; // 激活选项卡文本样式
        root?: StyleProp<ViewStyle>; // 根节点样式
        tabItem?: StyleProp<ViewStyle>; // 选项卡样式
        underline?: StyleProp<ViewStyle>; // 下划线样式
    }; // 样式

    onChange?: (val: ITabsItemValue) => void; // 切换选项事件回调
}

export default function Tabs(props: ITabsProps) {
    const { value, defaultValue, scrollable, items = [], style, headerConfig, destroyInactiveTabPane, onChange } = props;

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

    // 根节点样式
    const rootStyle = useStyle<ViewStyle>({
        defaultStyle: [styles.root],
        extraStyle: [style?.root],
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
        if (!isUndefined(innerValue) && isLayoutEnd) {
            // width
            let underlineWidth = 0;
            const parentRectsValue = parentRects.current;
            const childRectsValue = childRects.current;
            if (!isNil(innerValue) && innerValue in parentRectsValue && innerValue in childRectsValue) {
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
                            weight={isActive ? '500' : '400'}
                            onLayout={ev => getTabItemRect(item.value, ev)}
                            style={[style?.label, isActive ? style?.labelActive : {}]}>
                            {item?.label}
                        </TextX>
                    </PressHighlight>
                );
            })}
            <Animated.View style={[styles.underline, style?.underline, widthAnimStyle, translateXAnimStyle]} />
        </Flex>
    );

    return (
        <>
            <View style={rootStyle}>
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
            </View>
            {destroyInactiveTabPane ? (
                <>{items.find(item => item.value === innerValue)?.children}</>
            ) : (
                <>
                    {items.map(item => {
                        const isActive = item.value === innerValue;
                        return (
                            <View key={item.value} style={[{ width: rootWidth.current }, isActive ? {} : styles.hidden]}>
                                {item?.children}
                            </View>
                        );
                    })}
                </>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
    },
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
        left: 0,
        position: 'absolute',
    },
    hidden: {
        left: -9999,
        position: 'absolute',
    },
});
