import { Key, PropsWithChildren, ReactElement, ReactNode } from 'react';
import { ImageSourcePropType, ImageStyle, PressableProps, ScrollViewProps, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { TextProps as TextOriginProps } from 'react-native/Libraries/Text/Text';
import { SwipeableProps } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { IconNames } from '@/lib/components/Icon';
import { IDotContainerProps } from 'react-native-animated-pagination-dot/src';
import { TCarouselProps } from 'react-native-reanimated-carousel/src/types';

/**
 * PressHighlight
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
    type?: 'primary' | 'text' | 'default'; // 类型

    style?: {
        button?: ViewStyle; // 按钮主体样式
        icon?: ViewStyle; // 图标样式
        root?: ViewStyle; // 最外层样式
        text?: TextStyle; // 文本样式
    }; // 样式

    onPress?: () => void; // 点击事件回调
}

/**
 * Divider
 */
export interface IDividerProps extends PropsWithChildren {
    orientation?: 'left' | 'center' | 'right'; // 文字位置
    type?: 'horizontal' | 'vertical'; // 水平还是垂直类型

    style?: {
        divider?: ViewStyle;
        root?: ViewStyle;
        text?: TextStyle;
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
        divider?: ViewStyle; // 分割线样式
        root?: ViewStyle; // 根节点样式
    }; // 样式
}

export interface IListItemProps extends PropsWithChildren {
    disabled?: boolean; // 禁用
    extra?: ReactNode; // 右侧附加节点
    extraSubtitle?: string; // 额外内容副标题
    extraTitle?: string; // 额外内容标题
    icon?: ReactElement; // 左侧图标
    leftActions?: ISwipeableRowProps['leftActions']; // 左侧操作按钮
    rightActions?: ISwipeableRowProps['rightActions']; // 右侧操作按钮
    showArrow?: boolean; // 显示右侧箭头
    subtitle?: ReactNode; // 副标题
    title?: ReactNode; // 主标题

    style?: {
        body?: ViewStyle; // 内容区域样式
        extra?: ViewStyle; // 额外内容区域样式
        extraSubtitle?: TextStyle; // 额外内容副标题样式
        extraTitle?: TextStyle; // 额外内容标题样式
        icon?: ImageStyle; // 图标样式
        main?: ViewStyle; // 主要内容区域样式
        root?: ViewStyle; // 最外层样式
        subTitle?: TextStyle; // 内容副标题样式
        title?: TextStyle; // 内容标题样式
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
    color?: TextStyle['color']; // 颜色
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
    extra?: ReactNode; // 额外节点
    subtitle?: ReactNode; // 副标题
    title?: ReactNode; // 标题

    style?: {
        backIcon?: TextStyle; // 返回图标样式
        backText?: TextStyle; // 返回文本样式
        body?: ViewStyle; // 主体节点样式
        root?: ViewStyle; // 根节点样式
        subtitle?: TextStyle; // 副标题样式
        title?: TextStyle; // 标题样式
    }; // 样式

    onBack?: () => void; // 返回按钮点击事件回调
}

/**
 * Icon
 */
export interface IIconProps {
    color?: TextStyle['color']; // 颜色
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
    subtitle?: ReactNode; // 副标题
    title: ReactNode; // 主文本
    value: IActionSheetOptionValue; // 选项值
}

export interface IActionSheetProps {
    backCloseable?: boolean; // 允许返回操作关闭
    cancelText?: ReactNode; // 取消按钮文本
    header?: ReactNode; // 头部插槽
    maxHeight?: number; // 最大高度
    options: IActionSheetOption[]; // 选项
    overlayClosable?: boolean; // 允许点击蒙层关闭
    showCancel?: boolean; // 显示取消按钮
    visible?: boolean; // 显隐

    style?: {
        cancelButton?: ViewStyle; // 取消按钮样式
        cancelText?: TextStyle; // 取消按钮文本样式
        divider?: ViewStyle; // 分割线样式
        grabber?: ViewStyle; // 抓手样式
        header?: ViewStyle; // 头部样式
        headerText?: TextStyle; // 头部文本样式
        option?: ViewStyle; // 选项样式
        root: ViewStyle; // 根节点样式
        subtitle?: TextStyle; // 副标题样式
        title?: TextStyle; // 标题样式
    }; // 样式

    onCancel?: () => void; // 关闭事件回调
    onChange?: (val: IActionSheetOptionValue) => void; // 点击选项事件回调
    onOpen?: () => void; // 开启事件回调
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
    value?: ICheckboxValue; // 受控值

    style?: {
        icon?: TextStyle; // 图标样式
        iconContainer?: ViewStyle; // 图标容器样式
        label?: TextStyle; // 文本样式
        root?: ViewStyle; // 根节点样式
    }; // 样式

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
    value?: ICheckboxGroupValue; // 受控值

    style?: {
        option?: ICheckboxProps['style'];
        root?: ViewStyle; // 根节点样式
    }; // 样式

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
    checkedIcon?: ReactElement; // 选中图标
    defaultValue?: ICheckListValue; // 默认值
    multiple?: boolean; // 多选
    options?: CheckListOptions[]; // 列表项
    renderItem?: (item: IListItemProps, index: number) => ReactElement; // 渲染函数
    rowKey?: (item: IListItemProps) => Key; // 唯一键生成函数
    value?: ICheckListValue; // 受控值

    style?: {
        divider?: ViewStyle; // 分割线样式
        root?: ViewStyle; // 最外层样式
    }; // 样式

    onChange?: (val: ICheckListValue) => void; // 值变动事件回调
}

/**
 * Input
 */
export interface IInputRef {
    blur: () => void;
    clear: () => void;
    focus: () => void;
    isFocused: () => boolean | undefined;
}

export interface IInputProps extends Omit<TextInputProps, 'onChange' | 'style'> {
    allowClear?: boolean; // 允许清空输入
    bordered?: boolean; // 显示边框
    disabled?: boolean; // 禁用
    password?: boolean; // 密码输入
    prefix?: ReactNode | string; // 前缀
    round?: boolean; // 圆形外观
    size?: 'sm' | 'md' | 'lg'; // 尺寸
    suffix?: ReactNode | string; // 后缀

    style?: {
        main?: TextStyle; // 主体样式
        prefix?: TextStyle; // 前缀样式
        root?: ViewStyle; // 根节点样式
        suffix?: TextStyle; // 后缀样式
    }; // 样式

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
    value?: IRadioValue; // 受控值

    style?: {
        icon?: TextStyle; // 图标样式
        iconContainer?: ViewStyle; // 图标容器样式
        label?: TextStyle; // 文本样式
        root?: ViewStyle; // 根节点样式
    }; // 样式

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
    value?: IRadioGroupOptionValue; // 受控值

    style?: {
        option?: ICheckboxProps['style'];
        root?: ViewStyle; // 根节点样式
    }; // 样式

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
    subtitle?: ReactNode; // 副标题
    title: ReactNode; // 主文本
    value: IPickerRawValue; // 选项值
}
export interface IPickerProps {
    backCloseable?: boolean; // 允许返回操作关闭
    cancelButtonProps?: IButtonProps; // 取消按钮属性
    cancelText?: string; // 取消按钮文案
    checkIcon?: ReactNode; // 自定义选中图标
    defaultValue?: IPickerValue; // 默认值
    maxHeight?: number; // 最大高度
    multiple?: boolean; // 多选
    okButtonProps?: IButtonProps; // 确定按钮属性
    okText?: string; // 确认按钮文案（多选）
    options: PickerOption[]; // 选项
    overlayClosable?: boolean; // 允许点击蒙层关闭
    title?: ReactNode; // 头部标题插槽
    value?: IPickerValue; // 受控值
    visible?: boolean; // 显隐

    style?: {
        cancelButton?: ViewStyle; // 取消按钮样式
        cancelText?: TextStyle; // 取消按钮文本样式
        checkIcon?: TextStyle; // 选中图标样式
        divider?: ViewStyle; // 分割线样式
        grabber?: ViewStyle; // 抓手样式
        header?: ViewStyle; // 头部样式
        headerText?: TextStyle; // 头部文本样式
        option?: ViewStyle; // 选项样式
        root: ViewStyle; // 根节点样式
        subtitle?: TextStyle; // 副标题样式
        title?: TextStyle; // 标题样式
    }; // 样式

    onCancel?: () => void; // 取消按钮点击事件回调
    onChange?: (val: IPickerValue) => void; // 值变动事件回调
    onOpen?: () => void; // 开启事件回调
}

/**
 * Selector
 */
export type ISelectorRawValue = number | string;
export type ISelectorValue = ISelectorRawValue | ISelectorRawValue[] | undefined;
export interface SelectorOption {
    content?: ReactNode; // 内容插槽
    disabled?: boolean; // 禁用
    subtitle?: ReactNode; // 副标题
    title?: ReactNode; // 主文本
    value: ISelectorRawValue; // 选项值
}
export interface ISelectProps {
    defaultValue?: ISelectorValue; // 默认值
    multiple?: boolean; // 多选
    options: SelectorOption[]; // 选项
    value?: ISelectorValue; // 受控值

    style?: {
        active?: ViewStyle; // 激活样式
        checkIcon?: TextStyle; // 选中图标样式
        corner?: ViewStyle; // 角落样式
        option?: ViewStyle; // 选项样式
        root: ViewStyle; // 根节点样式
        subtitle?: TextStyle; // 副标题样式
        title?: TextStyle; // 标题样式
    }; // 样式

    onChange?: (val: ISelectorValue) => void; // 值变动事件回调
}

/**
 * Switch
 */
export interface ISwitchProProps {
    defaultValue?: boolean; // 默认值
    disabled?: boolean; // 禁用
    size?: 'sm' | 'md'; // 尺寸
    value?: boolean; // 受控值,

    style?: {
        root?: ViewStyle; // 根节点样式
    };

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
        image?: ImageStyle; // 图片样式
        root?: ViewStyle; // 根节点样式
        text?: TextStyle; // 文本样式
    }; // 样式
}

/**
 * Badge
 */
export interface IBadgeProps {
    children?: ReactNode; // 内容插槽
    dot?: boolean; // 红点模式

    style?: {
        root?: ViewStyle; // 根节点样式
        text?: TextStyle; // 文本样式
    }; // 样式
}

/**
 * Card
 */
export interface ICardProps {
    children?: ReactNode; // 内容插槽
    extra?: ReactElement; // 头部额外节点
    footer?: ReactElement; // 页脚节点
    icon?: ReactElement; // 头部图标
    title?: string; // 标题

    style?: {
        body?: ViewStyle; // 主体样式
        footer?: ViewStyle; // 页脚节点
        header?: ViewStyle; // 头部样式
        root?: ViewStyle; // 根节点样式
        title?: TextStyle; // 标题样式
    }; // 样式
}

/**
 * Carousel
 */
export interface ICarouselProps {
    dotConfig?: IDotContainerProps; // 指示器配置项
    height: ViewStyle['height']; // 高度
    items: ReactNode[]; // 内容项
    rootConfig?: TCarouselProps; // 内容配置项
    showDot?: boolean; // 是否显示指示器

    style?: {
        dotContainer?: ViewStyle; // 指示器样式
        root?: ViewStyle; // 根节点样式
    }; // 样式
}

/**
 * Group
 */
export interface IGroupProps {
    children?: ReactNode; // 内容插槽
    first?: boolean; // 是否是首行
    footer?: ReactNode | string; // 底部插槽
    header?: ReactNode | string; // 头部插槽
    style?: {
        root?: ViewStyle; // 最外层样式
        header?: ViewStyle; // 头部样式
        body?: ViewStyle; // 主要内容样式
        footer?: ViewStyle; // 底部样式
    }; // 样式
}

/**
 * DefaultLayout
 */
export interface IDefaultLayoutProps {
    children?: ReactNode; // 插槽
    head?: ReactNode; // 头部插槽
    footer?: ReactNode; // 底部插槽
    statusBarConfig?: {
        whiteText?: boolean;
        backgroundColor?: string;
    }; // 状态栏配置
    scrollable?: boolean; // 是否使用scrollView
    style?: {
        root?: ViewStyle; // 最外层样式
        scrollView?: ViewStyle; // 滚动区域样式
        contentContainer?: ViewStyle; // 主要内容区域样式
    }; // 样式
}

/**
 * Tabs
 */
export type ITabsItemValue = string;

export interface ITabsItem {
    disabled?: boolean; // 禁用
    children?: ReactNode; // 内容插槽
    label?: ReactNode; // 主文本
    value: ITabsItemValue; // 选项值
}

export interface ITabsProps {
    defaultValue?: ITabsItemValue; // 默认值
    items?: ITabsItem[]; // 内容项
    scrollable?: boolean; // 可滚动
    headerConfig?: ScrollViewProps; // 头部滚动配置项
    value?: ITabsItemValue; // 受控值

    style?: {
        header?: ViewStyle; // 头部样式
        body?: ViewStyle; // 内容区域样式
        tabItem?: ViewStyle; // 选项卡样式
        label?: TextStyle; // 选项卡文本样式
        underline?: ViewStyle; // 下划线样式
        divider?: ViewStyle; // 分割线样式
    }; // 样式

    onChange?: (val: ITabsItemValue) => void; // 切换选项事件回调
}

/**
 * Tag
 */
export interface ITagProps {
    backgroundColor?: ViewStyle['backgroundColor']; // 背景色
    borderColor?: ViewStyle['borderColor']; // 边框色
    bordered?: boolean; // 显示边框
    children?: ReactNode; // 内容插槽
    color?: TextStyle['color']; // 文本和图标颜色
    icon?: ReactElement; // 图标

    style?: {
        root?: ViewStyle; // 根节点样式
        text?: TextStyle; // 文本样式
    }; // 样式
}

/**
 * Error Block
 */
export interface IErrorBlockProps {
    extra?: ReactNode; // 操作区域
    fullscreen?: boolean; // 全屏显示
    image?: ReactElement | ImageSourcePropType; // 主图
    imageStyle?: ImageStyle; // 主图样式
    subtitle?: ReactNode; // 副标题
    title?: ReactNode; // 标题

    style?: {
        root?: ViewStyle; // 根节点样式
        image?: ImageStyle; // 图片样式
        title?: TextStyle; // 标题样式
        subtitle?: TextStyle; // 副标题样式
    }; // 样式
}

/**
 * Result
 */
export interface IResultProps {
    extra?: ReactNode; // 额外元素
    subtitle?: ReactNode; // 副标题
    title?: ReactNode; // 标题
    type: 'success' | 'info' | 'waiting' | 'error' | 'warning'; // 类型

    style?: {
        icon?: TextStyle; // 图标样式
        root?: ViewStyle; // 根节点样式
        subtitle?: TextStyle; // 副标题样式
        title?: TextStyle; // 标题样式
    }; // 样式
}

/**
 * Loading
 */
export interface ILoadingProps {
    color?: TextStyle['color']; // 颜色
    icon?: ReactElement; // 自定义图标
    size?: number; // 尺寸
    style?: ViewStyle; // 样式
}

/**
 * Dialog
 */
export interface IDialogProps {
    actions?: IButtonProps[]; // 动作列表
    afterClose?: () => void; // 遮罩销毁事件回调
    backCloseable?: boolean; // 允许返回操作关闭
    buttons?: IButtonProps[]; // 按钮列表
    content?: string; // 描述文本
    id?: number | string;
    overlayClosable?: boolean; // 允许点击蒙层关闭
    title?: string; // 标题文本
    visible?: boolean; // 显隐

    style?: {
        body?: ViewStyle;
        content?: TextStyle;
        header?: TextStyle;
        root?: ViewStyle;
    }; // 样式

    onCancel?: () => void; // 取消事件回调
}
