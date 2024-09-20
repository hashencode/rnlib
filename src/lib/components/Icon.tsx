import { StyleSheet } from 'react-native';
import _ from 'lodash';
import * as icons from 'lucide-react-native';
import { COLOR, SIZE } from '../scripts/const';
import { IIconProps } from '../_types/.components';

const nameMap = Object.keys(icons).map(key => {
    return key
        .replace(/([A-Z])/g, '-$1')
        .replace(/^-/, '')
        .toLowerCase();
});
type ArrayItem<T> = T extends (infer U)[] ? U : never;
export type IconNames = ArrayItem<typeof nameMap>;

export default function Icon(props: IIconProps) {
    const { fill = 'transparent', strokeWidth = 2, style = {}, size = SIZE.icon_md, color = COLOR.icon_default, name } = props;

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

    return <LuIcon name={name} size={size} fill={fill} strokeWidth={strokeWidth} style={StyleSheet.flatten([{ color }, style])} />;
}
