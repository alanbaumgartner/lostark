import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {accountSlice} from "./accountSlice";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";

const rootReducer = combineReducers({
    account: accountSlice.reducer,
})

const persistConfig = {
    key: 'loa_v2',
    storage,
    stateReconciler: autoMergeLevel1,
}

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer)

export const store = configureStore({
    reducer: {
        persistedReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;