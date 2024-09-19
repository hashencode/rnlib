import { createSlice } from '@reduxjs/toolkit';
import { IStoreState } from '@/lib/_types/.store';
import _ from 'lodash';
import { randomId } from '@/lib/scripts/utils';

const initialState: IStoreState['libSlice'] = {
    dialogQueue: [],
    toastQueue: [],
};

const libSlice = createSlice({
    name: 'libSlice',
    initialState,
    reducers: {
        /**
         * Dialog
         */
        createDialog(state, action) {
            if (_.isNil(action.payload.id)) {
                action.payload.id = randomId();
            }
            state.dialogQueue.push(action.payload);
        },
        destroyDialog(state, action) {
            state.dialogQueue = state.dialogQueue.filter(item => item.id !== action.payload);
        },
        destroyAllDialog(state) {
            state.dialogQueue = [];
        },
        /**
         * Toast
         */
        createToast(state, action) {
            if (_.isNil(action.payload.id)) {
                action.payload.id = randomId();
            }
            state.toastQueue.push(action.payload);
        },
        destroyToast(state, action) {
            state.toastQueue = state.toastQueue.filter(item => item.id !== action.payload);
        },
        destroyAllToast(state) {
            state.toastQueue = [];
        },
    },
});

export const { createDialog, destroyDialog, destroyAllDialog, createToast, destroyToast, destroyAllToast } = libSlice.actions;
export default libSlice.reducer;
