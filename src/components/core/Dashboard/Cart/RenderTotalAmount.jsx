import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useSelector,useDispatch } from "react-redux";
import IconBtn from "../../../common/IconBtn"
import {buyCourse} from "../../../../services/operations/studentsFeaturesApis"

import { useNavigate } from "react-router-dom";
const RenderTotalAmount=()=>
{
    const {total,cart}=useSelector((state)=>state.cart);
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleBuyCourse=()=>
        {
            const courses=cart.map((course)=>course._id);
           // console.log("Bought these course:",courses);
            buyCourse(token, courses, user, navigate, dispatch)
            //TODO:API integration->payment gateway
        }
    return(
        <div className="min-w-[280px] rounded-xl border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p  className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
            <p className="mb-6 text-3xl font-medium text-yellow-100">Rs {total}</p>
            <button className="bg-yellow-50  text-richblack-900 rounded  w-full font-semibold" onClick={handleBuyCourse}>
                Buy Now
            </button>
        </div>
    )
}

export default RenderTotalAmount;