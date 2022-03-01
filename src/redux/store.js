import { configureStore } from '@reduxjs/toolkit'

import pharmacyApi from '../services/api'
import nobetciReducer from './nobetci'
import locationReducer from './location'

export const store = configureStore({
    reducer: {
        [pharmacyApi.reducerPath]: pharmacyApi.reducer,
        nobetci: nobetciReducer,
        location: locationReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(pharmacyApi.middleware)
    },
})