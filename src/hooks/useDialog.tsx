import { DeviceEventEmitter } from 'react-native';
import { IDialogQueueItem } from '../components/DialogRender';
import { EMITTER_MAP } from '../scripts/enum';

export default function useDialog() {
    const create = (data: IDialogQueueItem) => DeviceEventEmitter.emit(EMITTER_MAP['打开对话框'], data);
    const destroy = (data: IDialogQueueItem['id']) => DeviceEventEmitter.emit(EMITTER_MAP['关闭对话框'], data);
    const destroyAll = () => DeviceEventEmitter.emit(EMITTER_MAP['关闭所有对话框']);

    return { createDialog: create, destroyDialog: destroy, destroyAllDialog: destroyAll };
}
