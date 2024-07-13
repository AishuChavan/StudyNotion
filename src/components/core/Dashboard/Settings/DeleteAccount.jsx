import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../../../ui/alert-dialog"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteAccount } from '../../../../services/operations/settingApis';

function DeleteAccount(props) {
    const {token} = useSelector( state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className=' bg-pink-900 flex justify-between items-start px-6 py-6 rounded-lg border-pink-700 border'>
        <div className=' flex justify-center items-start gap-4 w-fit'>
            <RiDeleteBin6Line 
                className=' text-6xl rounded-full bg-pink-700 text-pink-200 px-2 py-1'
            />
            <div className=' flex flex-col items-start justify-center gap-2'>
                <p className=' text-richblack-5 text-xl font-semibold'>
                    Delete Account
                </p>
                <div>
                    <p className=' text-base text-pink-25'>
                        Would you like to delete account?
                    </p>
                    <p className=' text-base text-pink-25 w-[80%]'>
                        This account contains Paid Courses. Deleting your account will remove all the contain associated with it.
                    </p>
                </div>
                <p className=' text-base text-pink-300'>
                    I want to delete my account.
                </p>
            </div>
        </div>
        <div>
            <AlertDialog>
                <AlertDialogTrigger>
                    <button
                        className=" appearance-none	 text-center text-[16px] px-4 py-3 rounded-md font-bold flex justify-center items-center gap-2
                        bg-destructive text-black hover:scale-95 transition-all duration-200"
                        style={
                            {
                                boxShadow:"-2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset"
                            }
                        }
                    >
                        Delete
                    </button>
                </AlertDialogTrigger>
                <AlertDialogContent className=" bg-richblack-900">
                    <AlertDialogHeader>
                    <AlertDialogTitle className=" text-richblack-5 text-xl">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className=" text-richblack-300 text-base">
                        Would you like to delete account?
                        This account contains Paid Courses. Deleting your account will remove all the contain associated with it.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel 
                        className=" appearance-none	 text-center text-[14px] px-6 py-3 rounded-md font-bold flex justify-center items-center gap-2 
                        bg-richblack-800 text-white hover:scale-95 transition-all duration-200"
                        style={
                            {
                                boxShadow:"-2px -2px 0px 0px rgba(255, 255, 255, 0.18) inset"
                            }
                        }
                    >Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className=" appearance-none	 text-center text-[16px] px-4 py-3 rounded-md font-bold flex justify-center items-center gap-2
                        bg-destructive text-black hover:scale-95 transition-all duration-200"
                        style={
                            {
                                boxShadow:"-2px -2px 0px 0px rgba(255, 255, 255, 0.51) inset"
                            }
                        }
                        onClick={ () => dispatch(deleteAccount(token,navigate))}
                    >Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    </div>
    );
}

export default DeleteAccount;