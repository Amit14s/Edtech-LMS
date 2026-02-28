import HomeLayout from "../layouts/homelayout";
import tree from "../assets/tree.png"

function Aboutus(){
     return(
      <HomeLayout>
        <div className="min-h-[91vh] ">
            <div className="text-5xl font-bold text-yellow-400 ml-35 pt-10">About Us</div>
           <div className="flex">
             <div className="text-2xl text-white text-justify ml-35 w-1/2 mt-10 ">This platform was created with students in mind — to solve common problems like scattered resources, unclear progress, and lack of structured learning.

                 We believe learning should be organized, flexible, and focused on understanding, not just marks or certificates. Our LMS helps learners track progress, revise concepts, and grow step-by-step with confidence.

                 Whether you are learning for exams, skills, or self-improvement, this platform is designed to support your journey.</div>

                <div className="hidden md:block lg:mt-[-30px]">
                    <img src={tree} alt="education tree" />
                </div>
           </div>
           

        </div>
      </HomeLayout>
     )
}
export default Aboutus;