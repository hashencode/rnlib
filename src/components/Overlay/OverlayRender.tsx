import { useState } from 'react';
import useEventEmitter from '../../hooks/useEventEmitter.tsx';
import { EMITTER_MAP } from '../../scripts/enum.ts';
import { randomId } from '../../scripts/utils.ts';
import Portal from '../Portal/Portal.tsx';
import Overlay, { IOverlayProps } from './Overlay.tsx';

export interface IOverlayQueueItem extends IOverlayProps {
    id?: string;
}

export default function OverlayRender() {
    const [overlayQueue, setOverlayQueue] = useState<IOverlayQueueItem[]>([]);

    const destroy = (id: string) => {
        setOverlayQueue(prev => prev.filter(item => item.id !== id));
    };

    // 打开 Overlay
    useEventEmitter(EMITTER_MAP['打开遮罩'], (config: IOverlayQueueItem) => {
        const id = config.id ?? randomId();
        const newOverlay = { ...config, id, visible: true };

        setOverlayQueue(prev => {
            // 避免重复添加相同的 Overlay
            if (prev.some(item => item.id === id)) return prev;
            return [...prev, newOverlay];
        });
    });

    // 关闭指定 Overlay
    useEventEmitter(EMITTER_MAP['关闭遮罩'], (id: string) => {
        setOverlayQueue(prev => prev.map(item => (item.id === id ? { ...item, visible: false } : item)));
    });

    // 关闭所有 Overlay
    useEventEmitter(EMITTER_MAP['关闭所有遮罩'], () => {
        setOverlayQueue([]);
    });

    return (
        <>
            {overlayQueue.map(({ id: queueId, visible, afterClose, ...rest }) => (
                <Portal key={queueId}>
                    <Overlay
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
