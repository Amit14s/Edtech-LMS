import { useDispatch } from "react-redux"
import HomeLayout from "../../layouts/homelayout"
import { useState } from "react";
import toast from "react-hot-toast";
import { crCourse } from "../../redux/slice/courseslice";
import { useNavigate } from "react-router-dom";

function Create(){
     const dispatch=useDispatch();
     const navigate=useNavigate()
     const [data,setdata]=useState({
        title:"",
        description:"",
        category:"",
        createdBy:"",
        file:null,
        preimg:""
     })

     function handleImage(e){
        e.preventDefault();
        const imag=e.target.files[0];
        if(imag){
            const filereader=new FileReader();
           filereader.readAsDataURL(imag);
           filereader.addEventListener('load',function(){
                 setdata(prev=>({
                    ...prev,
                    file:imag,
                    preimg:this.result
                 }))
           })
        }
     }
     function handleinput(e){
            e.preventDefault();
            const {name,value}=e.target;
            setdata(prev=>({
                ...prev,
                [name]:value
            }))
     }

    async function createCourse(e){
         e.preventDefault();
         if(!data.title||!data.createdBy||!data.category||!data.description||!data.file) toast.error('every filled is required')
        else{
        const action=await dispatch(crCourse(data));
        if(action.payload.success){
             navigate('/courses');
        }
        }
     }


    return(
        <HomeLayout>
            <div className="min-h-[100vh] flex items-center justify-center">
             <div className="relative h-110 w-160">
  <div
    className="absolute -inset-0 rounded-3xl
               bg-blue-400/70
               blur-xl
               animate-spin-slow">
  </div>

  <div className="relative h-full w-full rounded-3xl border
                  shadow-lg bg-gray-900 ">
          
          <form className="flex">
            <div className="w-[60%]">
                 <div className="h-60 mt-5 ml-2 flex flex-col">
                    <label htmlFor="thumbnail" className=" w-full rounded-3xl border flex justify-center items-center h-full text-white font-bold ">{data.preimg!=''?
                     <img src={data.preimg} alt="thumbnail" className="h-full rounded-3xl" /> : <div>Drop Your Course Thumbnail</div>
                }</label>
                    <input onChange={handleImage} type="file" id="thumbnail" name="thumbnail" className="hidden" />
                 </div>
                 <div className="mt-5 ml-2">
                    <label htmlFor="title" className="text-white font-bold text-xl flex ml-4">Title</label>
                    <input name="title" onChange={handleinput} type="text" className="p-2 px-4 rounded-2xl border text-white ml-4 w-70 mt-3" placeholder="Enter Course Title" />
                 </div>
            </div>
            <div>
              <div className="flec flex-col mt-5 ml-5">
                <label htmlFor="category" className="text-white font-bold text-[18px]">Category</label>
                <input name="category" onChange={handleinput} type="text" className="border p-2 px-3 rounded-2xl text-white mt-3 w-65" placeholder="Enter Course Cateogry" />
              </div>
            
             <div className="flec flex-col mt-5 ml-5">
                <label htmlFor="createdBy" className="text-white font-bold text-[18px]">Created By</label>
                <input name="createdBy" onChange={handleinput} type="text" className="border p-2 px-3 rounded-2xl text-white mt-3 w-65" placeholder="Created By" />
              </div>

              <div className="flec flex-col mt-5 ml-5">
                <label htmlFor="description" className="text-white font-bold text-[18px]">Description</label>
                <textarea name="description" onChange={handleinput} id="description" className="border p-2 px-3 rounded-2xl text-white mt-3 w-65 h-25" placeholder="Course Description"></textarea>
              </div>

            </div>
          </form>

           <div className=" text-white flex justify-center mt-5"><button onClick={createCourse} className=" bg-black text-2xl p-2 px-6 rounded-2xl">Create Course</button></div>
            </div>
            </div>
            </div>
        </HomeLayout>
    )
}
export default Create