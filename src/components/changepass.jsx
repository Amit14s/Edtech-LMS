import { useState } from "react"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { changepass } from "../redux/slice/authslice";
import { useNavigate } from "react-router-dom";


function ChangePass(){
const [data,setdata]=useState({
 oldpass:"",
 newpass:""
})
const dispatch=useDispatch();
const navigate=useNavigate();
function updatedata(e){
     const {name,value}=e.target;
     setdata(prev=>({
        ...prev,
        [name]:value
     }))
}
async function change(e){
     e.preventDefault();
     if(!data.newpass||!data.oldpass) toast.error("every field is required");
     const action = await dispatch(changepass(data));
     if(action.payload.success)navigate("/profile")
}
    return(
        <div className="h-screen flex justify-center items-center bg-gray-800 ">
            
       <div className="relative h-80 w-100">
       <div
      className="absolute -inset-0 rounded-3xl
               bg-blue-400/70
               blur-xl
               animate-spin-slow">
  </div>

  <div className="relative h-full w-full rounded-3xl border
                  shadow-lg bg-gray-900">
                <form >
                    <div className="flex flex-col mt-8 ml-6 mr-6">                                 <label className="mb-2 text-white font-semibold ml-2" htmlFor="email">Old Password</label>
                    <input name="oldpass" onChange={updatedata} className="border border-2  rounded-2xl py-2 px-5 text-white" type="mail" placeholder="Enter Your Email" />
                    </div>

                     <div className="flex flex-col mt-5 ml-6 mr-6">                                 <label className="mb-2 font-semibold text-white ml-2 " htmlFor="password">New Password</label>
                    <input name="newpass" onChange={updatedata} className="border border-2  rounded-2xl py-2 px-5 text-white" type="password" placeholder="Enter Password" />
                    </div>

                    <div>
                        <label onClick={change} className="flex justify-center mt-4" htmlFor="submit"><button className="bg-gray-800 mt-4 p-3 rounded-2xl font-bold text-white px-4 hover:bg-amber-400 hover:text-black">Change Password</button></label>
                        <input type="submit" id="submit" className="hidden"/>
                    </div>
                </form>
            </div>
    </div>
        </div>

    )
}



export default ChangePass