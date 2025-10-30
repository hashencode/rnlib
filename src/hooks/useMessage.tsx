import { DeviceEventEmitter } from 'react-native';

import { IMessageProps } from '../components';
import { IMessageQueueItem } from '../components/Message/MessageRender.tsx';
import { EMITTER_MAP } from '../scripts/enum';

export default function useMessage() {
    const create = (data: IMessageProps) => DeviceEventEmitter.emit(EMITTER_MAP['打开消息'], data);
    const destroy = (data: IMessageQueueItem['id']) => DeviceEventEmitter.emit(EMITTER_MAP['关闭消息'], data);
    const destroyAll = () => DeviceEventEmitter.emit(EMITTER_MAP['关闭所有消息']);

    return { createMessage: create, destroyAllMessage: destroyAll, destroyMessage: destroy };
}
