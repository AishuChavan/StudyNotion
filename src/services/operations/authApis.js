import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector";
import { authEndpoints } from "../apis";
import { setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = authEndpoints;

export function login(data, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Login...")
        try {

            const response = await apiConnector("POST", LOGIN_API,data);

           // console.log("LOGIN_API response.....",response);

            if(response?.data?.success === false)
                throw new Error(response);

            dispatch(setToken(response?.data?.token));
            localStorage.setItem("studyNotionToken", JSON.stringify(response?.data?.token));
            
            const userImage = response?.data?.user?.image
            ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({...response?.data?.user, image: userImage}));
            localStorage.setItem("studyNotionUser", JSON.stringify(response?.data?.user))

            toast.success("Login Successful.");
            navigate("/dashboard/my-profile");

        } catch (error) {
            //console.log("LOGIN_API Error.....", error?.response?.data?.message);
            toast.error(error?.response?.data?.message || "Login Failed.")
        }finally{
            toast.dismiss(toastId);
        }
    }
}

export function Logout(navigate){
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        // TODO: reset cart
        localStorage.removeItem("studyNotionUser");
        localStorage.removeItem("studyNotionToken");
        toast.success("Logged Out");
        navigate("/");
    }
}

export function sendOTP(data, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Sending OTP...")
        try {
            //console.log(data);
            //console.log(SENDOTP_API);
            const response = await apiConnector("POST",SENDOTP_API,data);

            console.log("SENDOTP_API response.....",response);

            if(response.data.success === false)
                throw new Error(response);


            toast.success("OTP sent Successfully.");

            navigate("/verify-email")

        } catch (error) {
            console.log("SENDOTP_API Error.....", error?.response?.data?.message);
            toast.error(error?.response?.data?.message || "OTP not sent.")
        }finally{
            toast.dismiss(toastId);
        }
    }
}

export function signup(
    {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        contactNumber,
        accountType,
    },
    otp,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Verifing OTP")
        try {

            const response = await apiConnector("POST",SIGNUP_API,{
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                contactNumber,
                accountType,
                otp
            });

            console.log("SIGNUP_API response.....",response);

            if(response.data.success === false)
                throw new Error(response);

            
            toast.success("Sign Up successful.");
            dispatch(login({email,password},navigate))
            // navigate("/login");

        } catch (error) {
            console.log("SIGNUP_API Error.....", error?.response?.data?.message);
            toast.error(error?.response?.data?.message || "Signup Failed.")
        }finally{
            toast.dismiss(toastId);
        }
    }
}

export function getResetPasswordToken(email,setEmailSent){
    return async (dispatch) => {
        const toastId = toast.loading("Sending Email...");
        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {email});

            console.log("RESETPASSTOKEN_API response....", response);

            if(response?.data?.success === false)
                throw new Error(response?.data?.message);
            toast.success("Email Sent Successfully.");
            setEmailSent(true);
            
        } catch (error) {
            console.log("RESETPASSTOKEN_API Error.....", error?.response?.data?.message);
            toast.error(error?.response?.data?.message || "Email not sent.")
        }
        toast.dismiss(toastId);
    }
}

export function resetPassword(password,confirmPassword,token,navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Updating Password...");
        try {
            const response = await apiConnector("POST", RESETPASSWORD_API, {password,confirmPassword,token});

            console.log("RESETPASSWORD_API response....", response);

            if(response?.data?.success === false)
                throw new Error(response?.data?.message);
            toast.success("Password has been reset successfully.");
            navigate("/login");
            
        } catch (error) {
            console.log("RESETPASSWORD_API Error.....", error?.response?.data?.message);
            toast.error(error?.response?.data?.message || "Password not updated.")
        }
        toast.dismiss(toastId);
    }
}