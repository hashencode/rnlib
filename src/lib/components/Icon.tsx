import React, { CSSProperties } from 'react';
import _ from 'lodash';
import * as icons from 'lucide-react-native';
import { COLOR, SIZE } from '@/lib/scripts/const';

const nameMap = Object.keys(icons).map(key => {
    return key
        .replace(/([A-Z])/g, '-$1')
        .replace(/^-/, '')
        .toLowerCase();
});
type ArrayItem<T> = T extends (infer U)[] ? U : never;
export type IconNames = ArrayItem<typeof nameMap>;

export interface IconProps {
    color?: string; // 颜色
    fill?: string; // 填充颜色
    name: IconNames; // 名称
    size?: number; // 尺寸
    strokeWidth?: number; // 线条粗细
    style?: CSSProperties; // 样式
}

export default function Icon(props: IconProps) {
    const { fill = 'transparent', strokeWidth = 2, style = {}, size = SIZE.icon_middle, color = COLOR.icon_default, name } = props;

    const basicColor = _.isArray(color) ? color[0] : color;
    if (_.isNil(name)) {
        return null;
    }
    const formatName = name
        .split('-')
        .map(item => _.upperFirst(item))
        .join('');
    if (!(formatName in icons)) {
        return null;
    }
    // @ts-ignore
    const LuIcon: any = icons[formatName];

    return <LuIcon name={name} size={size} color={color} fill={fill} strokeWidth={strokeWidth} style={{ color: basicColor, ...style }} />;
}
