import { IUseStyleProps } from '../_types/hooks';
import { StyleProp, StyleSheet } from 'react-native';

export default function useStyle<T>(props: IUseStyleProps<T>) {
    const { defaultStyle, extraStyle } = props;

    const styleArray: StyleProp<T>[] = defaultStyle || [];
    if (extraStyle) {
        extraStyle.filter(item => !!item).forEach(item => styleArray.push(item as StyleProp<T>));
    }
    return StyleSheet.flatten(styleArray);
}
