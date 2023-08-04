import { posts } from './Redux-store';


let initialState = { 
    posts:[],  
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1, 
}
// const postsReducer = (state = initialState, action: ActionsTypes):  =>{
//     switch(action.type){
//         case 'SN/USERS/SET_CURRENT_PAGE': {
//             return {...state, currentPage: action.currentPage}
//         }
//         case 'SN/USERS/SET_TOTAL_USERS_COUNT': {
//             return {...state, totalUsersCount: action.count}
//         }
//     }

// }
// export const actions = {
//     setCurrentPage: (currentPage: number) => ({type: 'SN/USERS/SET_CURRENT_PAGE', currentPage} as const),
//     setTotalUsersCount: (totalUsersCount: number) => ({
//         type: 'SN/USERS/SET_TOTAL_USERS_COUNT',
//         count: totalUsersCount
//     } as const),
// }
// export default postsReducer;

// export type InitialState = typeof initialState
// type ActionsTypes = InferActionsTypes<typeof actions>