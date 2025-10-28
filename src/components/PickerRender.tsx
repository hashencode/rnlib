import { Portal } from '@gorhom/portal';
import { useState } from 'react';
import useEventEmitter from '../hooks/useEventEmitter';
import { EMITTER_MAP } from '../scripts/enum';
import { randomId } from '../scripts/utils';
import Picker, { IPickerProps } from './Picker';

export interface IPickerQueueItem extends IPickerProps {
    id?: string;
}

export default function PickerRender() {
    const [pickerQueue, setPickerQueue] = useState<IPickerQueueItem[]>([]);

    const destroy = (id: string) => {
        setPickerQueue(prev => prev.filter(item => item.id !== id));
    };

    // 打开 Picker
    useEventEmitter(EMITTER_MAP['打开选择器'], (config: IPickerQueueItem) => {
        const id = config.id ?? randomId();
        const newPicker = { ...config, id, visible: true };

        setPickerQueue(prev => {
            // 避免重复添加相同的 Picker
            if (prev.some(item => item.id === id)) return prev;
            return [...prev, newPicker];
        });
    });

    // 关闭指定 Picker
    useEventEmitter(EMITTER_MAP['关闭选择器'], (id: string) => {
        setPickerQueue(prev => prev.map(item => (item.id === id ? { ...item, visible: false } : item)));
    });

    // 关闭所有 Picker
    useEventEmitter(EMITTER_MAP['关闭所有选择器'], () => {
        setPickerQueue([]);
    });

    return (
        <>
            {pickerQueue.map(({ id: queueId, visible, afterClose, ...rest }) => (
                <Portal key={queueId} name={`picker-${queueId}`}>
                    <Picker
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
