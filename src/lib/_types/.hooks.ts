import { ViewStyle } from 'react-native';

export interface IUseStyleProps<T> {
    defaultStyle?: T[];
    extraStyle?: (T | undefined)[];
}
