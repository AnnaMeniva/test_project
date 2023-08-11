import { PayloadAction, createSlice, current } from "@reduxjs/toolkit"
import { RootState } from './store';


export interface DataFileInterface{
    id: number
    imageURL: string
    name: string
    createdAt: string
    type: string
    
}
export const initialState: Array<DataFileInterface> = [
    {
        id: 1,
        imageURL: "https://www.svgrepo.com/show/505199/donut.svg",
        name: "Donut_SVG _Vector",
        createdAt: "2023-04-22",
        type: "image"
    },
    {
        id: 2,
        imageURL: "https://www.svgrepo.com/show/505196/cake.svg",
        name: "Cake_SVG _Vector",
        createdAt: "2023-01-26",
        type: "image"
    },
    {
        id: 3,
        imageURL: "https://www.svgrepo.com/show/505198/sushi.svg",
        name: "Sushi_SVG _Vector",
        createdAt: "2022-11-25",
        type: "image"
    },
    {
        id: 4,
        imageURL: "https://www.svgrepo.com/show/505195/hand-pulled-noodle.svg",
        name: "Hand_pulled_noodle_SVG _Vector",
        createdAt: "2023-01-03",
        type: "image"
    },
    {
        id: 5,
        imageURL: "https://www.svgrepo.com/show/505202/hamburger.svg",
        name: "Hamburger_SVG _Vector",
        createdAt: "2022-05-06",
        type: "image"
    },    
    {
        id: 6,
        imageURL: "https://www.svgrepo.com/show/505207/fries.svg",
        name: "Fries_SVG _Vector",
        createdAt: "2023-04-22",
        type: "image"
    },
    {
        id: 7,
        imageURL: "https://www.svgrepo.com/show/505205/roast-chicken.svg",
        name: "Roast_chicken_SVG _Vector",
        createdAt: "2023-04-25",
        type: "image"
    },    
    {
        id: 8,
        imageURL: "https://www.svgrepo.com/show/505204/ice-cream.svg",
        name: "Ice_cream_SVG _Vector",
        createdAt: "2023-03-29",
        type: "image"
    },
    {
        id: 9,
        imageURL: "https://www.svgrepo.com/show/505213/pizza.svg",
        name: "Pizza_SVG _Vector",
        createdAt: "2023-01-31",
        type: "image"
    },   
    {
        id: 10,
        imageURL: "https://www.svgrepo.com/show/505209/egg.svg",
        name: "Egg_SVG _Vector",
        createdAt: "2023-04-22",
        type: "image"
    },
    {
        id: 11,
        imageURL: "https://www.svgrepo.com/show/505211/tangerine.svg",
        name: "Tangerine_SVG _Vector",
        createdAt: "2023-04-09",
        type: "image"
    }
]
export const fileSlice = createSlice({
    name: 'files',
    initialState,
    
    reducers:{
        updateFileName:(state, action: PayloadAction<{id: number, name: string}>)=>{
            state.map((el, index)=>{
                if (el.id === action.payload.id){
                    state[index].name = action.payload.name
                    return el
                }return el
            })
        }, 
        deleteItem:(state, action: PayloadAction<{id: number}>) =>{
            console.log("delete", current(state))
            return state.filter(el => el.id !== action.payload.id) 
        },
        addFile:(state, action: PayloadAction<FileList>) =>{

            let imageData = {
                id: state.length + 1,
                imageURL: 'https://www.svgrepo.com/show/513271/basketball.svg',
                name: action.payload.item(0)?.name || '',
                createdAt: new Date().toISOString(),
                type: action.payload.item(0)?.type.slice(0,-4) || ""
            }
            state.unshift(imageData)
            console.log(current(state))
        },
        // searchFile:(state, action: PayloadAction<{name: string}>)=>{
        //     if(!action.payload.name ){
        //           return initialState  
        //           //don`t work with new state`s files
        //     }
        //     const regex = new RegExp(action.payload.name, "i");
        //     const searchList = state.filter((el: any) => regex.test(el.name));
        //         return searchList
        // },
        // sortByVideo:(state) =>{
        //     return state.filter((el: any) => el.type === "video")
        // },
        // sortByImage:(state)=>{
        //     return state.filter((el: any) => el.type === "image")
        // },
        // sortByFile:(state)=>{
        //     return state.filter((el: any) => el.type === "file")
        // },
        // sortByAudio:(state)=>{
        //     return state.filter((el: any) => el.type === "audio") 
        // }

                   
                   
    }}
        
);
        


export const {updateFileName, deleteItem, addFile 
    } = fileSlice.actions

export const selectStatus = (state: RootState) => state
export default fileSlice.reducer