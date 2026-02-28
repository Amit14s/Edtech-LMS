import { useState } from "react";
import HomeLayout from "../layouts/homelayout";
import toast from "react-hot-toast";
import axiosInstance from "../axiosinstance/axiosInstance";

function ContactUs(){
    const [data,setData]=useState({
        name:"",
        email:"",
        message:""
    })

    function handleinput(e){
       const {name,value}=e.target;
       setData(prev=>({
        ...prev,
        [name]:value
       }))
       console.log(data)
    }

    async function register(e){
        e.preventDefault();
        if(!data.name||!data.email||!data.message){
            toast.error("every filled is required");
            return
        }
        if(!data.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
            toast.error("Enter Valid Email")
            return
        }
        else{
        const action= await axiosInstance.post('/contactUs',data);
        if(action?.data?.success==true){
            toast.success('message sent successfully')
            setData({
                name:"",
                email:"",
                message:""
            })

        }
        else toast.error('error occured');
        }
    }

    return(
        <HomeLayout>
                  <div className="h-screen flex justify-center items-center bg-gray-800 ">
            
<div className="relative h-115 w-90">
  <div
    className="absolute -inset-0 rounded-3xl
               bg-blue-400/70
               blur-xl
               animate-spin-slow">
  </div>

  <div className="relative h-full w-full rounded-3xl border
                  shadow-lg bg-gray-900">
                  <div className="text-center pt-3 text-2xl font-extrabold text-white">Contact Us</div>
                <form>
                  <div className="flex flex-col ml-2 mt-5">
                    <label htmlFor="name" className="mx-6 font-semibold text-white">Name</label>
                  <input onChange={handleinput} className="mx-5 border p-2 px-5 rounded-2xl mt-2 text-white" type="text" placeholder="enter your Name" name="name" value={data.name}/>
                  </div>
                   <div className="flex flex-col ml-2 mt-5">
                    <label htmlFor="email" className="mx-6 font-semibold text-white ">Email</label>
                  <input onChange={handleinput} name="email" className="mx-5 border p-2 px-5 rounded-2xl mt-2 text-white" type="email" placeholder="enter your Email" value={data.email}/>
                  </div>
                   <div className="flex flex-col ml-2 mt-5">
                    <label htmlFor="message" className="mx-6 font-semibold text-white">Message</label>
                    <textarea onChange={handleinput} name="message" id="message" className="mx-5 border rounded-2xl h-20 mt-2 px-3 pt-2 text-white" placeholder="enter your problems" value={data.message}></textarea>
                  </div>
                  <div className="flex justify-center mt-5 "><button onClick={register} className="bg-amber-200 p-2 px-4 text-xl rounded-2xl font-bold hover:bg-amber-300">Send</button></div>
                </form>
            </div>
    </div>
        </div>
        </HomeLayout>
    )
}
export default ContactUs