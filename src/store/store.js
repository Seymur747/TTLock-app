
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './api/api'
import authSlice from './slices/auth.slice'


export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth:authSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)