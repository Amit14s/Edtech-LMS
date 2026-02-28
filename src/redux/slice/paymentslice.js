import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import reducer from "./courseslice";
import axiosInstance from "../../axiosinstance/axiosInstance";
import toast from "react-hot-toast";
const initialState={
    key:"",
    subscription_id:"",
    isverified:false,
    payments:[]
}

export const getkey=createAsyncThunk('payment/key',
    async()=>{
       try{
         const res=await axiosInstance.get('/payment/apikey');
        return res.data
       }
       catch(e){
         toast.error(e?.response?.data?.message || "Something went wrong");
       }
    }
);
export const buysubscription=createAsyncThunk('payment/buy',
    async()=>{
        try{
        const res=await axiosInstance.post('/payment/subscription');
        return res.data;
        }
         catch(e){
         toast.error(e?.response?.data?.message || "Something went wrong");
       }
    }
)
export const verify=createAsyncThunk('payment/verify',
    async(data)=>{
       try{
         const res= axiosInstance.post('/payment/verify',data);
          toast.promise(
      res,
      {
        loading:'veryfing .....',
        success:'verified',
        error:"verification failed"
      }
     );
     return (await res).data;
       }
       catch(e){
         toast.error(e?.response?.data?.message || "Something went wrong");
       }
    }
)
export const unsubscribe=createAsyncThunk('payment/cancel',
  async()=>{
    try{
      const res=axiosInstance.post('/payment/cancel');
      toast.promise(res,{
        loading:"unsubscribing....",
        success:'subscription Cancelled successfully',
        error:'something went wrong'
      })
      return (await res).data
    }
    catch(e){
         toast.error(e?.response?.data?.message || "Something went wrong");
       }
  }
)
export const allpayments=createAsyncThunk('/payment/all',
  async()=>{
    try{
     const res= axiosInstance.post('/payment/all?count=100');
     toast.promise(
      res,
      {
        loading:'getting all payments',
        success:'fetched all Payments',
        error:"something went wrong"
      }
     );
     return (await res).data;
    }
     catch(e){
         toast.error(e?.response?.data?.message || "Something went wrong");
       }
  }
)

const paymentslice=createSlice(
    {
      name:'payment',
    initialState,
    reducer:{},
    extraReducers:(builder)=>{
         builder.addCase(getkey.fulfilled ,(state,action)=>{
             state.key=action?.payload?.key;
         })
         .addCase(buysubscription.fulfilled,(state,action)=>{
            state.subscription_id=action?.payload?.subscription?.id;
         })
         .addCase(verify.fulfilled,(state,action)=>{
          console.log('verification action -> '+action)
            state.isverified=action?.payload?.success
         })
         .addCase(allpayments.fulfilled,(state,action)=>{
             state.payments=action?.payload?.payments
         })
         .addCase(unsubscribe.fulfilled,(state,action)=>{
           state.isverified=false;
         })
    }
    }
)

export default paymentslice.reducer