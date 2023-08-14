import { PayloadAction, createSlice, current } from "@reduxjs/toolkit"
import { RootState } from './store';

export interface DataUserInterface{
    userId: number | null,
    email: string | null,
    fullName: string,
    password: string,
    isAuth: boolean,
    isAdmin: boolean,
    avatar: string
}

export const initialState: Array<DataUserInterface> = [
    {
        userId: 1,
        email: "igor@gmail.com",
        fullName: 'igor',
        password: 'Qweqwe123!',
        avatar: "https://img.freepik.com/premium-vector/cat-head-colorful-gradient-logo-vector_334862-14.jpg?w=826",
        isAdmin: false,
        isAuth: false
    },
    {
        userId: 2,
        fullName: "Franik",
        email: "franik@gmail.com",
        password: "Qweqwe321#",
        isAdmin: false,
        isAuth: false,
        avatar: "https://img.freepik.com/premium-vector/apes-monkey-head-colorful-gradient-logo-vector_334862-10.jpg?w=826"
    }
]
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers:{
    userIsAuth: (state, action: PayloadAction<{email: string, password: string, isAuth?: boolean}>)=>{
      state.map((user)=>{
              
        if(user.email === action.payload.email &&
          user.password === action.payload.password){
          user.isAuth = true
          action.payload.isAuth = true
        } else {
          user.isAuth = false
        } return user
      
      })
      console.log(111,current(state))
    },
    // currentUser:(state, action: PayloadAction<{email: string, password: string, isAuth?: boolean, avatar?: string}>)=>{
    //     state.filter((user)=>{
    //     if(user.email === action.payload.email){
    //        return user
    //     }
    //       console.log(8888,user)
    //     })
    // }
            
   
    }

  }
)
                
        
export const {userIsAuth} = usersSlice.actions

export const selectStatus = (state: RootState) => state
export default usersSlice.reducer