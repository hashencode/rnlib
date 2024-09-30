import { createToast, destroyToast, destroyAllToast, IToastQueueItem } from '../store/libSlice';
import { useDispatch } from 'react-redux';
import { IToastProps } from '../components/Toast';

export default function useToast() {
    const dispatch = useDispatch();
    const create = (data: IToastProps) => dispatch(createToast(data));
    const destroy = (data: IToastQueueItem['id']) => dispatch(destroyToast(data));
    const destroyAll = () => dispatch(destroyAllToast());

    return { createToast: create, destroyToast: destroy, destroyAllToast: destroyAll };
}
