import { Button } from '@/components/ui/button';
import { setUserDetails } from '@/redux/user/usersSlice';
import { changeThemeColor } from '@/utility/utilityFunctions';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ProfilePage = () => {
    const { userDetails } = useSelector((state) => state.usersSlice);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setUserDetails(null));
        changeThemeColor();
        router.push("/");
    };

    return (
        <div>
            <Button
                onClick={() => handleLogout()}
            >
                logout
            </Button>
        </div>
    );
};

export default ProfilePage;