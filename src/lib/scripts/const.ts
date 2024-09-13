import { ScrollViewProps } from 'react-native';

const primary = '#1677ff';
const danger = '#ff3143';
const success = '#52c41a';
const warning = '#FF8F1F';
const black = '#000000';
const gray = '#C8C7CD';
const white = '#ffffff';
export const COLOR = {
    // 颜色
    primary,
    danger,
    success,
    warning,
    black,
    gray,
    white,
    // 背景色
    bg_page: '#f5f5f5',
    bg_controller: '#f8f8f8',
    bg_disabled: 'rgba(0,0,0,.04)',
    bg_overlay: 'rgba(0,0,0,.5)',
    // 文字色
    text_primary: primary,
    text_danger: danger,
    text_title: '#333333',
    text_subtitle: '#666666',
    text_desc: '#999999',
    text_placeholder: '#cccccc',
    text_white: white,
    // 边框
    border_default: '#eeeeee',
    border_controller: '#e5e5e5',
    border_light: '#f5f5f5',
    border_disabled: '#d9d9d9',
    // 底色
    underlay_touchable: 'rgba(0,0,0,.1)',
    underlay_danger: 'rgba(255,49,67,.1)',
    underlay_primary: 'rgba(22,119,255,.1)',
    // 图标
    icon_default: '#333333',
    icon_touchable: '#999999',
    // 透明度
    opacity_disabled_controller: 0.5,
    opacity_disabled_option: 0.4,
    /**
     * components
     */
    // 开关
    switch_close_background: '#8b8a92',
    // 轻提示
    toast_background: 'rgba(0,0,0,.75)',
    // 选择组
    selector_option_background: '#f5f5f5',
};

export const SIZE = {
    // 间距
    space_2xl: 20,
    space_xl: 16,
    space_lg: 12,
    space_md: 8,
    space_sm: 4,
    space_xs: 2,
    // 字号
    font_h1: 20, // 结果页标题
    font_h2: 18, // 页面标题
    font_h3: 17, // 列表
    font_h4: 16, // 卡片标题
    font_h5: 15, // 内容标题
    font_basic: 14, // 常规内容
    font_secondary: 13, // 常规内容
    font_desc: 12, // 次常规内容
    font_mini: 11, // 弱化内容和弱辅助文案
    // 边框
    border_default: 1,
    border_bold: 2,
    // 圆角
    radius_sm: 2,
    radius_md: 4,
    radius_lg: 8,
    // 图标尺寸
    icon_xl: 36,
    icon_lg: 32,
    icon_md: 28,
    icon_sm: 24,
    icon_xs: 20,
    icon_xxs: 16,
    // 图标粗细
    icon_stroke_sm: 1.5,
    icon_stroke_md: 2,
    icon_stroke_lg: 3,
    // 字重
    weight_title: '500' as any,
    /**
     * components
     */
    // 按钮
    button_height_lg: 50,
    button_height_md: 40,
    button_height_sm: 30,
    button_height_xs: 26,
    button_padding_horizontal: 12,
    // 列表
    list_item_min_height: 48,
    list_action_width: 70,
    // 导航
    navigator_height: 50,
    // 动作面板
    action_sheet_option_height: 58,
    // 输入框（关联button）
    input_height_lg: 50,
    input_height_md: 40,
    input_height_sm: 30,
    // 标签（关联mini button）
    tag_height: 26,
    tag_icon_size: 12,
    // 选择
    picker_item_height: 50,
    // 开关
    switch_width_md: 50,
    switch_height_md: 30,
    switch_border_md: 2,
    switch_width_sm: 36,
    switch_height_sm: 20,
    switch_border_sm: 1.5,
    switch_radius: 15.5,
    // 对话框
    dialog_width: 288,
    // 结果
    error_block_icon_size: 100,
    error_block_fullscreen_icon_size: 200,
    // 多选
    checkbox_size: 22,
    // 轻提示
    toast_icon_size: 50,
    toast_big_size: 140,
    toast_width_max: 200,
    // 头像
    avatar_size_lg: 50,
    avatar_size_md: 40,
    avatar_size_sm: 30,
    // 结果
    result_icon_size: 64,
    // 分割线
    divider_horizontal_height: 24,
    divider_vertical_height: 14,
    // 选择组
    selector_icon_size: 12,
    // 徽标数
    badge_font_size: 9,
    badge_size: 18,
    badge_dot_size: 10,
    // 选项卡
    tabs_height: 42,
};

// scrollView组件默认配置
export const SCROLL_BASIC_CONFIG: ScrollViewProps = {
    overScrollMode: 'never',
    bounces: false,
};

export const DEFAULT_IMAGE =
    'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxsG72wAo9EWJR4yQWyJJaDb6rYcBtJvTvH3UoAS4JFNDaxGhmKNaMwgElLURlRFeVkLCjkfnXmWtINWZIrPGYq0-&format=source';
