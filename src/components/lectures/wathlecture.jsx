import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../layouts/homelayout";
import { useLocation, useNavigate } from "react-router-dom";
import { getlectures } from "../../redux/slice/lectureslice";
import { useEffect, useState } from "react";
import { deletelecture } from "../../redux/slice/lectureslice";
function WatchLecture(){
    const {lecturest}=useSelector((state)=>state.lecture)
    const {role}=useSelector((state)=>state.auth)
    const navigate=useNavigate()
    const {state}=useLocation();
    const id=state.id
    const dispatch=useDispatch();
    const [data,setdata]=useState([])
    const [lect,setLect]=useState({
        description:"",
        title:"",
        video:"",
        id:""
    })
    
    
    async function load(){
           const action=await dispatch(getlectures(state));
           if(action?.payload?.success){
              setdata(action.payload.lectures);
           }
           console.log('ok');
    }
    useEffect(
        ()=>{
         load()
        },[] )
    useEffect(() => {
    if (data.length > 0) {
        setLect({
            description: data[0].description,
            title: data[0].title,
            video: data[0].lecture.videoUrl,
            id:data[0]._id
        });
    }
}, [data]);
   function handledata(d){
     setLect({
            description:d.description,
            title: d.title,
            video: d.lecture.videoUrl,
            id:d._id
        });
   }
  async function handledelete(d){
    const dc={
        courseid:id,
        lectid:d._id
    }
     const action=await dispatch(deletelecture(dc));
           if(action?.payload?.success){
              setdata(action.payload.lectures);
           }
   }
    return(
        <HomeLayout>
            <div className=" flex flex-col lg:flex-row ml-0 lg:ml-20 min-h-[100vh]">
                <div className="w-full lg:w-[50%] flex flex-col items-center justify-center p-4">
                  <video src={lect.video} controls controlsList="nodownload"
  disablePictureInPicture className="border-2 rounded-2xl"></video>
                  <div className="text-3xl font-extrabold text-center mt-5 text-white">{lect.title}</div>
                  <div className="text-2xl text-justify text-white mt-4">{lect.description}</div>
                </div>
                <div className="flex justify-center items-center w-full lg:w-[50%] p-4">
                   <div className="w-full lg:w-[70%] bg-gray-900 rounded-2xl shadow-lg overflow-y-auto max-h-[500px]">
                    <div className="text-lg font-semibold text-white px-4 py-3 border-b border-gray-700">
  More Lectures
</div>
                      {(role=='admin')? <div onClick={()=>{ navigate('/addlecture',{state:{id}})}} className="cursor-pointer top-3 right-2 font-bold rounded-2xl px-3 py-1 absolute bg-green-300">Add Lecture</div>:1}
                       <ul>
                        {data.map((d) => (
                                <li
  key={d._id}
  onClick={() => handledata(d)}
  className={`flex gap-3 p-3 cursor-pointer transition-all duration-200 
  hover:bg-gray-800 rounded-xl
  ${lect.id === d._id ? "bg-gray-800 border-l-4 border-red-500" : ""}`}
>
  {/* Thumbnail */}
  <video
    src={d.lecture.videoUrl}
    className="w-[120px] h-[70px] object-cover rounded-lg"
  />

  {/* Text Content */}
  <div className="flex flex-col justify-center text-white">
    <div className="font-semibold text-sm md:text-base line-clamp-2">
      {d.title}
    </div>
    <div className="text-gray-400 text-xs mt-1 line-clamp-2">
      {d.description}
    </div>
  </div>

  {/* Delete Button */}
  {role === "admin" && (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handledelete(d);
      }}
      className="ml-auto bg-red-600 text-white px-2 py-1 text-xs rounded-lg hover:bg-red-700"
    >
      Delete
    </button>
  )}
</li>
                                ))}

                       </ul>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}
export default WatchLecture