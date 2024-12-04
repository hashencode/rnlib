import { IToastProps, Toast } from './index';
import { View } from 'react-native';
import { useState } from 'react';
import useEventEmitter from '../hooks/useEventEmitter';
import { EMITTER_MAP } from '../scripts/enum';
import _ from 'lodash';
import { randomId } from '../scripts/utils';

export interface IToastQueueItem extends Omit<IToastProps, 'id'> {
    id: string;
}

export default function ToastRender() {
    const destroy = (id: string) => {
        setToastQueue([...toastQueue.filter(item => item.id !== id)]);
    };

    const [toastQueue, setToastQueue] = useState<IToastQueueItem[]>([]);

    useEventEmitter(EMITTER_MAP['打开提示'], (config: IToastProps) => {
        if (_.isNil(config.id)) {
            config.id = randomId();
        }
        if (!toastQueue.find(item => item.id === config.id)) {
            setToastQueue([...toastQueue, config as IToastQueueItem]);
        }
    });

    useEventEmitter(EMITTER_MAP['关闭提示'], (id: string) => {
        destroy(id);
    });

    useEventEmitter(EMITTER_MAP['关闭所有提示'], () => {
        setToastQueue([]);
    });

    return (
        <View>
            {toastQueue?.map(queueItem => {
                const { id: queueId, ...rest } = queueItem;
                return <Toast {...rest} key={queueId} afterClose={() => destroy(queueId)} />;
            })}
        </View>
    );
}
