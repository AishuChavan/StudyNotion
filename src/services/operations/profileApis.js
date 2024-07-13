import { setLoading } from "../../slices/profileSlice";
import { profileEndpoints } from "../apis";
import toast from "react-hot-toast";
import axios from "axios";
import { apiConnector } from "../apiconnector";


const {
    GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_DATA_API
} = profileEndpoints;

export function getUserEnrolledCourses(token,setEnrolledCourses){
    return async (dispatch) => {
        try {
            const response = await apiConnector("GET",GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`
            })
            console.log("token ",token);
            console.log("GET_USER_ENROLLED_COURSES_API response....", response);

            if(response?.data?.success === false)
                throw new Error(response?.data?.message);
            setEnrolledCourses(response?.data?.data)
        } catch (error) {
            console.log("GET_USER_ENROLLED_COURSES_API Error.....", error);
            toast.error(error?.response?.data?.message || "Unable to fetch enrolled courses.")
        }
    }
}

export async function getInstructorDashboardStats(token, setInstructorData){
    let result = null;
    try {
        const response = await apiConnector("GET",GET_INSTRUCTOR_DATA_API,
        null,
        {
            Authorization: `Bearer ${token}`
        })

        console.log("GET_INSTRUCTOR_DATA_API response....", response);

        if(response?.data?.success === false)
            throw new Error(response?.data?.message);
        
        result = response?.data?.data;
    } catch (error) {
        console.log("GET_INSTRUCTOR_DATA_API Error.....", error);
        toast.error(error?.response?.data?.message || "Unable to fetch instructor data.")
    }
    return result;
}
