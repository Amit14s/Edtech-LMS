import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosinstance/axiosInstance";
import toast from "react-hot-toast";
const initialState={
    lecturest:[]
}

export const addlecture=createAsyncThunk('curse/lecture/create',
    async(data)=>{
        try{
            console.log(data)
            const res=axiosInstance.post(`/course/${data.courseid}/lectures`,data);
        toast.promise(res,{
            loading:"adding lecture",
            success:"lecture added successfully",
            error:'failed to add lecture'
        })
        return (await res).data
        }
         catch(e){
         toast.error(e?.response?.data?.message || "Something went wrong");
    }
    }
)
export const getlectures=createAsyncThunk('COURSE/LECTURES',
    async(data)=>{
        try{
            console.log(data)
        const res=axiosInstance.get(`/course/lectures?courseid=${data.id}`);
         toast.promise(res,{
            loading:"getting lecture",
            success:"lecture loaded successfully",
            error:'failed to get lecture'
        })
        return (await res).data
        }
         catch(e){
         toast.error(e?.response?.data?.message || "Something went wrong");
    }
    }
    
)
export const deletelecture=createAsyncThunk('lecture/delete',
    async(data)=>{
        try{
            console.log(data)
        const res=axiosInstance.delete('/course/lectures',{
   data: {
      courseid: data.courseid,
      lectid: data.lectid
   }
});
        toast.promise(res,{
            success:"lecture deleted successfully",
            loading:"deleting lecture",
            error:"problem while deleting lecture"
        })
        return (await res).data;
        }
           catch(e){
            console.log("FULL ERROR:", e.response);
         toast.error(e?.response?.data?.message || "Something wnt wrong");
    }
    }
)
const lecturslice=createSlice({
    name:"lecture",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(addlecture.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.lecturest=action.payload.lectures
        })
        .addCase(getlectures.fulfilled,(state,action)=>{
             state.lecturest=action.payload.lectures
        })
        .addCase(deletelecture.fulfilled,(state,action)=>{
            state.lecturest=action.payload.lectures
        })
    }
})

export default lecturslice.reducer