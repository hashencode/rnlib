import { Key, PropsWithChildren, ReactElement, ReactNode } from 'react';
import { ImageSourcePropType, ImageStyle, PressableProps, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import { TextProps as TextOriginProps } from 'react-native/Libraries/Text/Text';
import { SwipeableProps } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { IconNames } from '@/lib/components/Icon';

/**
 * Pressable
 */

export interface IPressHighlightProps extends Omit<PressableProps, 'style'> {
    children?: ReactNode | string; // 插槽
    underlayColor?: string; // 遮罩颜色
    style?: ViewStyle;
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
    size?: 'xs' | 'sm' | 'md' | 'lg'; // 尺寸
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
    subtitle?: ReactNode; // 副标题
    title?: ReactNode; // 主标题
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
    disabled?: boolean; // 禁用
    title: ReactNode; // 主文本
    subtitle?: ReactNode; // 副标题
    value: IActionSheetOptionValue; // 选项值
}

export interface IActionSheetProps {
    backCloseable?: boolean; // 允许返回操作关闭
    header?: ReactNode; // 头部插槽
    overlayClosable?: boolean; // 允许点击蒙层关闭
    maxHeight?: number; // 最大高度
    options: IActionSheetOption[]; // 选项
    showCancel?: boolean; // 显示取消按钮
    cancelText?: ReactNode; // 取消按钮文本
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

/**
 * CheckList
 */
export type ICheckListRawValue = number | string;
export type ICheckListValue = ICheckListRawValue | ICheckListRawValue[] | undefined;

export interface CheckListOptions {
    children?: ReactNode; // 内容插槽
    disabled?: boolean; // 禁用
    icon?: ReactElement; // 左侧图标
    subtitle?: ReactNode; // 副标题
    title?: ReactNode; // 主标题,
    value: ICheckListRawValue; // 列表项值
}

export interface ICheckListProps {
    defaultValue?: ICheckListValue; // 默认值
    checkedIcon?: ReactElement; // 选中图标
    options?: CheckListOptions[]; // 列表项
    multiple?: boolean; // 多选
    renderItem?: (item: IListItemProps, index: number) => ReactElement; // 渲染函数
    rowKey?: (item: IListItemProps) => Key; // 唯一键生成函数
    style?: {
        root?: ViewStyle; // 最外层样式
        divider?: ViewStyle; // 分割线样式
    }; // 样式
    value?: ICheckListValue; // 受控值
    onChange?: (val: ICheckListValue) => void; // 值变动事件回调
}

/**
 * Input
 */
export interface IInputRef {
    focus: () => void;
    blur: () => void;
    clear: () => void;
    isFocused: () => boolean | undefined;
}

export interface IInputProps extends Omit<TextInputProps, 'onChange' | 'style'> {
    allowClear?: boolean; // 允许清空输入
    bordered?: boolean; // 显示边框
    disabled?: boolean; // 禁用
    prefix?: ReactNode | string; // 前缀
    round?: boolean; // 圆形外观
    size?: 'sm' | 'md' | 'lg'; // 尺寸
    password?: boolean; // 密码输入
    style?: {
        root?: ViewStyle; // 根节点样式
        prefix?: TextStyle; // 前缀样式
        suffix?: TextStyle; // 后缀样式
        main?: TextStyle; // 主体样式
    }; // 样式
    suffix?: ReactNode | string; // 后缀
    onChange?: (val?: string) => void; // 值变动事件回调
}

/**
 * Radio
 */
export type IRadioValue = boolean;

export interface IRadioProps {
    defaultValue?: IRadioValue; // 默认值
    disabled?: boolean; // 禁用
    label?: string; // 文本
    style?: {
        root?: ViewStyle; // 根节点样式
        iconContainer?: ViewStyle; // 图标容器样式
        icon?: TextStyle; // 图标样式
        label?: TextStyle; // 文本样式
    }; // 样式
    value?: IRadioValue; // 受控值
    onChange?: (val: IRadioValue) => void; // 值变动事件回调
}

/**
 * RadioGroup
 */
export type IRadioGroupOptionValue = string | number | undefined;

export interface IRadioGroupOptions {
    disabled?: boolean; // 禁用
    label: string; // 文本
    value: IRadioGroupOptionValue; // 选项值
}

export interface IRadioGroupProps {
    defaultValue?: IRadioGroupOptionValue; // 默认值
    options?: IRadioGroupOptions[]; // 子项
    style?: {
        root?: ViewStyle; // 根节点样式
        option?: ICheckboxProps['style'];
    }; // 样式
    value?: IRadioGroupOptionValue; // 受控值
    onChange?: (value: IRadioGroupOptionValue) => void;
}

/**
 * Picker
 */
export type IPickerRawValue = number | string;
export type IPickerValue = IPickerRawValue | IPickerRawValue[] | undefined;
export interface PickerOption {
    children?: ReactNode; // 内容插槽
    disabled?: boolean; // 禁用
    title: ReactNode; // 主文本
    subtitle?: ReactNode; // 副标题
    value: IPickerRawValue; // 选项值
}
export interface IPickerProps {
    backCloseable?: boolean; // 允许返回操作关闭
    cancelText?: string; // 取消按钮文案
    okText?: string; // 确认按钮文案（多选）
    defaultValue?: IPickerValue; // 默认值
    title?: ReactNode; // 头部标题插槽
    overlayClosable?: boolean; // 允许点击蒙层关闭
    maxHeight?: number; // 最大高度
    multiple?: boolean; // 多选
    options: PickerOption[]; // 选项
    checkIcon?: ReactNode; // 自定义选中图标
    okButtonProps?: IButtonProps; // 确定按钮属性
    cancelButtonProps?: IButtonProps; // 取消按钮属性
    style?: {
        root: ViewStyle; // 根节点样式
        header?: ViewStyle; // 头部样式
        headerText?: TextStyle; // 头部文本样式
        option?: ViewStyle; // 选项样式
        checkIcon?: TextStyle; // 选中图标样式
        title?: TextStyle; // 标题样式
        subtitle?: TextStyle; // 副标题样式
        divider?: ViewStyle; // 分割线样式
        cancelButton?: ViewStyle; // 取消按钮样式
        cancelText?: TextStyle; // 取消按钮文本样式
        grabber?: ViewStyle; // 抓手样式
    }; // 样式
    value?: IPickerValue; // 受控值
    visible?: boolean; // 显隐
    onOpen?: () => void; // 开启事件回调
    onCancel?: () => void; // 取消按钮点击事件回调
    onChange?: (val: IPickerValue) => void; // 值变动事件回调
}

/**
 * Selector
 */
export type ISelectorRawValue = number | string;
export type ISelectorValue = ISelectorRawValue | ISelectorRawValue[] | undefined;
export interface SelectorOption {
    content?: ReactNode; // 内容插槽
    subtitle?: ReactNode; // 副标题
    disabled?: boolean; // 禁用
    title?: ReactNode; // 主文本
    value: ISelectorRawValue; // 选项值
}
export interface ISelectProps {
    defaultValue?: ISelectorValue; // 默认值
    multiple?: boolean; // 多选
    options: SelectorOption[]; // 选项
    style?: {
        root: ViewStyle; // 根节点样式
        option?: ViewStyle; // 选项样式
        active?: ViewStyle; // 激活样式
        checkIcon?: TextStyle; // 选中图标样式
        title?: TextStyle; // 标题样式
        subtitle?: TextStyle; // 副标题样式
        corner?: ViewStyle; // 角落样式
    }; // 样式
    value?: ISelectorValue; // 受控值
    onChange?: (val: ISelectorValue) => void; // 值变动事件回调
}

/**
 * Switch
 */
export interface ISwitchProProps {
    defaultValue?: boolean; // 默认值
    disabled?: boolean; // 禁用
    size?: 'sm' | 'md'; // 尺寸
    style?: {
        root?: ViewStyle; // 根节点样式
    };
    value?: boolean; // 受控值,
    onChange?: (value: boolean) => void; // 值变动事件回调
    onPress?: () => void; // 点击事件回调
}

/**
 * Avatar
 */
export interface IAvatarProps {
    alt?: string; // 未加载完成时显示的文本
    children?: ReactNode; // 内容插槽
    shape?: 'circle' | 'square'; // 形状
    size?: 'lg' | 'md' | 'sm' | number; // 尺寸
    source?: ImageSourcePropType; // 图片来源
    style?: {
        root?: ViewStyle; // 根节点样式
        image?: ImageStyle; // 图片样式
        text?: TextStyle; // 文本样式
    }; // 样式
}
