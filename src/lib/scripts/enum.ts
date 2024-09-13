// 按钮尺寸-字体大小映射表
import { SIZE } from '@/lib/scripts/const';

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
