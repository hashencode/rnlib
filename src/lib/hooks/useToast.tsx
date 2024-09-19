import { createToast, destroyToast, destroyAllToast } from '@/lib/store/libSlice';
import { useDispatch } from 'react-redux';
import { IToastQueueItem } from '@/lib/_types/.store';

export default function useToast() {
    const dispatch = useDispatch();
    const create = (data: IToastQueueItem) => dispatch(createToast(data));
    const destroy = (data: IToastQueueItem['id']) => dispatch(destroyToast(data));
    const destroyAll = () => dispatch(destroyAllToast());

    return { createToast: create, destroyToast: destroy, destroyAllToast: destroyAll };
}
