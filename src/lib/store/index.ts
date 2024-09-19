import { configureStore } from '@reduxjs/toolkit';
import libSlice from '@/lib/store/libSlice';

const store = configureStore({
    reducer: {
        libSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
