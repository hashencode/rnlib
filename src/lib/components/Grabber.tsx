import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface GrabberProps {
    background?: string; // 头部插槽
}

export default function Grabber(props: GrabberProps) {
    const { background = 'transparent' } = props;
    const insets = useSafeAreaInsets();
    return <View style={{ height: insets.bottom, width: '100%', backgroundColor: background }} />;
}
