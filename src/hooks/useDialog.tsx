import { IDialogProps } from '../components';
import { DeviceEventEmitter } from 'react-native';
import { EMITTER_MAP } from '../scripts/enum';
import { IDialogQueueItem } from '../components/DialogRender';

export default function useDialog() {
    const create = (data: IDialogProps) => DeviceEventEmitter.emit(EMITTER_MAP['打开对话框'], data);
    const destroy = (data: IDialogQueueItem['id']) => DeviceEventEmitter.emit(EMITTER_MAP['关闭对话框'], data);
    const destroyAll = () => DeviceEventEmitter.emit(EMITTER_MAP['关闭所有对话框']);

    return { createDialog: create, destroyDialog: destroy, destroyAllDialog: destroyAll };
}
