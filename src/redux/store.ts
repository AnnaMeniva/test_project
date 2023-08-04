import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import fileReducer from "./fileSlice"

 
export const store = configureStore({
    reducer: {
        posts: postsReducer,
        files: fileReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
      }), 
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
