import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../axiosinstance/axiosInstance";
import { useNavigate } from "react-router-dom";
const initialState={
    isloggedin: localStorage.getItem('isloggedin')||false,
    role:localStorage.getItem('role') || "",
    data: localStorage.getItem('data')
}
export const createAccount=createAsyncThunk(
    "auth/register",
    async (data)=>{
        try{
        const res= axiosInstance.post('/user/register',data);
        toast.promise(
        res, 
        {
         loading: "Creating account...",
         success: (data)=>{return data?.data?.message},
         error: (data)=>{return data.response.message},
        }
        
);


      return (await res).data;

        }
        catch(e){
           toast.error(e.message) 
        }
    }
)
export const changepass=createAsyncThunk(
    "change/password",
    async (data)=>{
        try{
        const res= axiosInstance.post('/user/changepassword',data);
        toast.promise(
        res, 
        {
         loading: "Changing Password...",
         success: (data)=>{return data?.data?.message},
         error: (data)=>{return data.response.message},
        }
        
);

      return (await res).data;

        }
        catch(e){
           toast.error(e.message) 
        }
    }
)


export const editdata=createAsyncThunk(
    "auth/edit",
    async (data)=>{
        try{
        const res= axiosInstance.post('/user/update',data);
        toast.promise(
        res, 
        {
         loading: "Updating Details...",
         success: (data)=>{return data?.data?.message},
         error: "erroroccured try aggain",
        }
        
);

      return (await res).data;

        }
        catch(e){
           toast.error(e.message) 
        }
    }
)

export const Login=createAsyncThunk(
    "auth/login",
    async (data)=>{
        try{
        const res= axiosInstance.post('/user/login',data);
        toast.promise(
        res, 
        {
         loading: "Authencating the user...",
         success: (data)=>{return data?.data?.message},
         error: (data)=>{return data.response.message},
        }
        
);

      return (await res).data;

        }
        catch(e){
           toast.error(e?.response?.data?.message) 
        }
    }
)

export const Logout=createAsyncThunk(
    "auth/logout",
    async ()=>{
        try{
        const res= axiosInstance.post('/user/logout');
        toast.promise(
        res, 
        {
         loading: "Logging out User....",
         success: "logout Succesfully",
         error: (await res).data.message,
        }
        
);
      console.log((await res.data))
      return (await res).data;

        }
        catch(e){
           toast.error(e?.response?.data?.message) 
        }
    }
)

export const getuser=createAsyncThunk('user/get',
    async()=>{
        try{
            const res=await axiosInstance.post('/user/aboutme');
        return res.data
        }
        catch(e){
           toast.error(e?.response?.data?.message) 
        }
    }
)

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(Login.fulfilled,(state,action)=>{
            console.log("LOGIN PAYLOAD 👉", action.payload);
            localStorage.setItem("data",JSON.stringify(action?.payload?.person))
            localStorage.setItem('isloggedin',true)
            localStorage.setItem('role',action?.payload?.person?.role)
            state.data=JSON.stringify(action?.payload?.person)
            state.isloggedin=true
            state.role=action?.payload?.person?.role
        })
         .addCase(createAccount.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.person))
            localStorage.setItem('isloggedin',true)
            localStorage.setItem('role',action?.payload?.person?.role)
            state.data=JSON.stringify(action?.payload?.person)
            state.isloggedin=true
            state.role=action?.payload?.person?.role
        })
        .addCase(editdata.fulfilled,(state,action)=>{
           localStorage.setItem("data",JSON.stringify(action?.payload?.people))
           state.data=JSON.stringify(action?.payload?.people)
        })
        .addCase(Logout.fulfilled,(state,action)=>{
            localStorage.clear();
            state.data=""
            state.isloggedin=false
            state.role=""
        })
        .addCase(getuser.fulfilled,(state,action)=>{
             localStorage.setItem("data",JSON.stringify(action?.payload?.people))
            localStorage.setItem('isloggedin',true)
            localStorage.setItem('role',action?.payload?.people?.role)
            state.data=JSON.stringify(action?.payload?.people)
            state.isloggedin=true
            state.role=action?.payload?.people?.role
        })
    }
})

export const {}= authSlice.actions;
export default authSlice.reducer