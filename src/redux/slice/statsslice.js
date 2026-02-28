import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosinstance/axiosInstance";

const initialState={
    totaluser:"",
    totalsubscription:""
}

export const getstats=createAsyncThunk('stats',
    async()=>{
        try{
            const res=await axiosInstance.get('/user/stats')
            return res.data;
        }
         catch(e){
         toast.error(e?.response?.data || "Something went wrong");
    }
    }
)

const statsslice=createSlice({
    name:'stats',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
          builder.addCase(getstats.fulfilled,(state,action)=>{
            state.totaluser=action.payload.totaluser
            state.totalsubscription=action.payload.totalsubscription
          })
    }
})

export default statsslice.reducer