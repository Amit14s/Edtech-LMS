
import { useNavigate } from "react-router-dom"
function CourseBox({data}){
   const navigate=useNavigate()
     return(
        <div onClick={()=>{navigate('/courses/description',{state:{...data}})}} className=" overflow-hidden h-130 w-100 bg-gray-900 rounded-3xl m-4 mb-8 hover:translate-y-[-8px] transition-all ease-in-out duration-300 hover:bg-gray-600 shadow-xl/30">
               <img className="h-60 w-full p-2 rounded-3xl" src={data.thumbnail.secure_url} alt="thumbnail" />
               <div className="text-center text-3xl font-bold text-white">{data.title}</div>
               <div className="text-white text-[15px] font-bold pl-4 pt-2 mt-4">Category:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="text-yellow-200 text-[15px] font-semibold ">{data.category}</span></div>
               <div className="text-white text-[15px] font-bold pl-4 pr-4 pt-1 mt-4 overflow-hidden"><div className="flex gap-3 ">Description: <span className="line-clamp-6 leading-[1.25] text-yellow-200  text-[15px] text-sm/4  text-justify translate-y-1 font-semibold">{data.description}</span></div></div>
        <div className="text-white text-[15px] font-bold pl-4 pt-2 mt-4">Instructor:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span className="text-yellow-200 font-semibold ">{data.createdBy}</span></div>

        </div>
     )
}
export default CourseBox