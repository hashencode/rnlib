import { createSlice } from '@reduxjs/toolkit';
import { IStoreState } from '@/lib/_types/.store';

const initialState: IStoreState['uiSlice'] = {
    dialogQueue: [],
    dialogAfterCloseQueue: [],
};

const uiSlice = createSlice({
    name: 'uiSlice',
    initialState,
    reducers: {
        /**
         * Dialog
         */
        createDialog(state, action) {
            state.dialogQueue.push(action.payload);
            const afterClose = action.payload.afterClose;
            if (afterClose) {
                state.dialogAfterCloseQueue.push({ [action.payload.id]: afterClose });
            }
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
    },
});

export const { createDialog, destroyDialog, destroyAllDialog } = uiSlice.actions;
export default uiSlice.reducer;
