import { IToastProps } from '../components';
import { DeviceEventEmitter } from 'react-native';
import { EMITTER_MAP } from '../scripts/enum';
import { IToastQueueItem } from '../components/ToastRender';

export default function useToast() {
    const create = (data: IToastProps) => DeviceEventEmitter.emit(EMITTER_MAP['打开提示'], data);
    const destroy = (data: IToastQueueItem['id']) => DeviceEventEmitter.emit(EMITTER_MAP['关闭提示'], data);
    const destroyAll = () => DeviceEventEmitter.emit(EMITTER_MAP['关闭所有提示']);

    return { createToast: create, destroyToast: destroy, destroyAllToast: destroyAll };
}
