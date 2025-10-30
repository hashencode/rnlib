import { isNil } from 'lodash';
import { useState } from 'react';
import useEventEmitter from '../../hooks/useEventEmitter.tsx';
import { EMITTER_MAP } from '../../scripts/enum.ts';
import { randomId } from '../../scripts/utils.ts';
import Portal from '../Portal/Portal.tsx';
import Message, { IMessageProps } from './Message.tsx';

export interface IMessageQueueItem extends IMessageProps {
    id?: string;
}

export default function MessageRender() {
    const [messageQueue, setMessageQueue] = useState<IMessageQueueItem[]>([]);

    const destroy = (id: string) => {
        setMessageQueue(prev => prev.filter(item => item.id !== id));
    };

    useEventEmitter(EMITTER_MAP['打开消息'], (config: IMessageQueueItem) => {
        if (isNil(config.id)) {
            config.id = randomId();
        }

        // 避免重复添加相同的消息
        if (!messageQueue.find(item => item.id === config.id)) {
            setMessageQueue(prev => [...prev, config]);
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
            {messageQueue.map(queueItem => {
                const { afterClose, id: queueId, ...rest } = queueItem;
                return (
                    <Portal key={queueId}>
                        <Message
                            {...rest}
                            afterClose={() => {
                                destroy(queueId as string);
                                afterClose?.();
                            }}
                        />
                    </Portal>
                );
            })}
        </>
    );
}
