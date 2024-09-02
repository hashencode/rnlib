import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IGrabberProps } from '@/lib/_types/.components';

export default function Grabber(props: IGrabberProps) {
    const insets = useSafeAreaInsets();
    return <View style={StyleSheet.flatten([{ height: insets.bottom, width: '100%' }, props.style])} />;
}
