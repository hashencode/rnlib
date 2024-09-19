import { configureStore } from '@reduxjs/toolkit';
import uiSlice from '@/lib/store/uiSlice';

const store = configureStore({
    reducer: {
        uiSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
