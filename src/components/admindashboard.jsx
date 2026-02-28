import HomeLayout from "../layouts/homelayout";
import { getstats } from "../redux/slice/statsslice";
import { getcourse } from "../redux/slice/courseslice";
import { allpayments } from "../redux/slice/paymentslice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
function Admin(){
    const dispatch=useDispatch()
   const {totaluser,totalsubscription}=useSelector((state)=>state.stats)
    
   const {coursedata} = useSelector((state)=>state.course);
   const {payments}=useSelector((state)=>state.payment);
   async function loaddata(){
          await dispatch(getcourse());
          await dispatch(allpayments())
          await dispatch(getstats())
   }
   useEffect(
    ()=>{
        loaddata();
    },[]
   )
    console.log(totalsubscription,totaluser)
        console.log(coursedata)
        console.log(payments)
    return(
        <HomeLayout>
          <div className="min-h-screen"></div>
        </HomeLayout>
    )
}
export default Admin