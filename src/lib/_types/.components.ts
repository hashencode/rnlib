import { Key, PropsWithChildren, ReactElement, ReactNode } from 'react';
import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { TextProps as TextOriginProps } from 'react-native/Libraries/Text/Text';
import { SwipeableProps } from 'react-native-gesture-handler/ReanimatedSwipeable';

/**
 * Divider
 */
export interface IDividerProps extends PropsWithChildren {
    orientation?: 'left' | 'center' | 'right'; // 文字位置
    type?: 'horizontal' | 'vertical'; // 水平还是垂直类型
    style?: {
        root: ViewStyle;
    }; // 样式
}

/**
 * List
 */
export interface IListProps {
    items: IListItemProps[]; // 数据源
    renderItem?: (item: IListItemProps, index: number) => ReactElement; // 渲染函数
    rowKey?: (item: IListItemProps) => Key; // 唯一键生成函数
    style?: {
        root?: ViewStyle; // 根节点样式
        divider?: ViewStyle; // 分割线样式
    }; // 样式
}

export interface IListItemActions {
    backgroundColor?: string; // 背景色
    content?: ReactNode; // 内容插槽
    width: number; // 操作按钮宽度
    onPress?: () => void; // 点击回调函数
}

export interface IListItemProps extends PropsWithChildren {
    actions?: IListItemActions[]; // 操作按钮
    disabled?: boolean; // 禁用
    extra?: ReactNode; // 右侧附加元素
    extraSubtitle?: string; // 额外内容副标题
    extraTitle?: string; // 额外内容标题
    icon?: ReactElement; // 左侧图标
    showArrow?: boolean; // 显示右侧箭头
    subtitle?: string; // 副标题
    title?: string; // 主标题,
    style?: {
        root?: ViewStyle; // 最外层样式
        icon?: ImageStyle; // 图标样式
        body?: ViewStyle; // 主要区域样式
        main?: ViewStyle; // 内容区域样式
        title?: TextStyle; // 内容标题样式
        subTitle?: TextStyle; // 内容副标题样式
        extra?: ViewStyle; // 额外内容区域样式
        extraTitle?: TextStyle; // 额外内容标题样式
        extraSubtitle?: TextStyle; // 额外内容副标题样式
    }; // 样式
    onPress?: () => void; // 点击事件回调
}

/**
 * Text
 */
export interface ITextProps extends TextOriginProps, PropsWithChildren {
    color?: string; // 颜色
    size?: number; // 字体大小
    weight?: TextStyle['fontWeight']; // 字重
    style?: TextStyle; // 样式
}

/**
 * SwipeableRow
 */
export interface ISwipeableRowProps extends SwipeableProps {
    actions: IListItemActions[];
}
