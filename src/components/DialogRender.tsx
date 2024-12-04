import Dialog, { IDialogProps } from './Dialog';
import { View } from 'react-native';
import useEventEmitter from '../hooks/useEventEmitter';
import { EMITTER_MAP } from '../scripts/enum';
import _ from 'lodash';
import { randomId } from '../scripts/utils';
import { useState } from 'react';

export interface IDialogQueueItem extends Omit<IDialogProps, 'id'> {
    id: string;
}

export default function DialogRender() {
    const destroy = (id: string) => {
        setDialogQueue([...dialogQueue.filter(item => item.id !== id)]);
    };

    const [dialogQueue, setDialogQueue] = useState<IDialogQueueItem[]>([]);

    useEventEmitter(EMITTER_MAP['打开对话框'], (config: IDialogProps) => {
        if (_.isNil(config.id)) {
            config.id = randomId();
        }
        if (!dialogQueue.find(item => item.id === config.id)) {
            setDialogQueue([...dialogQueue, config as IDialogQueueItem]);
        }
    });

    useEventEmitter(EMITTER_MAP['关闭对话框'], (id: string) => {
        destroy(id);
    });

    useEventEmitter(EMITTER_MAP['关闭所有对话框'], () => {
        setDialogQueue([]);
    });

    return (
        <View>
            {dialogQueue?.map(queueItem => {
                const { id: queueId, ...rest } = queueItem;
                return <Dialog {...rest} visible={true} key={queueId} onCancel={() => destroy(queueId)} />;
            })}
        </View>
    );
}
