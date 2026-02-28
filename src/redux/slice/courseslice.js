import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../axiosinstance/axiosInstance"

const initialState={
    coursedata:[],
}

export const getcourse =createAsyncThunk(
   'course/getcourse',
   async()=>{
    try{
       const res=axiosInstance.get('/course');
       toast.promise(
        res,
        {
            loading:"getting courses",
            success:"all courses are below",
            error:"error occured"
        }
       )
       return (await res).data.courses
    }
    catch(e){
         toast.error(e?.response?.data?.message || "Something went wrong");
    }
   }  
)
export const crCourse=createAsyncThunk(
    '/course/create',
    async(data)=>{
        
        const formData=new FormData();
        formData.append("title", data.title);
formData.append("description", data.description);
formData.append("category", data.category);
formData.append("createdBy", data.createdBy);
formData.append("file", data.file);
      try{
       const res=axiosInstance.post('/course',formData);
       toast.promise(
        res,
        {
            loading:"Creating Course",
            success:(data)=>{return data?.data?.message},
            error:(data)=>{return data?.response?.message}
        }
       )
       return (await res).data;
      }
      catch(e){
         toast.error(e?.response?.data?.message || "Something went wrong");
    }
    }
)

const courseslice= createSlice({
    name:"course",
    initialState,
    reducer:{},
    extraReducers:(builder)=>{
        builder.addCase(getcourse.fulfilled,(state,action)=>{
            state.coursedata=action.payload;
        })
    }
})

export default courseslice.reducer