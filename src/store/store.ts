import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { picsumApi } from '../services/picsum/api/endpoints'

// Explicitly defined to avoid circular reference between middleware and store definition
const rootReducer = combineReducers({
  [picsumApi.reducerPath]: picsumApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(picsumApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
