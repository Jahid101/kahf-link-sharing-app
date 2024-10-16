import CardContent from '@/components/customUI/CardContent';
import PageTitle from '@/components/customUI/PageTitle';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { setUserDetails } from '@/redux/user/usersSlice';
import { changeThemeColor } from '@/utility/utilityFunctions';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

const ProfilePage = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setUserDetails(null));
        changeThemeColor();
        router.push("/");
    };

    return (
        <Layout>
            <div className="w-full md:w-[60%]">
                <CardContent className="mb-7">
                    <PageTitle title="Customize your links" />

                    <Button
                        onClick={() => handleLogout()}
                    >
                        Log Out
                    </Button>
                </CardContent>
            </div>
        </Layout >
    );
};

export default ProfilePage;
