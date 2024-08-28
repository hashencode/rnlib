import { Key, PropsWithChildren, ReactElement, ReactNode } from 'react';
import { ImageStyle, PressableProps, TextStyle, ViewStyle } from 'react-native';
import { TextProps as TextOriginProps } from 'react-native/Libraries/Text/Text';
import { SwipeableProps } from 'react-native-gesture-handler/ReanimatedSwipeable';

/**
 * Pressable
 */

export interface IPressHighlightProps extends PressableProps {
    children?: ReactNode | string; // 插槽
    underlayColor?: string; // 遮罩颜色
}

/**
 * Button
 */
export interface IButtonProps extends PropsWithChildren {
    block?: boolean; // 占满整行
    danger?: boolean; // 危险
    disabled?: boolean; // 禁用
    ghost?: boolean; // 幽灵按钮
    icon?: ReactElement; // 图标
    round?: boolean; // 圆形外观
    size?: 'mini' | 'small' | 'middle' | 'large'; // 尺寸
    style?: {
        root?: ViewStyle; // 最外层样式
        button?: ViewStyle; // 按钮主体样式
        text?: TextStyle; // 文本样式
        icon?: ViewStyle; // 图标样式
    }; // 样式
    type?: 'primary' | 'text' | 'default'; // 类型
    onPress?: () => void; // 点击事件回调
}

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

export interface IListItemProps extends PropsWithChildren {
    leftActions?: ISwipeableRowProps['leftActions']; // 左侧操作按钮
    rightActions?: ISwipeableRowProps['rightActions']; // 右侧操作按钮
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
        body?: ViewStyle; // 内容区域样式
        main?: ViewStyle; // 主要内容区域样式
        title?: TextStyle; // 内容标题样式
        subTitle?: TextStyle; // 内容副标题样式
        extra?: ViewStyle; // 额外内容区域样式
        extraTitle?: TextStyle; // 额外内容标题样式
        extraSubtitle?: TextStyle; // 额外内容副标题样式
    }; // 样式
    onPress?: () => void; // 点击事件回调
}

/**
 * SwipeableRow
 */
export interface ISwipeableRowActionItem {
    backgroundColor?: string; // 背景色
    content?: ReactNode; // 内容插槽
    width: number; // 操作按钮宽度
    onPress?: () => void; // 点击回调函数
}

export interface ISwipeableRowProps extends SwipeableProps {
    leftActions?: ISwipeableRowActionItem[];
    rightActions?: ISwipeableRowActionItem[];
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
