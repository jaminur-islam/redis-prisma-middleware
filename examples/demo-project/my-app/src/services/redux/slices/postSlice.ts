import { createSlice } from '@reduxjs/toolkit'


export interface userState {
  posts: Array<{
    title:string
    description: string,
    id: number | null,
    userId: number | null,
  }>
}

const initialState: userState = {
  posts:[]
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPost :(state , action)=>{
       if(action.payload.length > 0){
        state.posts = [...state.posts , ...action.payload]
       }else{
        state.posts = []
       }
      
    }
   
  },
})

// Action creators are generated for each case reducer function
export const {setPost} = postSlice.actions

export default postSlice.reducer