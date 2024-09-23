import { StyleProp } from 'react-native';

export interface IUseStyleProps<T> {
    defaultStyle?: StyleProp<T>[];
    extraStyle?: (StyleProp<T> | undefined)[];
}
