import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const userSlice = createSlice({
    name:"user",
    initialState : { count : 1},
    reducers:{
        add : (state) =>{
            state.count++
        }
    }
})

export default userSlice.reducer
export const userSelector = (state:RootState) => state.userReducer;
export const { add } = userSlice.actions