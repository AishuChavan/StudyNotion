import React, { useEffect } from "react";
import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import {NavbarLinks} from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { useState } from "react";
import { apiConnector } from "../../services/apiconnector";
import { courseEndpoints } from "../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import CatalogDropDown from "./CatalogDropDown";
import { NavLink } from "react-router-dom";


function Navbar(props)
{
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const {totalItems}=useSelector((state)=>state.cart);

    const location=useLocation();

    // const sublinks=[
    //     {
    //         title:"Python",
    //         link:"/category/Python"
    //     },
    //     {
    //         title:"Web",
    //         link:"/category/Web"
    //     }
    // ]

    const [sublinks,setSublinks]=useState([]);

    // const fetchSublinks=async()=>
    //     {
    //         try{
    //             const result=await apiConnector("GET",courseEndpoints.COURSE_CATEGORIES_API);
    //             console.log("categori data ois ",result);
    //             setSublinks(result.data.data);
    //         }
    //         catch(error)
    //         {
    //             console.log("Could not fetch the category link");
    //         }
    //     }
    // useEffect(()=>
    // {
    //     fetchSublinks();
    // },[]);

    const matchRoute=(route)=>
    {
        return matchPath({path:route},location.pathname);
    }


    return(
        <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
            <div className="flex w-11/12 max-w-maxContent items-center justify-between">
                <Link to={'/'}>
                    <img src={logo} alt="" width={160} height={42} loading='lazy'/>
                </Link>


                {/* Nav Links */}
                <nav>
                    <ul className="flex gap-x-6 items-center text-richblack-25">
                        {
                            NavbarLinks.map((link,index)=>(
                                
                                    <li key={index}>
                                        {
                                            link.title === "Catalog" ? 
                                            (
                                                <CatalogDropDown link={link}/>
                                            ):
                                            (
                                                <NavLink to={link?.path}>
                                                <p className={`${matchRoute(link?.path) && "text-yellow-25"}`}>
                                                    {link?.title}
                                                </p>
                                            </NavLink>
                                            )
                                        }
                                    </li>
                                )
                            )
                        }
                    </ul>
                </nav>

                {/* Login/SignUp/Dashboard */}
                <div className="flex gap-x-4 items-center">
                    {
                        user && user.accountType === "Student" && (
                            <Link to={"/dashboard/cart"} className="relative text-richblack-5 text-2xl">
                                <IoCart />
                                {
                                    totalItems > 0 && (
                                        <span
                                        className=' animate-bounce absolute text-yellow-50 text-xs bg-richblack-600 rounded-full p-1 px-2 -top-2 left-2'
                                        >
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/login"}>
                                <button className="border border-richblack-800 bg-richblack-700 py-[8px] px-[16px] text-richblack-100 rounded-md">
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={"/signup"}>
                                <button className="border border-richblack-800 bg-richblack-700 py-[8px] px-[16px] text-richblack-100 rounded-md">
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;