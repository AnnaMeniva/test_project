import {  PayloadAction, createSlice, current } from "@reduxjs/toolkit"
import { RootState } from "./store"


interface PostsState{    
  PageTitle: string
  CreatedAt: string
  Status: boolean
  Author: string
  id: number    
}
export const initialState: Array<PostsState> = [
{
    PageTitle: "Home page",
    CreatedAt: "2023-04-22",
    Status: true,
    Author: "Addy Bloogs", 
    id:1
},
{
    PageTitle: "About page",
    CreatedAt: "2023-04-14",
    Status: true,
    Author: "Bill Bloogs",
    id:2      
},
{
    PageTitle: "Home page",
    CreatedAt: "2023-04-18",
    Status: false,
    Author: "Stive Bloogs",
    id:3 
},
{
    PageTitle: "Home page",
    CreatedAt: "2023-02-02",
    Status: true,
    Author: "Joe Bloogs",
    id:4 
},
{
    PageTitle: "About page",
    CreatedAt: "2023-03-05",
    Status: true,
    Author: "Joe McBuly",
    id:5       
},        
{
    PageTitle: "Home page",
    CreatedAt: "2023-01-04",
    Status: true,
    Author: "Joe Bloogs", 
    id:6
},
{
    PageTitle: "About page",
    CreatedAt: "2023-03-10",
    Status: false,
    Author: "Ann Mire",
    id:7
},
{
    PageTitle: "Home page",
    CreatedAt: "2022-12-31",
    Status: false,
    Author: "Joe Bloogs",
    id:8
},
{   
    PageTitle: "Home page",
    CreatedAt: "2022-05-17",
    Status: true,
    Author: "July Smit",
    id:9
},
{
    PageTitle: "About page",
    CreatedAt: "2022-07-03",
    Status: true,
    Author: "Joe Bloogs",
    id:10
},
{
    PageTitle: "About page",
    CreatedAt: "2023-02-12",
    Status: false,
    Author: "Joe Bloogs",
    id:11  
}   

] 
export const postsSlice = createSlice({
    name: 'posts',
    initialState ,
    reducers: {
        updateStatus:(state, action: PayloadAction<{id: number, Status: boolean}>) =>{
           state.map((el, index) => {
                if (el.id === action.payload.id) {
                   state[index].Status = !el.Status
                    return el
                }
                return el
            })
        },
        updatePageTitleName:(state, action: PayloadAction<{id: number, PageTitle: string}>) =>{
            state.map((el, index) => {
                if (el.id === action.payload.id) {
                   state[index].PageTitle = action.payload.PageTitle
                    return el
                }
                return el
            })
        },
        deleteItem:(state, action: PayloadAction<{id: number}>) =>{
            console.log("delete", current(state))
            return state.filter(el => el.id !== action.payload.id) 
        },
        sortByTitlePageABCReducer:(state) =>{ 
            state.sort((a, b) => {
                const nameA = a.PageTitle.toUpperCase(); 
                const nameB = b.PageTitle.toUpperCase(); 
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                        return 0;
                    });      
        },
        sortByTitlePageReverseReducer:(state) =>{
                state.sort((a, b) => {
                    const nameA = a.PageTitle.toUpperCase(); 
                    const nameB = b.PageTitle.toUpperCase(); 
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                            return 0;
                        }).reverse();      
        },
        noSort:(state)=>{
                console.log(current(state))
                return initialState
        },
        sortByAuthorABCReducer:(state) =>{ 
            state.sort((a, b) => {
                const nameA = a.Author.toUpperCase(); 
                const nameB = b.Author.toUpperCase(); 
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                        return 0;
                    });      
        },
        sortByAuthorReverseReducer:(state) =>{
            state.sort((a, b) => {
                const nameA = a.Author.toUpperCase(); 
                const nameB = b.Author.toUpperCase(); 
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                        return 0;
                    }).reverse();      
        },
        sortByStatusTrueFirstReducer:(state) =>{
            const trueFirst = state.sort((a, b) => Number(b.Status) - Number(a.Status))
                return trueFirst   
        },
        sortByStatusFalseFirstreducer:(state)=>{
            const falseFirst = state.sort((a, b) => Number(a.Status) - Number(b.Status))
                return falseFirst
        },
        sortByDateReducer:(state) =>{
            state.sort((a, b) => Date.parse(b.CreatedAt) - Date.parse(a.CreatedAt))
        },
        sortByDateReverseReducer:(state) =>{
            state.sort((a, b) => Date.parse(b.CreatedAt) - Date.parse(a.CreatedAt)).reverse()
        }
  
    
}})
            
    
           



export const  {updateStatus, updatePageTitleName, deleteItem, 
    sortByTitlePageABCReducer, sortByTitlePageReverseReducer, noSort, sortByAuthorABCReducer, 
    sortByAuthorReverseReducer, sortByStatusTrueFirstReducer, sortByStatusFalseFirstreducer,
    sortByDateReducer, sortByDateReverseReducer } = postsSlice.actions

export const selectStatus = (state: RootState) => state
export default postsSlice.reducer