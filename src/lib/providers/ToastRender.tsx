import { IStoreState, IToastQueueItem } from '@/lib/_types/.store';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '@/lib/components';
import { destroyToast } from '@/lib/store/libSlice';

export default function ToastRender() {
    const toastQueue = useSelector((state: IStoreState) => state.libSlice.toastQueue);
    const dispatch = useDispatch();

    const destroy = (id: IToastQueueItem['id']) => {
        dispatch(destroyToast(id));
    };

    return (
        <>
            {toastQueue?.map(queueItem => {
                const { id: queueId, ...rest } = queueItem;
                return <Toast {...rest} key={queueId} afterClose={() => destroy(queueId)} />;
            })}
        </>
    );
}
