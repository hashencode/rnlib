import { createDialog, destroyDialog, destroyAllDialog, IDialogQueueItem } from '../store/libSlice';
import { useDispatch } from 'react-redux';
import { IDialogProps } from '../components/Dialog';

export default function useDialog() {
    const dispatch = useDispatch();
    const create = (data: IDialogProps) => dispatch(createDialog(data));
    const destroy = (data: IDialogQueueItem['id']) => dispatch(destroyDialog(data));
    const destroyAll = () => dispatch(destroyAllDialog());

    return { createDialog: create, destroyDialog: destroy, destroyAllDialog: destroyAll };
}
