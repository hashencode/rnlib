import Dialog from './Dialog';
import { IDialogQueueItem, IStoreState } from '../_types/store';
import { useDispatch, useSelector } from 'react-redux';
import { destroyDialog } from '../store/libSlice';
import { View } from 'react-native';

export default function DialogRender() {
    const dialogQueue = useSelector((state: IStoreState) => state.libSlice.dialogQueue);
    const dispatch = useDispatch();

    const destroy = (id: IDialogQueueItem['id']) => {
        dispatch(destroyDialog(id));
    };

    return (
        <View>
            {dialogQueue?.map(queueItem => {
                const { id: queueId, ...rest } = queueItem;
                return <Dialog {...rest} visible={true} key={queueId} onCancel={() => destroy(queueId)} />;
            })}
        </View>
    );
}
