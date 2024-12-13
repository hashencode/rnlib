import _ from 'lodash';
import { useState } from 'react';
import { View } from 'react-native';

import useEventEmitter from '../hooks/useEventEmitter';
import { EMITTER_MAP } from '../scripts/enum';
import { randomId } from '../scripts/utils';
import Dialog, { IDialogProps } from './Dialog';

export interface IDialogQueueItem extends Omit<IDialogProps, 'id'> {
    id: string;
}

export default function DialogRender() {
    const [dialogQueue, setDialogQueue] = useState<IDialogQueueItem[]>([]);

    const destroy = (id: string) => {
        setDialogQueue(prev => [...prev.filter(item => item.id !== id)]);
    };

    useEventEmitter(EMITTER_MAP['打开对话框'], (config: IDialogProps) => {
        if (_.isNil(config.id)) {
            config.id = randomId();
        }
        config.visible = true;
        if (!dialogQueue.find(item => item.id === config.id)) {
            setDialogQueue([...dialogQueue, config as IDialogQueueItem]);
        }
    });

    useEventEmitter(EMITTER_MAP['关闭对话框'], (id: string) => {
        setDialogQueue(prev => [
            ...prev.map(item => {
                if (item.id === id) {
                    item.visible = false;
                }
                return item;
            }),
        ]);
    });

    useEventEmitter(EMITTER_MAP['关闭所有对话框'], () => {
        setDialogQueue([]);
    });

    return (
        <View>
            {dialogQueue?.map(queueItem => {
                const { afterClose, id: queueId, visible, ...rest } = queueItem;
                return (
                    <Dialog
                        {...rest}
                        afterClose={() => {
                            destroy(queueId);
                            afterClose?.();
                        }}
                        key={queueId}
                        visible={visible}
                    />
                );
            })}
        </View>
    );
}
