import { useState } from 'react';
import useEventEmitter from '../../hooks/useEventEmitter.tsx';
import { EMITTER_MAP } from '../../scripts/enum.ts';
import { randomId } from '../../scripts/utils.ts';
import Portal from '../Portal/Portal.tsx';
import Popup, { IPopupProps } from './Popup.tsx';

export interface IPopupQueueItem extends IPopupProps {
    id?: string;
}

export default function PopupRender() {
    const [actionSheetQueue, setPopupQueue] = useState<IPopupQueueItem[]>([]);

    const destroy = (id: string) => {
        setPopupQueue(prev => prev.filter(item => item.id !== id));
    };

    // 打开 Popup
    useEventEmitter(EMITTER_MAP['打开弹出层'], (config: IPopupQueueItem) => {
        const id = config.id ?? randomId();
        const newPopup = { ...config, id, visible: true };

        setPopupQueue(prev => {
            // 避免重复添加相同的 Popup
            if (prev.some(item => item.id === id)) return prev;
            return [...prev, newPopup];
        });
    });

    // 关闭指定 Popup
    useEventEmitter(EMITTER_MAP['关闭弹出层'], (id: string) => {
        setPopupQueue(prev => prev.map(item => (item.id === id ? { ...item, visible: false } : item)));
    });

    // 关闭所有 Popup
    useEventEmitter(EMITTER_MAP['关闭所有弹出层'], () => {
        setPopupQueue([]);
    });

    return (
        <>
            {actionSheetQueue.map(({ id: queueId, visible, afterClose, ...rest }) => (
                <Portal key={queueId}>
                    <Popup
                        visible={visible}
                        {...rest}
                        afterClose={() => {
                            destroy(queueId as string);
                            afterClose?.();
                        }}
                    />
                </Portal>
            ))}
        </>
    );
}
