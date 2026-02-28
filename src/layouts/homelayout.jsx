import { FiMenu } from "react-icons/fi";
import { FaBookReader } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import Footer from "../components/footer";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../redux/slice/authslice";

function HomeLayout({ children }) {
  const [open, setOpen] = useState(false);
  const dispatch=useDispatch();
  const isloggedin=useSelector((state)=>state?.auth?.isloggedin);
  const role=useSelector((state)=>state?.auth?.role);
  const navigate=useNavigate();

  async function handlelogout(){
    console.log("enter")
    const action=await dispatch(Logout());
    console.log("after")
    console.log(action)
    if(action.payload.success)navigate('/')
    console.log('after nav')
  }

  return (
    <div className="min-h-[100vh] bg-gray-800">
      
      {/* sidebar */}
      <div
        id="sidebar"
        className={`fixed top-0 left-0 h-[100vh] w-64
        bg-white/10 backdrop-blur-md border border-b-gray-900
        overflow-hidden
        transition-transform duration-1000 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-5 flex justify-between items-center">
          <nav className="text-5xl text-yellow-300 font-bold"><FaBookReader/></nav>

          <AiFillCloseCircle
            size={34}
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </div>
        <ul className="p-10">
            {isloggedin && role=='admin' && <li className="text-xl mt-5 text-black flex justify-center font-bold  hover:text-yellow-300">
                <Link to="/admin/dashboard">Admin Dashboard</Link>
            </li>
            }
            <li className="text-xl mt-5 text-black font-bold flex justify-center hover:text-yellow-300">
                <Link to="/">Home</Link>
            </li>
            <li className="text-xl mt-5 text-black font-bold flex justify-center hover:text-yellow-300">
                <Link to="/courses">Courses</Link>
            </li>
            {isloggedin && role=='admin' && <li className="text-xl mt-5 text-black flex justify-center font-bold  hover:text-yellow-300">
                <Link to="/courses/create">Create Course</Link>
            </li>
            }
            <li className="text-xl mt-5 text-black font-bold flex justify-center hover:text-yellow-300">
                <Link to="/contact">Contact Us</Link>
            </li>
            <li className="text-xl mt-5 text-black font-bold flex justify-center hover:text-yellow-300">
                <Link to="/about">About Us</Link>
            </li>
            {!isloggedin && <li className="flex justify-between mt-50 gap-5 ml-[-25px] sm:ml-[-15px] md:ml-[-15px] lg:ml-[-15px] ">
                <button className="p-3 px-7 sm:px-6 md:px-6 lg:px-6 rounded-3xl text-white font-semibold hover:bg-gray-950 shadow-lg bg-white/10 backdrop-blur-md
            shadow-xl shadow-black/30">
                    <Link to="/login" >Login</Link>
                </button>
                <button className="  p-3 px-7 sm:px-6 md:px-6 lg:px-6 rounded-3xl text-black font-semibold hover:bg-amber-400 hover:text-white shadow-lg bg-amber-200
            shadow-xl shadow-black/30">
                    <Link to="/signup" >SignUp</Link>
                </button>

                </li>}
             {isloggedin && <li className="flex justify-between mt-50 gap-5 ml-[-25px] sm:ml-[-15px] md:ml-[-15px] lg:ml-[-15px] ">
                <button className="p-3 px-7 sm:px-6 md:px-6 lg:px-6 rounded-3xl text-white font-semibold hover:bg-gray-950 shadow-lg bg-white/10 backdrop-blur-md
            shadow-xl shadow-black/30">
                    <Link to="/profile" >profile</Link>
                </button>
                <button className="  p-3 px-7 sm:px-6 md:px-6 lg:px-6 rounded-3xl text-black font-semibold hover:bg-amber-400 hover:text-white shadow-lg bg-amber-200
            shadow-xl shadow-black/30" onClick={()=>handlelogout()}>
                    Logout
                </button>

                </li>}      
            
        </ul>
      </div>

      {/* menu button */}
      {!open && (
        <FiMenu
          size={30}
          className="text-white ml-10 translate-y-8 cursor-pointer"
          onClick={() => setOpen(true)}
        />
      )}

      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default HomeLayout;
