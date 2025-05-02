import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";


const INITIAL_STATE={
    orders:[],
    loading:false,
    error:null
}

const getAllOrder=createAsyncThunk("get/order",async(_,{rejectWithValue})=>{
    try {
        const {data}=await axiosInstance.get('/adminorder/')
        return data
        
    } catch (error) {
        return rejectWithValue(
            error.response ? error.response.message : error.message
        )  
    }
})



const orderSlice=createSlice({
    name:"order",
    initialState:INITIAL_STATE,
    extraReducers:(builder)=>{
        builder.addCase(getAllOrder.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(getAllOrder.fulfilled,(state,action)=>{
            state.loading=false;
            state.orders=action.payload;
        })
        .addCase(getAllOrder.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})


export default orderSlice.reducer
export {getAllOrder}