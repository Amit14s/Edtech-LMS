import HomeLayout from "../layouts/homelayout";
import { Link } from "react-router-dom";
import imgk from "../assets/ll.png"
function Home(){
     return(
        <HomeLayout>
          <div className=" flex items-center justify-center h-[90vh]  text-white ">
            <div className="w-1/2 space-y-6">
              <h1 className="text-5xl font-semibold">
                Find out Best&nbsp; 
                <span className="text-yellow-500 font-bold">
                    Online Courses
                </span>
              </h1>
              <p className="text-xll text-gray-200">
                we have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost
              </p>
             <div className="flex gap-20">
              <button className="bg-yellow-300 p-3 px-8 sm:px-6 md:px-6 lg:px-6 rounded-3xl text-black font-semibold hover:bg-yellow-500">
                <Link to='/contact'>Contact Us</Link>
              </button>
              <button className="p-3 px-7 sm:px-3 md:px-3 lg:px-3 rounded-3xl text-white font-semibold hover:bg-gray-950 shadow-lg bg-white/10 backdrop-blur-md
            shadow-xl shadow-black/30 cursor-pointer">
                <Link to='/courses'>Explore Courses</Link>
              </button>
             </div>
            </div>
            <div className="w-1/3">
                <img src={imgk} alt="" />
            </div>
          </div>
        </HomeLayout>
     )
}
export default Home;