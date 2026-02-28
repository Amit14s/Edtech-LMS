import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { editdata } from "../redux/slice/authslice";
import { FaUserCircle } from "react-icons/fa";
import { getuser } from "../redux/slice/authslice";
function EditProfile(){
    const {data}=useSelector(state=>state.auth);
    const  userdata=JSON.parse(data)
     const [aimage,setaImage]=useState(userdata.profilepic);
    const [updata,setupdata] = useState({
        name:userdata.name,
        email:userdata.email,
        profilepic:null
    })
    const dispatch=useDispatch();
    const Navigate=useNavigate()

    function updatedata(e){
        const {name,value}=e.target;
        setupdata(prev=>({
            ...prev,
            [name]:value
        }))
    }

 async function createaccount(e){
     e.preventDefault();

    if(!updata.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) toast.error("Enter Valid Email")
  else {

    const action = await dispatch( editdata((() => {
      const formData = new FormData();
      formData.append("name", updata.name);
      formData.append("email", updata.email);
      updata.profilepic?formData.append("profilepic", updata.profilepic):1;
      return formData;
    })()));
    if(action.payload.success){
     const k=await dispatch(getuser());
     Navigate('/profile')
    };

  }
  }

 function handleImage(e) {
    
  const files = e.target.files[0];
  if (!files) return;
  setupdata(prev => ({
    ...prev,
    profilepic: files, 
  }));

  const reader = new FileReader();

  reader.onload = () => {
    setaImage(reader.result); // ✅ correct
  };

  reader.readAsDataURL(files);
}
    return(
        <div className="h-screen flex justify-center items-center bg-gray-800 ">
            
<div className="relative h-110 w-100">
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
                    <input type="file" name="file" id="avtar" className="hidden" onChange={handleImage}/>

                    <div className="flex flex-col mt-7 ml-6 mr-6">                                 <label className=" text-white mb-2 font-semibold ml-2" htmlFor="fullname">Full Name</label>
                    <input value={updata.name} name="name" onChange={updatedata} className="border border-2  rounded-2xl py-2 px-5 text-white " type="text" placeholder="Enter Your Name" />
                    </div>
                    <div className="flex flex-col mt-3 ml-6 mr-6">                                 <label className="mb-2 text-white font-semibold ml-2" htmlFor="email">Email</label>
                    <input value={updata.email} name="email" onChange={updatedata} className="border border-2  rounded-2xl py-2 px-5 text-white" type="mail" placeholder="Enter Your Email" />
                    </div>

                    <div className="mt-5">
                        <label onClick={createaccount} className="flex justify-center" htmlFor="submit"><button className="bg-gray-800 mt-4 p-3 rounded-2xl font-bold text-white px-4 hover:bg-amber-400 hover:text-black">Edit Details</button></label>
                        <input type="submit" id="submit" className="hidden"/>
                    </div>
                </form>
            </div>
    </div>
        </div>

    )
}
export default EditProfile