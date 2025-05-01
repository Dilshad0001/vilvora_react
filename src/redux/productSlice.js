import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { isRejectedWithValue } from "@reduxjs/toolkit"
import axiosInstance from "../axiosInstance"



const INITIAL_STATE={
    products: [],
    nextPage: null,
    previousPage: null,
    loading: false,
    error: null,
}

const getAllProducts=createAsyncThunk("get/products",async(url="/adminproduct/product_view/",{rejectWithValue})=>{
    try {
        const {data}=await axiosInstance.get(url)
        return data
    } catch (error) {
        return rejectWithValue(
            error.response ? error.response.data.message :error.message
        )
        
    }
})


const addProducts = createAsyncThunk("add.products",async (productData, { rejectWithValue }) => {
      try {
        const { data } = await axiosInstance.post("/adminproduct/product_view/",productData,
         {
            headers: {"Content-Type": "multipart/form-data",},
          }
        );
        return data;
      } catch (error) {
        return rejectWithValue(
          error.response ? error.response.data.message : error.message
        );
      }
    }
  );

  const deleteProduct = createAsyncThunk("delete.product", async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/adminproduct/product_view/", { data: { id }});
      return id; 
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
  });
  

const productSlice=createSlice({
    name:'product',
    initialState:INITIAL_STATE,
    extraReducers:(builder)=>{
        builder.addCase(getAllProducts.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(getAllProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.products = action.payload.results;
            state.nextPage = action.payload.next;
            state.previousPage = action.payload.previous;
        })
        .addCase(getAllProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
        .addCase(addProducts.pending,(state,action)=>{
            state.loading=true
        })
        .addCase(addProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.products.unshift(action.payload);
        })
        .addCase(addProducts.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
        .addCase(deleteProduct.pending,(state,action)=>{
            state.loading=true;
        })
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.loading=false;
            state.products=state.products.filter(p=>p.id !=action.payload)
        })
        .addCase(deleteProduct.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
    }
})

export default productSlice.reducer
export {getAllProducts,addProducts,deleteProduct};