import React from 'react';
import { createContext, useCallback, useState } from 'react';
import { randomId } from '../scripts/utils';
import { ToastProps } from '../components/Toast';
import { Toast } from '../components';

export interface ToastConfig extends ToastProps {
    duration?: number; // 持续时间
    id?: string; // 唯一ID
}

// 内部队列包含定时器id和队列ID
interface ToastQueueItem extends ToastConfig {
    id: string; // 唯一ID
    timerId: any; // 计时器ID
}

export interface ToastReturn {
    createToast: (config: ToastConfig) => string;
    destroyToast: (id: string) => void;
    destroyAllToast: () => void;
}

export const ToastContext = createContext<ToastReturn>({
    createToast: () => '',
    destroyToast: () => {},
    destroyAllToast: () => {},
});

export default function ToastProvider(props: any) {
    const [toastQueue, setToastQueue] = useState<ToastQueueItem[]>([]);

    // 显示提示
    const createToast = useCallback(
        (config: ToastConfig) => {
            const { id = randomId(), type } = config;
            const defaultDuration = type === 'loading' ? 30 * 1000 : 2000;
            let duration = config.duration || defaultDuration;
            destroyToast(id);
            const timerId = setTimeout(() => {
                destroyToast(id);
            }, duration);
            setToastQueue(queue => {
                return [...queue, { ...config, id, timerId }] as ToastQueueItem[];
            });
            return id;
        },
        [setToastQueue],
    );

    // 删除单个提示
    const destroyToast = useCallback(
        (queueId: string) => {
            setToastQueue(queue => {
                return queue.map(queueItem => {
                    if (queueItem.id === queueId) {
                        queueItem.visible = false;
                    }
                    return queueItem;
                });
            });
        },
        [setToastQueue],
    );

    // 删除所有提示
    const destroyAllToast = useCallback(() => {
        setToastQueue(queue => {
            return queue.map(queueItem => {
                queueItem.visible = false;
                return queueItem;
            });
        });
    }, [setToastQueue]);

    // 蒙层动画结束，元素销毁后的回调
    const handleToastClose = (queueId: string) => {
        const currentTask = toastQueue.find(queueItem => queueItem.id === queueId);
        if (currentTask) {
            currentTask?.afterClose?.();
        }
        setToastQueue(queueItem => [...queueItem.filter(item => item.id !== queueId)]);
    };

    return (
        <ToastContext.Provider value={{ createToast, destroyToast, destroyAllToast }}>
            {props?.children}
            {toastQueue.map(queueItem => {
                const { id: queueId, visible, ...rest } = queueItem;
                return <Toast {...rest} visible={visible} key={queueId} afterClose={() => handleToastClose(queueId)} />;
            })}
        </ToastContext.Provider>
    );
}
