import { DeviceEventEmitter } from 'react-native';

import { IActionSheetQueueItem } from '../components/ActionSheet/ActionSheetRender.tsx';
import { EMITTER_MAP } from '../scripts/enum';

export default function useActionSheet() {
    const create = (data: IActionSheetQueueItem) => DeviceEventEmitter.emit(EMITTER_MAP['打开动作面板'], data);
    const destroy = (data: IActionSheetQueueItem['id']) => DeviceEventEmitter.emit(EMITTER_MAP['关闭动作面板'], data);
    const destroyAll = () => DeviceEventEmitter.emit(EMITTER_MAP['关闭所有动作面板']);

    return { createActionSheet: create, destroyAllActionSheet: destroyAll, destroyActionSheet: destroy };
}
