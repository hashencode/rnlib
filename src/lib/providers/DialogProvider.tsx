import { createContext, useCallback, useState } from 'react';
import { randomId } from '../scripts/utils';
import Dialog, { DialogProps } from '../components/Dialog';

export interface DialogConfig extends DialogProps {
    id?: string; // 唯一ID
}

// 内部队列包含定时器id和队列ID
interface DialogQueueItem extends DialogConfig {
    id: string; // 唯一ID
}

export interface DialogReturn {
    createDialog: (config: DialogConfig) => string;
    destroyDialog: (id: string) => void;
    destroyAllDialog: () => void;
}

export const DialogContext = createContext<DialogReturn>({
    createDialog: () => '',
    destroyDialog: () => {},
    destroyAllDialog: () => {},
});

export default function DialogProvider(props: any) {
    const [dialogQueue, setDialogQueue] = useState<DialogQueueItem[]>([]);

    // 显示提示
    const createDialog = useCallback(
        (config: DialogConfig) => {
            const { id = randomId() } = config;
            destroyDialog(id);
            setDialogQueue(queue => {
                return [...queue, { ...config, id }] as DialogQueueItem[];
            });
            return id;
        },
        [setDialogQueue],
    );

    // 删除单个提示
    const destroyDialog = useCallback(
        (queueId: string) => {
            setDialogQueue(queue => {
                return queue.map(queueItem => {
                    if (queueItem.id === queueId) {
                        queueItem.visible = false;
                    }
                    return queueItem;
                });
            });
        },
        [setDialogQueue],
    );

    // 删除所有提示
    const destroyAllDialog = useCallback(() => {
        setDialogQueue(queue => {
            return queue.map(queueItem => {
                queueItem.visible = false;
                return queueItem;
            });
        });
    }, [setDialogQueue]);

    // 蒙层动画结束，元素销毁后的回调
    const handleDialogClose = (queueId: string) => {
        const currentTask = dialogQueue.find(queueItem => queueItem.id === queueId);
        if (currentTask) {
            currentTask?.afterClose?.();
        }
        setDialogQueue(queueItem => [...queueItem.filter(item => item.id !== queueId)]);
    };

    return (
        <DialogContext.Provider value={{ createDialog, destroyDialog, destroyAllDialog }}>
            {props?.children}
            {dialogQueue.map(queueItem => {
                const { id: queueId, visible, ...rest } = queueItem;
                return (
                    <Dialog
                        {...rest}
                        visible={visible}
                        key={queueId}
                        onCancel={() => destroyDialog(queueId)}
                        afterClose={() => handleDialogClose(queueId)}
                    />
                );
            })}
        </DialogContext.Provider>
    );
}
