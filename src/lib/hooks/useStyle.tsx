import { IUseStyleProps } from '@/lib/_types/.hooks';
import { StyleSheet } from 'react-native';

export default function useStyle<T>(props: IUseStyleProps<T>) {
    const { defaultStyle, extraStyle } = props;

    const styleArray: T[] = defaultStyle || [];
    if (extraStyle) {
        extraStyle.filter(item => !!item).forEach(item => styleArray.push(item as T));
    }
    return StyleSheet.flatten(styleArray);
}
