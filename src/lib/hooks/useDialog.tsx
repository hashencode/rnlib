import { createDialog, destroyDialog, destroyAllDialog } from '@/lib/store/libSlice';
import { useDispatch } from 'react-redux';
import { IDialogQueueItem } from '@/lib/_types/.store';
import { IDialogProps } from '@/lib/_types/.components';

export default function useDialog() {
    const dispatch = useDispatch();
    const create = (data: IDialogProps) => dispatch(createDialog(data));
    const destroy = (data: IDialogQueueItem['id']) => dispatch(destroyDialog(data));
    const destroyAll = () => dispatch(destroyAllDialog());

    return { createDialog: create, destroyDialog: destroy, destroyAllDialog: destroyAll };
}
