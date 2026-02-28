import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../layouts/homelayout"
import { FaUserCircle } from "react-icons/fa";
import bgt from "../assets/bgt.jpg"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosinstance/axiosInstance";
import { useEffect } from "react";
import { useState } from "react";
import { getuser } from "../redux/slice/authslice";
import Swal from "sweetalert2";
import { unsubscribe } from "../redux/slice/paymentslice";
import { changepass } from "../redux/slice/authslice";
 function Profile(){
  const dispatch=useDispatch()
    let {data}=useSelector(state=>state.auth)
    let datac=JSON.parse(data) 

    const navigate=useNavigate()
    
    
const unsubscribek = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won’t be able to undo this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, I want to unsubscribe",
    cancelButtonText: "Unsubscribe",
  });

  if (result.isConfirmed) {
      const actiont = await dispatch(unsubscribe());
      if(actiont?.payload?.success){
        const k= await dispatch(getuser());
        const {data}=useSelector(state=>state.auth)
        datac=JSON.parse(data) 
      }
  }
};

    if (!datac) {
    return (
      <HomeLayout>
        <div className="min-h-[90vh] flex justify-center items-center text-white text-2xl">
          Loading profile...
        </div>
      </HomeLayout>
    );
  }

       return(
        <HomeLayout>
            <div className="min-h-[100vh] flex justify-center items-center">
                 <div className="bg-gray-900 h-150 w-120 flex-col rounded-3xl shadow-2xl/70">
                   <div className="h-60 w-full text-[267px] mt-5 flex items-center text-white justify-center"><div className="w-60 h-60">{(datac?.profilepic)?<img src={datac.profilepic} alt="pic" className="rounded-full h-full w-full" />:<FaUserCircle/>}</div></div>
                     
                 <div className="text-center mt-10 text-3xl text-white font-bold">Name: <span className="ml-2 text-yellow-200">{ datac?.name} </span></div>
                 <div className="text-center mt-5 text-3xl text-white font-bold">Email: <span className="ml-2 text-yellow-200">{datac?.email}</span></div>
                 <div className="text-center mt-5 text-3xl text-white font-bold">Role: <span className="ml-2 text-yellow-200">{datac?.role}</span></div>
                 <div className="text-center mt-5 text-3xl text-white font-bold">Subscription: <span className="ml-2 text-yellow-200">{(datac.subscription.status)}</span></div>
                   
                 <div className="flex mt-5 justify-center gap-30">
                    <button onClick={()=>{navigate('/password/change')}} className="text-xl font-bold text-black p-2 px-5 bg-yellow-300 rounded-2xl hover:bg-gray-950 hover:text-white">Change Password</button>
                    <button onClick={()=>{navigate('/profile/edit')}} className="text-xl font-bold text-black p-2 px-5 bg-yellow-300 rounded-2xl hover:bg-gray-950 hover:text-white" >Edit profile</button>
                 </div>
                 <div className="mt-5 flex justify-center items-center"> {(datac.subscription.status)=='active'?<button onClick={unsubscribek} className="text-3xl text-white font-bold bg-gray-950 rounded-2xl p-2 hover:text-red-600">Cancel Subscription</button>:<button></button>}</div>
                 </div>
            </div>
        </HomeLayout>
       )
}

export default Profile