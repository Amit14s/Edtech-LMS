import { useSelector } from "react-redux"
import { Outlet,Navigate } from "react-router-dom";

function RequireAuth({allowedrole}){
    const {isloggedin,role}=useSelector(state=>state.auth);
    return (isloggedin && allowedrole.includes(role))?(<Outlet/>) :isloggedin?<Navigate to={'/denied'} />:<Navigate to={'/login'} />
}
export default RequireAuth