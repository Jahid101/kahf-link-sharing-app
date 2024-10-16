import CardContent from '@/components/customUI/CardContent';
import PageTitle from '@/components/customUI/PageTitle';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { setUserDetails } from '@/redux/user/usersSlice';
import { changeThemeColor } from '@/utility/utilityFunctions';
import { useRouter } from 'next/router';
import { FiPlus } from 'react-icons/fi';
import { useDispatch } from 'react-redux';

const LinkPage = () => {
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
                    <PageTitle title="Customize your links" className="mb-2" />
                    <p>Add/edit/remove links below and then share all your profiles with the world!</p>

                    <Button
                        variant="outline"
                        className="mt-7 font-semibold w-full py-5"
                        onClick={() => { }}
                    >
                        <FiPlus className='mr-2' />
                        Add new link
                    </Button>


                    {/* <Button
                        onClick={() => handleLogout()}
                    >
                        Log Out
                    </Button> */}
                </CardContent>
            </div>
        </Layout >
    );
};

export default LinkPage;
