import _ from 'lodash';
import * as icons from 'lucide-react-native';
import { StyleProp, TextStyle } from 'react-native';

import { COLOR, SIZE } from '../scripts/const';

export interface IIconProps {
    color?: TextStyle['color']; // 颜色
    fill?: string; // 填充颜色
    name: IconNames; // 名称
    size?: number; // 尺寸
    strokeWidth?: number; // 线条粗细
    style?: StyleProp<TextStyle>; // 样式
}

const nameMap = Object.keys(icons).map(key => {
    return key
        .replace(/([A-Z])/g, '-$1')
        .replace(/^-/, '')
        .toLowerCase();
});
export type IconNames = ArrayItem<typeof nameMap>;
type ArrayItem<T> = T extends (infer U)[] ? U : never;

export default function Icon(props: IIconProps) {
    const { color = COLOR.icon_default, fill = 'transparent', name, size = SIZE.icon_md, strokeWidth = 2, style = {} } = props;

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

    return <LuIcon fill={fill} name={name} size={size} strokeWidth={strokeWidth} style={[{ color }, style]} />;
}
