import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

const INITIAL_STATE={
        users: [],
        nextPage: null,
        previousPage: null,
        loading: false,
        error: null
      }
      


const getAllUser=createAsyncThunk("get/users",async (url = '/users/', { rejectWithValue })=>{
    console.log("uuujju");
    
    try {
        const {data}=await axiosInstance.get(url)
        console.log("data",data);
        
        return data
    } catch (error) {        
        return rejectWithValue(
            error.response ? error.response.data.message :error.message
        )
    }
})



const userSlice=createSlice({
    name:"user",
    initialState:INITIAL_STATE,
    extraReducers:(builder)=>{
        builder.addCase(getAllUser.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(getAllUser.fulfilled,(state,action)=>{
            
            state.users = action.payload.results;
            state.nextPage = action.payload.next;
            state.previousPage = action.payload.previous;
        }).addCase(getAllUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload.results
        })
    }
})


export default userSlice.reducer
export {getAllUser}