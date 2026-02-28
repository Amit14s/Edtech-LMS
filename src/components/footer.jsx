import { BiLogoInstagramAlt,BiLogoFacebook,BiLogoTwitter,BiLogoLinkedin } from "react-icons/bi";
function Footer(){
      return(
       <div className=" relative left-0 bottom-[-10px]  h-20 sm:h-15 md:h-15 bg-gray-900 flex flex-col sm:flex-row items-center justify-between ">
           <div className="text-white text-lg ml-[5%] flex  ">
            CopyRight 2023 | All Rights Reserverd
           </div>
           <div className="flex text-white gap-7 items-center justify-center mr-[5%] ">
            <a className="hover:text-yellow-300 transition-all ease-in-out duration-300">
                <BiLogoFacebook className="text-2xl"/>
            </a>
            <a className="hover:text-yellow-300 transition-all ease-in-out duration-300">
                <BiLogoInstagramAlt className="text-2xl"/>
            </a>
            <a className="hover:text-yellow-300 transition-all ease-in-out duration-300">
                <BiLogoLinkedin className="text-2xl"/>
            </a>
            <a className="hover:text-yellow-300 transition-all ease-in-out duration-300">
                <BiLogoTwitter className="text-2xl"/>
            </a>
            
            
           </div>
       </div>
      )
}
export default Footer