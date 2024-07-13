import "./App.css";
import React from "react";
import {Route,Routes} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Contact from "./pages/Contact";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import Setting from "./components/core/Dashboard/Settings/Setting";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import { ACCOUNT_TYPE } from "./utilis/constants";
import CourseDetails from "./pages/CourseDetails";
import Catalog from "./pages/Catalog";
import ViewCourse from "./pages/ViewCourse";
import  VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import { useSelector } from "react-redux";
function App() 
{
  const { user } = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      
      <Navbar />
  
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={ <Login /> }/>
        <Route path="/signup" element={ <Signup /> }/>
        <Route path="/forgot-password" element={ <ForgotPassword /> }/>
        <Route path="/update-password/:token" element={ <UpdatePassword /> }/>
        <Route path="/verify-email" element={ <VerifyEmail /> }/>
        <Route path="/about" element={ <About /> }/>
        <Route path="/contact" element={ <Contact /> }/>
        <Route path="/catalog/:catalog" element={ <Catalog />}/>
        <Route path="/courses/:courseId" element={ <CourseDetails />} />
        <Route path="/view-course/:courseId" element={ <ViewCourse />} />
        <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        > 
          <Route path="dashboard/my-profile" element={<MyProfile/>} />
          {/* <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
          <Route path="dashboard/cart" element={<Cart/>}/> */}
          <Route path="dashboard/settings" element={<Setting/>} />
          {/* <Route path="dashboard/add-course" element={<AddCourse/>} />
          <Route path="dashboard/my-courses" element={<MyCourses/>} />
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>}/>
          <Route path="/dashboard/instructor" element={ <Instructor /> }/> */}


          {
        user?.accountType === ACCOUNT_TYPE.STUDENT && (
          <>
          <Route path="dashboard/cart" element={<Cart />} />
          <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
          </>
        )
      }

      {
        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
          <Route path="dashboard/instructor" element={<Instructor />} />
          <Route path="dashboard/add-course" element={<AddCourse />} />
          <Route path="dashboard/my-courses" element={<MyCourses />} />
          <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
          
          </>
        )
      }
        </Route>

        <Route element={
                    <PrivateRoute>
                        <ViewCourse />
                    </PrivateRoute>
                }>
                    <Route
                        path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                        element={< VideoDetails />}
                    />
        </Route>
        <Route path="*" element={<Error/>} />
      </Routes> 
    </div>
  );
}

export default App;
