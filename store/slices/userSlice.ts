import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import * as serverService from "@/services/serverService";

interface SignAction {
    username: string;
    password: string;
}

interface UserState {
    username: string;
    accessToken: string;
    error?: string;
    status: "init" | "fetching" | "success" | "failed";
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    count: number;
}

const initialState: UserState = {
    accessToken: "",
    username: "",
    status: "init",
    isAuthenticated: false,
    isAuthenticating: true,
    count: 0,

}

export const signUp = createAsyncThunk(
    "user/signUp",
    async (credential: SignAction) => {
        await new Promise((resolve) => setTimeout(resolve,2000))
        const response = await serverService.signUp(credential);
        return response;
    }
)


const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        add: (state) => {
            state.count++
        }
    },
    extraReducers: (builder => {
        builder.addCase(signUp.pending, (state, action) => {
            state.status = "fetching"
        })
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.status = "success"
            state.count++
        })
    })
})

export default userSlice.reducer
export const userSelector = (state: RootState) => state.userReducer;
export const { add } = userSlice.actions