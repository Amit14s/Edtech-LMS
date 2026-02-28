import { useSelector } from "react-redux";
import HomeLayout from "../../layouts/homelayout"
import { useLocation, useNavigate } from "react-router-dom"
function Descrip(){
    const {state}=useLocation();
    const {role,data}=useSelector(state=>state.auth);
    
    const datac=JSON.parse(data)
    const navigate=useNavigate()
    const id=state._id;
    
    return(
      <HomeLayout>
        <div className="min-h-[90vh] ml-2 pt-10 flex flex-col items-center justify-center ">
            <div className="flex flex-col justify-center items-center">
                <img src={state.thumbnail.secure_url} alt="thumbnail" className="h-70 w-120 rounded-3xl shadow-2xl/60" />
                <div className="text-center mt-5 text-3xl font-extrabold text-white">{state.title}</div>
                <div className="text-xl mt-4 font-bold text-white">Total Lectures : {state.numberofLectures}</div>
                <div className="text-xl mt-4 font-bold text-white">Instructor : {state.createdBy}</div>
                <div className="text-xl mt-4 font-bold text-white">Cateogry : {state.
category}</div>
                <div className="text-xl mt-4 font-bold text-black text-center  ">{state.description}</div>
                
            <div className="mt-5">
                { (role=='admin')||(datac.subscription.status=='active')?<button onClick={()=>{navigate('/lectures',{state:{id
                    
                }})}} className="text-2xl font-bold text-yellow-300 bg-gray-950 p-2 px-6 rounded-2xl hover:bg-black">Watch Lectures</button>:<button onClick={()=>{
                    navigate('/checkout')
                }} className="text-2xl font-bold text-yellow-300 bg-gray-950 p-2 px-6 rounded-2xl hover:bg-black">Subscribe</button>}
            </div>
            </div>
        </div>
      </HomeLayout>
    )
}
export default Descrip