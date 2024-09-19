import { IDialogProps } from '@/lib/_types/.components';

/**
 * Store
 */
export interface IDialogQueueItem extends Omit<IDialogProps, 'id'> {
    id: string;
}

export interface IStoreState {
    uiSlice: {
        dialogQueue: IDialogQueueItem[];
        dialogAfterCloseQueue: { [key: string]: any }[];
    };
}
