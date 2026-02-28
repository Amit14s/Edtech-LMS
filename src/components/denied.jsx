import back from "../assets/back.png"
import { FaLock } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
function Denied(){
    const navigate = useNavigate()
    return(
        <div className="h-screen flex flex-col justify-center items-center bg-gray-900">
            <div className="text-[300px] font-extrabold text-yellow-300
                 text-transparent bg-clip-text italic tracking-widest" ><FaLock/></div>
            <div className="text-4xl text-gray-400 tracking-wide font-sans mt-10">Access Denied! </div>
            <button onClick={()=>{
                      navigate("/");
            }} className="bg-gray-400 p-3 px-5 mt-8 rounded-3xl font-bold hover:bg-yellow-300 ">&lt;- GO BACK </button>
        </div>
    )
}
export default Denied