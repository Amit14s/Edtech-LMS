import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import bgt from "../assets/bgt.jpg";
import bgt2 from "../assets/bgt2.webp"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../redux/slice/authslice";

function Signup(){
    const [aimage,setaImage]=useState("");
    const [signupdata,setSignupdata] = useState({
        name:"",
        email:"",
        password:"",
        file:null
    })
    const dispatch=useDispatch();
    const Navigate=useNavigate()

    function updatedata(e){
        const {name,value}=e.target;
        setSignupdata(prev=>({
            ...prev,
            [name]:value
        }))
    }

 async function createaccount(e){
     e.preventDefault();
     if(!signupdata.file || !signupdata.name || !signupdata.email || !signupdata.password) toast.error("every field are required");

    else if(!signupdata.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) toast.error("Enter Valid Email")
    else if(!signupdata.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-+.])(?=.{8,})/
     ))toast.error("Password should contail Atleast one Uppercase,One Lowercase ,one Special character and one Number")
  else {

    const action = await dispatch( createAccount(
    (() => {
      const formData = new FormData();
      formData.append("name", signupdata.name);
      formData.append("email", signupdata.email);
      formData.append("password", signupdata.password);
      formData.append("file", signupdata.file);
      return formData;
    })()
  ));
    if(action.payload.success)Navigate('/');

  }
  }

 function handleImage(e) {
    
  const file = e.target.files[0];
  if (!file) return;
  setSignupdata(prev => ({
    ...prev,
    file: file, 
  }));

  const reader = new FileReader();

  reader.onload = () => {
    setaImage(reader.result); // ✅ correct
  };

  reader.readAsDataURL(file);
}
    return(
        <div className="h-screen flex justify-center items-center bg-gray-800 ">
            
<div className="relative h-135 w-100">
  <div
    className="absolute -inset-0 rounded-3xl
               bg-blue-400/70
               blur-xl
               animate-spin-slow">
  </div>

  <div className="relative h-full w-full rounded-3xl border
                  shadow-lg bg-gray-900">
                <form >
                    <label className="flex justify-center mt-6 text-white" htmlFor="avtar">{aimage?<img className="rounded-full h-30 w-30" src={aimage} alt="" />:<FaUserCircle size={"120px"} />}</label>
                    <input type="file" name="avtar" id="avtar" className="hidden" onChange={handleImage}/>

                    <div className="flex flex-col mt-7 ml-6 mr-6">                                 <label className=" text-white mb-2 font-semibold ml-2" htmlFor="fullname">Full Name</label>
                    <input name="name" onChange={updatedata} className="border border-2  rounded-2xl py-2 px-5 text-white " type="text" placeholder="Enter Your Name" />
                    </div>
                    <div className="flex flex-col mt-3 ml-6 mr-6">                                 <label className="mb-2 text-white font-semibold ml-2" htmlFor="email">Email</label>
                    <input name="email" onChange={updatedata} className="border border-2  rounded-2xl py-2 px-5 text-white" type="mail" placeholder="Enter Your Email" />
                    </div>

                     <div className="flex flex-col mt-3 ml-6 mr-6">                                 <label className="mb-2 font-semibold text-white ml-2 " htmlFor="password">Password</label>
                    <input name="password" onChange={updatedata} className="border border-2  rounded-2xl py-2 px-5 text-white" type="password" placeholder="Enter Password" />
                    </div>

                    <div>
                        <label onClick={createaccount} className="flex justify-center" htmlFor="submit"><button className="bg-gray-800 mt-4 p-3 rounded-2xl font-bold text-white px-4 hover:bg-amber-400 hover:text-black">Create Account</button></label>
                        <input type="submit" id="submit" className="hidden"/>
                    </div>
                    <div className="text-center mt-3"> Already Have Account? <Link to="/login" className="text-purple-700 font-bold">Login</Link> </div>
                </form>
            </div>
    </div>
        </div>

    )
}
export default Signup