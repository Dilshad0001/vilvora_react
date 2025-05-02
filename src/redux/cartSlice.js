import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";


const INITIAL_STATE={
    cartitems:[],
    loading:false,
    error:null

}


const getAllCart=createAsyncThunk("get/cart",async(_,{rejectWithValue})=>{
    
    try {
        const {data}=await axiosInstance.get('/cart/')
        return data
        
    } catch (error) {
        
        return rejectWithValue(
            error.response ? error.response.message : error.message
        )  
    }
})


const cartSlice=createSlice({
    name:"cart",
    initialState:INITIAL_STATE,
    extraReducers:(builder)=>{
        builder.addCase(getAllCart.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(getAllCart.fulfilled,(state,action)=>{
            state.length=false;
            state.cartitems=action.payload
        })
        .addCase(getAllCart.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })

    }
})

export default cartSlice.reducer
export {getAllCart}