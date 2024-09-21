import { IDialogProps, IToastProps } from './components';

/**
 * Store
 */
export interface IDialogQueueItem extends Omit<IDialogProps, 'id'> {
    id: string;
}

export interface IToastQueueItem extends Omit<IToastProps, 'id'> {
    id: string;
}

export interface IStoreState {
    libSlice: {
        dialogQueue: IDialogQueueItem[];
        toastQueue: IToastQueueItem[];
    };
}