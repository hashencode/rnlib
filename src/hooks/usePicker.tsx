import { DeviceEventEmitter } from 'react-native';

import { IPickerQueueItem } from '../components/PickerRender.tsx';
import { EMITTER_MAP } from '../scripts/enum';

export default function usePicker() {
    const create = (data: IPickerQueueItem) => DeviceEventEmitter.emit(EMITTER_MAP['打开选择器'], data);
    const destroy = (data: IPickerQueueItem['id']) => DeviceEventEmitter.emit(EMITTER_MAP['关闭选择器'], data);
    const destroyAll = () => DeviceEventEmitter.emit(EMITTER_MAP['关闭所有选择器']);

    return { createPicker: create, destroyAllPicker: destroyAll, destroyPicker: destroy };
}
