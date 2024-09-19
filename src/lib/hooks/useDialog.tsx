import { createDialog, destroyDialog, destroyAllDialog } from '@/lib/store/uiSlice';
import { useDispatch } from 'react-redux';
import { IDialogQueueItem } from '@/lib/_types/.store';

export default function useDialog() {
    const dispatch = useDispatch();
    const create = (data: IDialogQueueItem) => dispatch(createDialog(data));
    const destroy = (data: IDialogQueueItem['id']) => dispatch(destroyDialog(data));
    const destroyAll = () => dispatch(destroyAllDialog());

    return { createDialog: create, destroyDialog: destroy, destroyAllDialog: destroyAll };
}
