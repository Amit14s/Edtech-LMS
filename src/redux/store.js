import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authslice"
import courseReducer from './slice/courseslice'
import paymentReducer from './slice/paymentslice'
import lectureReducer from './slice/lectureslice'
import statsReducer from './slice/statsslice'
const store=configureStore({
    reducer:{
       auth:authReducer,
       course:courseReducer,
       payment:paymentReducer,
       lecture:lectureReducer,
       stats:statsReducer 
    }
})
export default store