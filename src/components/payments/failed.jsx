import { useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/homelayout"
import { VscError } from "react-icons/vsc";

function Failed(){
    const navigate=useNavigate()
    return(
<HomeLayout>
    <div className="min-h-[90vh] flex justify-center items-center">
        <div className="bg-gray-950 h-100 w-80 rounded-xl">
            <div className="w-full text-center text-3xl bg-red-600 p-5 rounded-xl">Payment Failed</div>
            <div className="text-9xl text-red-600 mt-10 ml-23"> <VscError/></div>
            <div className="mt-5 px-3 text-white text-xl text-center">OOPS! <b className=" text-yellow-300">Transaction</b> Failed.</div>  
            
            <div onClick={()=>{
                navigate('/checkout')
            }} className="mt-6 flex justify-center"><button className="bg-gray-900 text-white p-3 rounded-2xl px-3 font-bold">Go Back to Checkout</button></div>
        </div>
    </div>
</HomeLayout>
    )
}
export default Failed