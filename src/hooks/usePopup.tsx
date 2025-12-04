import { DeviceEventEmitter } from 'react-native';

import { IPopupQueueItem } from '../components/Popup/PopupRender.tsx';
import { EMITTER_MAP } from '../scripts/enum';

export default function usePopup() {
    const create = (data: IPopupQueueItem) => DeviceEventEmitter.emit(EMITTER_MAP['打开弹出层'], data);
    const destroy = (data: IPopupQueueItem['id']) => DeviceEventEmitter.emit(EMITTER_MAP['关闭弹出层'], data);
    const destroyAll = () => DeviceEventEmitter.emit(EMITTER_MAP['关闭所有弹出层']);

    return { createPopup: create, destroyAllPopup: destroyAll, destroyPopup: destroy };
}
