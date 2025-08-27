import { isNil } from 'lodash';
import { useState } from 'react';
import useEventEmitter from '../hooks/useEventEmitter';
import { EMITTER_MAP } from '../scripts/enum';
import { randomId } from '../scripts/utils';
import { IToastProps, Toast } from './index';

export interface IToastQueueItem extends Omit<IToastProps, 'id'> {
    id: string;
}

export default function ToastRender() {
    const [toastQueue, setToastQueue] = useState<IToastQueueItem[]>([]);

    const destroy = (id: string) => {
        setToastQueue(prev => {
            return [...prev.filter(item => item.id !== id)];
        });
    };

    useEventEmitter(EMITTER_MAP['打开提示'], (config: IToastProps) => {
        if (isNil(config.id)) {
            config.id = randomId();
        }
        if (!toastQueue.find(item => item.id === config.id)) {
            setToastQueue(prev => [...prev, config as IToastQueueItem]);
        }
    });

    useEventEmitter(EMITTER_MAP['关闭提示'], (id: string) => {
        destroy(id);
    });

    useEventEmitter(EMITTER_MAP['关闭所有提示'], () => {
        setToastQueue([]);
    });

    return (
        <>
            {toastQueue?.map(queueItem => {
                const { id: queueId, afterClose, ...rest } = queueItem;
                return (
                    <Toast
                        {...rest}
                        key={queueId}
                        afterClose={() => {
                            destroy(queueId);
                            afterClose?.();
                        }}
                    />
                );
            })}
        </>
    );
}
