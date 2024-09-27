import { StyleProp, StyleSheet } from 'react-native';

export interface IUseStyleProps<T> {
    defaultStyle?: StyleProp<T>[];
    extraStyle?: (StyleProp<T> | undefined)[];
}

export default function useStyle<T>(props: IUseStyleProps<T>) {
    const { defaultStyle, extraStyle } = props;

    const styleArray: StyleProp<T>[] = defaultStyle || [];
    if (extraStyle) {
        extraStyle.filter(item => !!item).forEach(item => styleArray.push(item as StyleProp<T>));
    }
    return StyleSheet.flatten(styleArray);
}
