// 按钮尺寸-字体大小映射表
import { SIZE } from './const';

// 头像加载状态
export enum AvatarStatusMap {
    '加载中',
    '加载失败',
}

// 按钮尺寸-图标大小映射表
export enum ButtonIconSize {
    lg = SIZE.icon_xs,
    md = SIZE.icon_xs,
    sm = SIZE.icon_xxs,
    xs = SIZE.icon_xxs,
}

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

/**
 * Emitter
 */
export enum EMITTER_MAP {
    '关闭对话框' = '_CLOSE_DIALOG',
    '关闭所有对话框' = '_CLOSE_ALL_DIALOG',
    '关闭所有提示' = '_CLOSE_ALL_TOAST',
    '关闭提示' = '_CLOSE_TOAST',
    '打开对话框' = '_OPEN_DIALOG',
    '打开提示' = '_OPEN_TOAST',
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

/**
 * Toast
 */
export enum ToastIconMap {
    'error' = 'x',
    'success' = 'check',
}
