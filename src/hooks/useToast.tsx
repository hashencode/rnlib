import { createToast, destroyToast, destroyAllToast } from '../store/libSlice';
import { useDispatch } from 'react-redux';
import { IToastQueueItem } from '../_types/store';
import { IToastProps } from '../_types/components';

export default function useToast() {
    const dispatch = useDispatch();
    const create = (data: IToastProps) => dispatch(createToast(data));
    const destroy = (data: IToastQueueItem['id']) => dispatch(destroyToast(data));
    const destroyAll = () => dispatch(destroyAllToast());

    return { createToast: create, destroyToast: destroy, destroyAllToast: destroyAll };
}
