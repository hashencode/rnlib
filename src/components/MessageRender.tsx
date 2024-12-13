import _ from 'lodash';
import { useState } from 'react';

import useEventEmitter from '../hooks/useEventEmitter';
import { EMITTER_MAP } from '../scripts/enum';
import { randomId } from '../scripts/utils';
import Message, { IMessageProps } from './Message';

export interface IMessageQueueItem extends Omit<IMessageProps, 'id'> {
    id: string;
}

export default function MessageRender() {
    const [toastQueue, setMessageQueue] = useState<IMessageQueueItem[]>([]);

    const destroy = (id: string) => {
        setMessageQueue(prev => {
            return [...prev.filter(item => item.id !== id)];
        });
    };

    useEventEmitter(EMITTER_MAP['打开消息'], (config: IMessageProps) => {
        if (_.isNil(config.id)) {
            config.id = randomId();
        }
        if (!toastQueue.find(item => item.id === config.id)) {
            setMessageQueue([...toastQueue, config as IMessageQueueItem]);
        }
    });

    useEventEmitter(EMITTER_MAP['关闭消息'], (id: string) => {
        destroy(id);
    });

    useEventEmitter(EMITTER_MAP['关闭所有消息'], () => {
        setMessageQueue([]);
    });

    return (
        <>
            {toastQueue?.map(queueItem => {
                const { afterClose, id: queueId, ...rest } = queueItem;
                return (
                    <Message
                        {...rest}
                        afterClose={() => {
                            destroy(queueId);
                            afterClose?.();
                        }}
                        key={queueId}
                    />
                );
            })}
        </>
    );
}
