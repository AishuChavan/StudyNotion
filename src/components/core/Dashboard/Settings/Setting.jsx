import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdEditSquare } from "react-icons/md";
import ChangeProfilePicture from './ChangeProfilePicture';
import EditProfile from './EditProfile';
import UpdatePassword from './UpdatePassword';
import DeleteAccount from './DeleteAccount';

function Setting(props) {
    const { user } = useSelector(state => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div>
            <div className=' flex flex-col gap-8'>
                <h1 className=' text-richblack-5 text-4xl font-semibold'>Edit Profile</h1>
                
                <div className=' flex flex-col gap-8'>
                    {/* Section 1 */}
                    <ChangeProfilePicture />
                    
                    {/* Section 2  */}
                    <EditProfile />

                    {/* Section 3  */}
                    <UpdatePassword />

                    {/* Section 4  */}
                    <DeleteAccount />
                </div>
            </div>
        </div>
    );
}

export default Setting;