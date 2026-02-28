import back from "../assets/back.png"
import { useNavigate } from "react-router-dom"
function Error(){
    const navigate = useNavigate()
    return(
        <div className="h-screen flex flex-col justify-center items-center bg-gray-900">
            <div className="text-[300px] font-extrabold bg-cover bg-center
                 text-transparent bg-clip-text italic tracking-widest" style={{ backgroundImage: `url(${back})` }}>404</div>
            <div className="text-4xl text-gray-400 tracking-wide font-sans">Oops, Page Not Found! </div>
            <button onClick={()=>navigate(-1)} className="bg-gray-400 p-3 px-5 mt-8 rounded-3xl font-bold hover:bg-yellow-300 ">&lt;- GO BACK </button>
        </div>
    )
}
export default Error