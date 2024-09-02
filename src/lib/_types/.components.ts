import { Key, PropsWithChildren, ReactElement, ReactNode } from 'react';
import { FlexStyle, ImageStyle, PressableProps, TextStyle, ViewStyle } from 'react-native';
import { TextProps as TextOriginProps } from 'react-native/Libraries/Text/Text';
import { SwipeableProps } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { IconNames } from '@/lib/components/Icon';

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
        root?: ViewStyle;
        text?: TextStyle;
        divider?: ViewStyle;
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

/**
 * Head
 */
export interface IHeadProps {
    backIcon?: ReactNode; // 返回按钮图标
    backText?: ReactNode; // 返回按钮文本
    extra?: ReactNode; // 额外元素
    style?: {
        root?: ViewStyle; // 根节点样式
        body?: ViewStyle; // 主体节点样式
        title?: TextStyle; // 标题样式
        subtitle?: TextStyle; // 副标题样式
        backIcon?: TextStyle; // 返回图标样式
        backText?: TextStyle; // 返回文本样式
    }; // 样式
    subtitle?: ReactNode; // 副标题
    title?: ReactNode; // 标题
    onBack?: () => void; // 返回按钮点击事件回调
}

/**
 * Icon
 */
export interface IIconProps {
    color?: string; // 颜色
    fill?: string; // 填充颜色
    name: IconNames; // 名称
    size?: number; // 尺寸
    strokeWidth?: number; // 线条粗细
    style?: TextStyle; // 样式
}

/**
 * ActionSheet
 */
export type IActionSheetOptionValue = string | number;

export interface IActionSheetOption {
    children?: ReactNode; // 内容插槽
    danger?: boolean; // 危险选项
    disabled?: boolean; // 禁用
    title: string; // 主文本
    subtitle?: string; // 描述文本
    value: IActionSheetOptionValue; // 选项值
}

export interface IActionSheetProps {
    backCloseable?: boolean; // 允许返回操作关闭
    header?: ReactNode | string; // 头部插槽
    overlayClosable?: boolean; // 允许点击蒙层关闭
    maxHeight?: number; // 最大高度
    options: IActionSheetOption[]; // 选项
    showCancel?: boolean; // 显示取消按钮
    cancelText?: string; // 取消按钮文本
    style?: {
        root: ViewStyle; // 根节点样式
        header?: ViewStyle; // 头部样式
        headerText?: TextStyle; // 头部文本样式
        option?: ViewStyle; // 选项样式
        title?: TextStyle; // 标题样式
        subtitle?: TextStyle; // 副标题样式
        divider?: ViewStyle; // 分割线样式
        cancelButton?: ViewStyle; // 取消按钮样式
        cancelText?: TextStyle; // 取消按钮文本样式
        grabber?: ViewStyle; // 抓手样式
    }; // 样式
    visible?: boolean; // 显隐
    onCancel?: () => void; // 关闭事件回调
    onOpen?: () => void; // 开启事件回调
    onChange?: (val: IActionSheetOptionValue) => void; // 点击选项事件回调
}

/**
 * Grabber
 */
export interface IGrabberProps {
    style?: ViewStyle;
}

/**
 * Checkbox
 */
export type ICheckboxValue = boolean;

export interface ICheckboxProps {
    defaultValue?: ICheckboxValue; // 默认值
    disabled?: boolean; // 禁用
    indeterminate?: boolean; // 半选
    label?: string; // 文本
    style?: {
        root?: ViewStyle; // 根节点样式
        iconContainer?: ViewStyle; // 图标容器样式
        icon?: TextStyle; // 图标样式
        label?: TextStyle; // 文本样式
    }; // 样式
    value?: ICheckboxValue; // 受控值
    onChange?: (val: ICheckboxValue) => void; // 值变动事件回调
}

/**
 * CheckboxGroup
 */
export type ICheckboxGroupOptionValue = string | number;

export interface ICheckboxGroupOptions {
    disabled?: boolean; // 禁用
    label: string; // 文本
    value: ICheckboxGroupOptionValue; // 选项值
}

export type ICheckboxGroupValue = ICheckboxGroupOptionValue[];

export interface ICheckboxGroupProps {
    defaultValue?: ICheckboxGroupValue; // 默认值
    options?: ICheckboxGroupOptions[]; // 子项
    style?: {
        root?: ViewStyle; // 根节点样式
        option?: ICheckboxProps['style'];
    }; // 样式
    value?: ICheckboxGroupValue; // 受控值
    onChange?: (value: ICheckboxGroupValue) => void;
}
