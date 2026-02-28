import { useDispatch, useSelector } from "react-redux"
import HomeLayout from "../../layouts/homelayout"
import { useEffect } from "react"
import { getkey } from "../../redux/slice/paymentslice";
import { buysubscription } from "../../redux/slice/paymentslice";
import { verify } from "../../redux/slice/paymentslice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getuser } from "../../redux/slice/authslice";
function Checkout(){
    const navigate=useNavigate()
    const {data}=useSelector(state=>state.auth);
    const key=useSelector(state=>state.payment.key);
    const subscription_id=useSelector(state=>state.payment.subscription_id);
    const isverified= useSelector(state=>state.payment.isverified);
    const dispatch=useDispatch();
    async function load(){
       const action =await dispatch(getkey());
       const action2=await dispatch(buysubscription());
    }
    useEffect(()=>{
        load()
    },[])

    function handlesubs(){
        if(!key||!subscription_id){
            toast.error('something went wrong');
            return;
        }
       const options={
           key:key,
           subscription_id:subscription_id,
           name:data.name,
          description: "Subscription Payment",
          handler: async function(response){
           const payment = {
         payment_id: response.razorpay_payment_id,
         subscription_id: response.razorpay_subscription_id,
         signature: response.razorpay_signature,
     };
            const actiont= await dispatch(verify(payment));
             if (actiont.payload?.success) {
                const act=dispatch(getuser())
              toast.success("Subscription successful");
              navigate("/payment/success");
        } else {
          toast.error("Payment verification failed");
          navigate("/payment/failed");
        }
          }
        }
        const res=new window.Razorpay(options);
        res.open();
    }
    
    return(
        <HomeLayout>
            <div className="min-h-[90vh] flex justify-center items-center ">
                <div className="bg-gray-950 h-120 w-100 rounded-3xl">
                    <div className="text-3xl font-extrabold text-white text-center mt-10">Premium Subscription</div>
                    <div className="mt-5 text-xl text-yellow-200 mx-5 text-justify">Get full access to all courses, learning resources, and future updates.
                        Learn at your own pace with unlimited access.</div>
                    <div className=" ml-20 text-white mt-5">
                        <ul className="list-disc list-inside text-white space-y-2">
                            <li>Unlimited access to all courses </li>
                            <li>Learn anytime, anywhere</li>
                            <li> New content added regularly</li>
                            <li>Cancel anytime</li>
                            <li>Instant access after payment</li>
                        </ul>
                    </div>
                    <div className=" mt-10 flex justify-center"><button onClick={handlesubs} className="bg-amber-200 p-3 px-6 rounded-2xl font-bold hover:bg-amber-300">Subscribe <b className="text-green-500">Now</b></button></div>
                </div>
            </div>
        </HomeLayout>
    )
}
export default Checkout