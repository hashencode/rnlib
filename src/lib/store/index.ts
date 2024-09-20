import { configureStore } from '@reduxjs/toolkit';
import libSlice from '../store/libSlice';

const store = configureStore({
    reducer: {
        libSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
