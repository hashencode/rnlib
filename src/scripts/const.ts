import { ScrollViewProps } from 'react-native';

import { scale } from './utils';

const primary = '#1677ff';
const danger = '#ff3143';
const success = '#52c41a';
const warning = '#FF8F1F';
const black = '#000000';
const gray = '#C8C7CD';
const white = '#ffffff';
export const COLOR = {
    bg_controller: '#f8f8f8',
    bg_disabled: 'rgba(0,0,0,.04)',
    bg_overlay: 'rgba(0,0,0,.5)',
    // 背景色
    bg_page: '#f5f5f5',
    black,
    border_controller: '#e5e5e5',
    // 边框
    border_default: '#eeeeee',
    border_disabled: '#d9d9d9',
    border_light: '#f5f5f5',
    danger,
    gray,
    // 图标
    icon_default: '#333333',
    icon_touchable: '#999999',
    // 透明度
    opacity_disabled_controller: 0.5,
    opacity_disabled_option: 0.4,
    // 颜色
    primary,
    // 选择组
    selector_option_background: '#f5f5f5',
    success,
    /**
     * components
     */
    // 开关
    switch_close_background: '#8b8a92',
    text_danger: danger,
    text_desc: '#999999',
    text_placeholder: '#cccccc',
    // 文字色
    text_primary: primary,
    text_subtitle: '#666666',
    text_title: '#333333',
    text_white: white,
    // 轻提示
    toast_background: 'rgba(0,0,0,.75)',
    underlay_danger: 'rgba(255,49,67,.1)',
    underlay_primary: 'rgba(22,119,255,.1)',
    // 底色
    underlay_touchable: 'rgba(0,0,0,.05)',
    warning,
    white,
};

export const SIZE = {
    // 动作面板
    action_sheet_option_height: scale(58),
    // 头像
    avatar_size_lg: scale(50),
    avatar_size_md: scale(40),
    avatar_size_sm: scale(30),
    badge_dot_size: scale(10),
    // 徽标数
    badge_font_size: scale(9),
    badge_size: scale(18),
    border_bold: scale(2),
    // 边框
    border_default: scale(1),
    /**
     * components
     */
    // 按钮
    button_height_lg: scale(50),
    button_height_md: scale(40),
    button_height_sm: scale(30),
    button_height_xs: scale(26),
    button_padding_horizontal: scale(12),
    // 多选
    checkbox_size: scale(22),
    // 对话框
    dialog_width: scale(288),
    // 分割线
    divider_horizontal_height: scale(24),
    divider_vertical_height: scale(14),
    error_block_fullscreen_icon_size: scale(200),
    // 结果
    error_block_icon_size: scale(100),
    font_basic: scale(14), // 常规内容
    font_desc: scale(12), // 次常规内容
    // 字号
    font_h1: scale(20), // 结果页标题
    font_h2: scale(18), // 页面标题
    font_h3: scale(17), // 列表
    font_h4: scale(16), // 卡片标题
    font_h5: scale(15), // 内容标题
    font_mini: scale(11), // 弱化内容和弱辅助文案
    font_secondary: scale(13), // 常规内容
    icon_lg: scale(32),
    icon_md: scale(28),
    icon_sm: scale(24),
    icon_stroke_lg: scale(2.5),
    icon_stroke_md: scale(2),
    icon_stroke_sm: scale(1.5),
    icon_stroke_xl: scale(3),
    // 图标粗细
    icon_stroke_xs: scale(1),
    // 图标尺寸
    icon_xl: scale(36),
    icon_xs: scale(20),
    icon_xxs: scale(16),
    // 输入框（关联button）
    input_height_lg: scale(50),
    input_height_md: scale(40),
    input_height_sm: scale(30),
    list_action_width: scale(70),
    // 列表
    list_item_min_height: scale(48),
    // 导航
    navigator_height: scale(50),
    // 选择
    picker_item_height: scale(50),
    radius_lg: scale(8),
    radius_md: scale(4),
    // 圆角
    radius_sm: scale(2),
    // 结果
    result_icon_size: scale(64),
    // 选择组
    selector_icon_size: scale(12),
    // 间距
    space_2xl: scale(20),
    space_lg: scale(12),
    space_md: scale(8),
    space_sm: scale(4),
    space_xl: scale(16),
    space_xs: scale(2),
    switch_border_md: scale(2),
    switch_border_sm: scale(1.5),
    switch_height_md: scale(30),
    switch_height_sm: scale(20),
    switch_radius: scale(15.5),
    // 开关
    switch_width_md: scale(50),
    switch_width_sm: scale(36),
    // 选项卡
    tabs_height: scale(42),
    // 标签（关联mini button）
    tag_icon_size: scale(12),
    toast_big_size: scale(140),
    // 轻提示
    toast_icon_size: scale(50),
    toast_width_max: scale(200),
    // 字重
    weight_title: '500' as any,
};

// scrollView组件默认配置
export const SCROLL_BASIC_CONFIG: ScrollViewProps = {
    bounces: false,
    overScrollMode: 'never',
};

export const DEFAULT_IMAGE =
    'https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxsG72wAo9EWJR4yQWyJJaDb6rYcBtJvTvH3UoAS4JFNDaxGhmKNaMwgElLURlRFeVkLCjkfnXmWtINWZIrPGYq0-&format=source';
