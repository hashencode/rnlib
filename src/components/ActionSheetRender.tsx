import { Portal } from '@gorhom/portal';
import { useState } from 'react';
import useEventEmitter from '../hooks/useEventEmitter';
import { EMITTER_MAP } from '../scripts/enum';
import { randomId } from '../scripts/utils';
import ActionSheet, { IActionSheetProps } from './ActionSheet';

export interface IActionSheetQueueItem extends IActionSheetProps {
    id?: string;
}

export default function ActionSheetRender() {
    const [actionSheetQueue, setActionSheetQueue] = useState<IActionSheetQueueItem[]>([]);

    const destroy = (id: string) => {
        setActionSheetQueue(prev => prev.filter(item => item.id !== id));
    };

    // 打开 ActionSheet
    useEventEmitter(EMITTER_MAP['打开动作面板'], (config: IActionSheetQueueItem) => {
        const id = config.id ?? randomId();
        const newActionSheet = { ...config, id, visible: true };

        setActionSheetQueue(prev => {
            // 避免重复添加相同的 ActionSheet
            if (prev.some(item => item.id === id)) return prev;
            return [...prev, newActionSheet];
        });
    });

    // 关闭指定 ActionSheet
    useEventEmitter(EMITTER_MAP['关闭动作面板'], (id: string) => {
        setActionSheetQueue(prev => prev.map(item => (item.id === id ? { ...item, visible: false } : item)));
    });

    // 关闭所有 ActionSheet
    useEventEmitter(EMITTER_MAP['关闭所有动作面板'], () => {
        setActionSheetQueue([]);
    });

    return (
        <>
            {actionSheetQueue.map(({ id: queueId, visible, afterClose, ...rest }) => (
                <Portal key={queueId} hostName="actionSheetHost" name={`actionSheet-${queueId}`}>
                    <ActionSheet
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
