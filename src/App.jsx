import toast from 'react-hot-toast'
import Footer from './components/footer'
import HomeLayout from './layouts/homelayout'
import Home from './components/home'
import Aboutus from './components/aboutus'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/signup'
import Error from './components/Error'
import Logint from './components/login'
import Getcourse from './components/courses/getcourse'
import ContactUs from './components/contactus'
import Denied from './components/denied'
import Descrip from './components/courses/coursedescription'
import RequireAuth from './components/requireauth'
import Create from './components/courses/createCourse'
import Profile from './components/profile'
import EditProfile from './components/editprofile'
import Checkout from './components/payments/checkout'
import Success from './components/payments/success'
import Failed from './components/payments/failed'
import AddLecture from './components/lectures/addlecture'
import WatchLecture from './components/lectures/wathlecture'
import Admin from './components/admindashboard'
import ChangePass from './components/changepass'

function App() { 
 const x=10
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<Aboutus/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Logint/>} />
      <Route path="/courses" element={<Getcourse/>} />
      <Route path="/contact" element={<ContactUs/>} />
      <Route path="/denied" element={<Denied/>} />
      <Route path="*" element={<Error/>} />
      <Route element={<RequireAuth allowedrole={'admin'}/>}>
       <Route path='/courses/create' element={<Create/>}/>
       <Route path='/addlecture' element={<AddLecture/>}/>
       <Route path='/admin/dashboard' element={<Admin/>}/>
      </Route>
       <Route element={<RequireAuth allowedrole={['admin','user']}/>}>
        <Route path="/courses/description" element={<Descrip/>} />
       <Route path='/profile' element={<Profile/>}/>
       <Route path='/password/change' element={<ChangePass/>}/>
       <Route path='/profile/edit' element={<EditProfile/>}/>
       <Route path='/checkout' element={<Checkout/>}/>
       <Route path='/payment/success' element={<Success/>}/>
       <Route path='/payment/failed' element={<Failed/>}/>
       <Route path='/lectures' element={<WatchLecture/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
