import { StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLOR } from '../scripts/const.ts';

export interface IGrabberProps {
    style?: StyleProp<ViewStyle>;
}

export default function Grabber(props: IGrabberProps) {
    const insets = useSafeAreaInsets();
    return <View style={[{ height: insets.bottom, width: '100%', backgroundColor: COLOR.white }, props.style]} />;
}
