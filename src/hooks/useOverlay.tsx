import { DeviceEventEmitter } from 'react-native';

import { IOverlayQueueItem } from '../components/OverlayRender.tsx';
import { EMITTER_MAP } from '../scripts/enum';

export default function useOverlay() {
    const create = (data: IOverlayQueueItem) => DeviceEventEmitter.emit(EMITTER_MAP['打开遮罩'], data);
    const destroy = (data: IOverlayQueueItem['id']) => DeviceEventEmitter.emit(EMITTER_MAP['关闭遮罩'], data);
    const destroyAll = () => DeviceEventEmitter.emit(EMITTER_MAP['关闭所有遮罩']);

    return { createOverlay: create, destroyAllOverlay: destroyAll, destroyOverlay: destroy };
}
