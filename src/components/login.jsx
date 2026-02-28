import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import bgt from "../assets/bgt.jpg";
import bgt2 from "../assets/bgt2.webp"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../redux/slice/authslice";
import { Login } from "../redux/slice/authslice";

function Logint(){
    const [logindata,setLogindata] = useState({
        email:"",
        password:"",
    })
    const dispatch=useDispatch();
    const Navigate=useNavigate()

    function updatedata(e){
        const {name,value}=e.target;
       setLogindata(prev=>({
            ...prev,
            [name]:value
        }))
    }

 async function login(e){
     e.preventDefault();
     if(!logindata.email || !logindata.password) toast.error("every field are required");

  else {

    const action = await dispatch(Login(logindata)
    );
    if(action.payload.success)Navigate('/');

  }
  }

    return(
        <div className="h-screen flex justify-center items-center bg-gray-800 ">
            
       <div className="relative h-105 w-100">
       <div
      className="absolute -inset-0 rounded-3xl
               bg-blue-400/70
               blur-xl
               animate-spin-slow">
  </div>

  <div className="relative h-full w-full rounded-3xl border
                  shadow-lg bg-gray-900">
                    <div className="text-3xl font-bold text-white text-center p-5">Login</div>
                <form >
                    <div className="flex flex-col mt-8 ml-6 mr-6">                                 <label className="mb-2 text-white font-semibold ml-2" htmlFor="email">Email</label>
                    <input name="email" onChange={updatedata} className="border border-2  rounded-2xl py-2 px-5 text-white" type="mail" placeholder="Enter Your Email" />
                    </div>

                     <div className="flex flex-col mt-5 ml-6 mr-6">                                 <label className="mb-2 font-semibold text-white ml-2 " htmlFor="password">Password</label>
                    <input name="password" onChange={updatedata} className="border border-2  rounded-2xl py-2 px-5 text-white" type="password" placeholder="Enter Password" />
                    </div>

                    <div>
                        <label onClick={login} className="flex justify-center mt-4" htmlFor="submit"><button className="bg-gray-800 mt-4 p-3 rounded-2xl font-bold text-white px-4 hover:bg-amber-400 hover:text-black">Login</button></label>
                        <input type="submit" id="submit" className="hidden"/>
                    </div>
                    <div className="text-center mt-3"> Don't Have Account? <Link to="/signup" className="text-purple-700 font-bold">Signup</Link> </div>
                </form>
            </div>
    </div>
        </div>

    )
}
export default Logint