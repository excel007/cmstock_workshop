import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import * as serverService from "@/services/serverService";
import httpClient from "@/utils/httpClient";
import { AxiosRequestConfig } from "axios";

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

export const signOut = createAsyncThunk(
    "user/signout",
    async () => {
        await serverService.signOut();
    }
)

export const signUp = createAsyncThunk(
    "user/signup",
    async (credential: SignAction) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const response = await serverService.signUp(credential);
        return response;
    }
)

export const signIn = createAsyncThunk(
    "user/signin",
    async (credential: SignAction) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const response = await serverService.signIn(credential);

        // if not add this statement => state.status will missing => "fetching"
        if (response.result != "ok") {
            throw new Error("Login Failed");
        }

        //set access token
        // httpClient.interceptors.request.use((config?: AxiosRequestConfig | any) => {
        //     if (config && config.headers) {
        //         config.headers["Authorization"] = `Bearer ${response.token}`;
        //     }
        //     return config;
        // });
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
        // for Register
        builder.addCase(signUp.pending, (state, action) => {
            state.status = "fetching"
        })
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.status = "success"
            state.count++
        })
        builder.addCase(signUp.rejected, (state, action) => {
            state.status = "failed"
            state.count++
        })
        // for Login
        builder.addCase(signIn.pending, (state, action) => {
            state.status = "fetching"
        })
        builder.addCase(signIn.fulfilled, (state, action) => {
            state.status = "success"
            state.count++
        })
        builder.addCase(signIn.rejected, (state, action) => {
            state.status = "failed"
            state.count++
        })
        // for sign out
        builder.addCase(signOut.fulfilled, (state, action) => {
            state.status = "success"
            state.count++
        })
    })
})

export default userSlice.reducer
export const userSelector = (state: RootState) => state.userReducer;
export const { add } = userSlice.actions