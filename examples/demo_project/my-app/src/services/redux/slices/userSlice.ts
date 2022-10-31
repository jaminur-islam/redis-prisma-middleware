import { createSlice } from '@reduxjs/toolkit'


export interface userState {
  user : {
    name:string
    email: string,
    id: number | null
  }
}

const initialState: userState = {
  user: {
    name: "",
    email: "",
    id: null,
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser :(state , action)=>{
     state.user = action.payload
    }
   
  },
})

// Action creators are generated for each case reducer function
export const {setUser} = userSlice.actions

export default userSlice.reducer