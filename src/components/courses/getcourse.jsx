import HomeLayout from "../../layouts/homelayout"
import { useDispatch,useSelector } from "react-redux";
import CourseBox from "./coursebox";
import { getcourse } from "../../redux/slice/courseslice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
function Getcourse(){
   const dispatch=useDispatch();
   const {coursedata} = useSelector((state)=>state.course);
   const {isloggedin,role}=useSelector(state=>state.auth);
   async function loadCourse(){
    const res = await dispatch(getcourse());
   }

   useEffect(()=>{
      loadCourse();
      console.log(coursedata)
   },[])

   

   return(
    <HomeLayout>
      <div className="min-h-screen pl-10 flex flex-col">
         <div className="text-6xl text-yellow-500 font-bold text-center pt-5">All Course</div><br/>
         <div className="flex flex-wrap justify-center">
              {coursedata?.map((c)=><CourseBox key={c.id} data={c} />)}
         </div>
          {isloggedin && role=='admin' && <button className="text-xl mt-5 text-black flex justify-center font-bold  hover:text-yellow-300">
                         <Link to="/courses/create" className="bg-gray-950 text-white p-2 p-4 rounded-2xl hover:bg-yellow-300 hover:text-black">Create Courses</Link>
                     </button>}
      </div>
    </HomeLayout>
   )
}
export default Getcourse;