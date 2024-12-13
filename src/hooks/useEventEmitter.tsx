import { useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { EMITTER_MAP } from '../scripts/enum';

export default function useEventEmitter(event: EMITTER_MAP, handleEvent: (data?: any) => void) {
    useEffect(() => {
        const subscription = DeviceEventEmitter.addListener(event, handleEvent);
        return () => {
            subscription?.remove();
        };
    }, [handleEvent]);
}
