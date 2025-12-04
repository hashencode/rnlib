// 按钮尺寸-字体大小映射表
import { SIZE } from './const';

/**
 * Button
 */
// 按钮尺寸-字体大小映射表
export enum ButtonLabelSize {
    lg = SIZE.font_h2,
    md = SIZE.font_h3,
    sm = SIZE.font_basic,
    xs = SIZE.font_desc,
}

// 按钮尺寸-图标大小映射表
export enum ButtonIconSize {
    lg = SIZE.icon_xs,
    md = SIZE.icon_xs,
    sm = SIZE.icon_xxs,
    xs = SIZE.icon_xxs,
}

/**
 * Avatar
 */
// 头像尺寸映射表
export enum TextSizeMap {
    lg = SIZE.font_h2,
    md = SIZE.font_h5,
    sm = SIZE.font_mini,
}

// 头像加载状态
export enum AvatarStatusMap {
    '加载中',
    '加载失败',
}

/**
 * Emitter
 */
export enum EMITTER_MAP {
    '关闭对话框' = '_CLOSE_DIALOG',
    '关闭消息' = '_CLOSE_MESSAGE',
    '关闭提示' = '_CLOSE_TOAST',
    '关闭动作面板' = '_CLOSE_ACTION_SHEET',
    '关闭选择器' = '_CLOSE_PICKER',
    '关闭遮罩' = '_CLOSE_OVERLAY',
    '关闭弹出层' = '_CLOSE_POPUP',

    '关闭所有对话框' = '_CLOSE_ALL_DIALOG',
    '关闭所有消息' = '_CLOSE_ALL_MESSAGE',
    '关闭所有提示' = '_CLOSE_ALL_TOAST',
    '关闭所有动作面板' = '_CLOSE_ALL_ACTION_SHEET',
    '关闭所有选择器' = '_CLOSE_ALL_PICKER',
    '关闭所有遮罩' = '_CLOSE_ALL_OVERLAY',
    '关闭所有弹出层' = '_CLOSE_ALL_POPUP',

    '打开对话框' = '_OPEN_DIALOG',
    '打开消息' = '_OPEN_MESSAGE',
    '打开提示' = '_OPEN_TOAST',
    '打开动作面板' = '_OPEN_ACTION_SHEET',
    '打开选择器' = '_OPEN_PICKER',
    '打开遮罩' = '_OPEN_OVERLAY',
    '打开弹出层' = '_OPEN_POPUP',
}
