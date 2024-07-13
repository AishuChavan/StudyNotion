import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../slices/profileSlice";

import { settingsEndpoints } from "../apis";
import { Logout } from "./authApis";

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
} = settingsEndpoints;

export function updateProfile({
    firstName,
    lastName,
    dateOfBirth,
    about,
    gender,
    contactNumber
},token,navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Updating...");
        try {

            const response = await apiConnector("PUT", UPDATE_PROFILE_API, {
                firstName,
                lastName,
                dateOfBirth,
                about,
                gender,
                contactNumber,
                token
            });

            console.log("UPDATE_PROFILE_API response....", response);

            if(response?.data?.success === false)
                throw new Error(response?.data?.message);

            toast.success("Profile Updates Successfully.");
            dispatch(setUser(response?.data?.data));
            navigate("/dashboard/my-profile");
            
        } catch (error) {
            console.log("UPDATE_PROFILE_API Error.....", error);
            toast.error(error?.response?.data?.message || "Profile not updated.")
        }
        toast.dismiss(toastId);
    }
}

export function changePassword({
    oldPassword, 
    newPassword, 
    confirmNewPassword
},token,navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Updating...");
        try {

            const response = await apiConnector("PUT", CHANGE_PASSWORD_API, {
                oldPassword, 
                newPassword, 
                confirmNewPassword,
                token
            });

            console.log("CHANGE_PASSWORD_API response....", response);

            if(response?.data?.success === false)
                throw new Error(response?.data?.message);

            toast.success("Password Changed Successfully.");
            navigate("/dashboard/my-profile");
            
        } catch (error) {
            console.log("CHANGE_PASSWORD_API Error.....", error);
            toast.error(error?.response?.data?.message || "Password not updated.")
        }
        toast.dismiss(toastId);
    }
}

export function deleteAccount(token,navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Deleting...");
        try {
            const response = await apiConnector("DELETE", DELETE_PROFILE_API, {token});

            console.log("DELETE_PROFILE_API response....", response);

            if(response?.data?.success === false)
                throw new Error(response?.data?.message);

            toast.success("Account Deleted Successfully.");
            dispatch(Logout(navigate));
            navigate("/");
            
        } catch (error) {
            console.log("DELETE_PROFILE_API Error.....", error);
            toast.error(error?.response?.data?.message || "Account not deleted.")
        }
        toast.dismiss(toastId);
    }
}

export function updateDisplayPicture(token, formData) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector(
          "PUT",
          UPDATE_DISPLAY_PICTURE_API,
          formData,
          {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        )
        console.log(
          "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
          response
        )
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Display Picture Updated Successfully")
        dispatch(setUser(response.data.data))
      } catch (error) {
        console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
        toast.error("Could Not Update Display Picture")
      }
      toast.dismiss(toastId)
    }
  }
  