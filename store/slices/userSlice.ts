import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState : { count : 1},
    reducers:{}
})

export default userSlice.reducer