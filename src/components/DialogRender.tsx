import { Portal } from '@gorhom/portal';
import { useState } from 'react';
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
        setDialogQueue(prev => prev.filter(item => item.id !== id));
    };

    // 打开对话框
    useEventEmitter(EMITTER_MAP['打开对话框'], (config: IDialogProps) => {
        setDialogQueue(prev => {
            const id = config.id ?? randomId();
            const newDialog = { ...config, id, visible: true } as IDialogQueueItem;
            if (prev.some(item => item.id === id)) return prev;
            return [...prev, newDialog];
        });
    });

    // 关闭指定对话框
    useEventEmitter(EMITTER_MAP['关闭对话框'], (id: string) => {
        setDialogQueue(prev => prev.map(item => (item.id === id ? { ...item, visible: false } : item)));
    });

    // 关闭所有
    useEventEmitter(EMITTER_MAP['关闭所有对话框'], () => setDialogQueue([]));

    return (
        <>
            {dialogQueue.map(({ id, afterClose, visible, ...rest }) => (
                <Portal key={id} hostName="dialogHost" name={`dialog-${id}`}>
                    <Dialog
                        {...rest}
                        visible={visible}
                        afterClose={() => {
                            destroy(id);
                            afterClose?.();
                        }}
                    />
                </Portal>
            ))}
        </>
    );
}
