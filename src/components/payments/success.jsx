import { useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/homelayout"
import { GoCheckCircleFill } from "react-icons/go";

function Success(){
    const navigate=useNavigate()
    return(
<HomeLayout>
    <div className="min-h-[90vh] flex justify-center items-center">
        <div className="bg-gray-950 h-110 w-80 rounded-xl">
            <div className="w-full text-center text-3xl bg-green-500 p-5 rounded-xl">Payment Successful</div>
            <div className="text-9xl text-green-500 mt-10 ml-23"> <GoCheckCircleFill/></div>
            <div className="mt-5 px-3 ml-2 text-white text-xl">Your <b className=" text-yellow-300">subscription</b> is now active.</div>  
            <div className="text-white mt-3 mx-5 text-justify">You can start learning immediately happy studying!</div>
            <div onClick={()=>{
                navigate('/courses')
            }} className="mt-6 flex justify-center"><button className="bg-green-900 text-white p-3 rounded-2xl px-3 font-bold">Go to Courses</button></div>
        </div>
    </div>
</HomeLayout>
    )
}
export default Success