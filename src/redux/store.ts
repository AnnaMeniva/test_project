import { configureStore} from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import fileReducer from "./fileSlice"
import  usersSlice  from "./usersSlice";
 
export const store = configureStore({
    reducer: {
        posts: postsReducer,
        files: fileReducer,
        users: usersSlice
    }

})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
