import CustomLoader from '@/components/loader/loader';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LeftSide from './LeftSide';
import TopBar from './Topbar';

const Layout = ({ children }) => {
    const router = useRouter();
    const { userDetails } = useSelector((state) => state.usersSlice);
    const { toast } = useToast()
    const [loading, setIsLoading] = useState(true);

    useEffect(() => {
        if (userDetails && userDetails?.id) {
            setIsLoading(false);
        } else {
            toast({
                variant: "error",
                title: "Please login first.",
            })
            router.push('/')
        }
    }, []);

    if (loading) {
        return (<CustomLoader />)
    }

    return (
        <div className='w-full bg-gray-50 px-1 md:px-7'>
            <TopBar />
            <div className='flex gap-5 my-5'>
                <LeftSide />
                {children}
            </div>
        </div>
    );
};

export default Layout;
