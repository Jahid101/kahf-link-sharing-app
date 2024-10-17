import PreviewTopBar from '@/components/layout/PreviewTopbar';
import CustomLoader from '@/components/loader/loader';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { usersAPIs } from '@/utility/api/usersApi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiFillFacebook, AiFillYoutube } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import { FaLinkedin } from 'react-icons/fa6';
import { IoCopy } from "react-icons/io5";
import { TbBrandGithubFilled, TbExternalLink } from "react-icons/tb";
import { useSelector } from 'react-redux';


const PreviewPage = () => {
    const { userDetails } = useSelector((state) => state.usersSlice);
    const { toast } = useToast()
    const router = useRouter();
    const [loading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (router?.isReady) {
            if (userDetails && userDetails?.id) {
                setUserData(userDetails);
                setIsLoading(false);
            } else {
                getUserInfo()
            }
        }
    }, [router?.isReady]);


    const getUserInfo = async () => {

        try {
            const response = await usersAPIs.getUser(router.query?.id)
            // console.log('response ==>', response);

            if (response && response?.id) {
                const user = response;
                delete user.password;

                setUserData(user);
                setIsLoading(false);
            } else {
                toast({
                    variant: "error",
                    title: "No data found",
                })
                setIsLoading(false);
            }
        } catch (error) {
            console.log("error ==>", error);

            if (error?.response?.data == "Not found") {
                toast({
                    variant: "error",
                    title: "No data found",
                })
                setIsLoading(false);
                return
            }

            toast({
                variant: "error",
                title: "Something went wrong. Please try again later",
            })
            setIsLoading(false);
        }
    }

    const handleCopy = (link) => {
        navigator.clipboard.writeText(link);
        toast({
            variant: "success",
            title: "Copied to clipboard",
        })
    }

    const handleExternalLink = (link) => {
        if (link.startsWith("http://")) {
            window.open(link, '_blank');
        } else {
            window.open("http://" + link, '_blank');
        }
    }


    if (loading) {
        return (<CustomLoader />)
    }

    return (
        <div>
            <PreviewTopBar />

            <div className='m-auto bg-white rounded-2xl shadow-lg p-5 pb-10 w-[95%] min-[420px]:w-[400px] mt-[-130px] mb-10'>
                <div className='p-3'>
                    <div className='pt-3 mb-9'>
                        <Avatar className="border-4 border-solid border-primary h-28 w-28 m-auto">
                            <AvatarImage src={userData?.picture} />
                            <AvatarFallback className="uppercase text-3xl">
                                {userData?.firstName ? userData?.firstName[0] : 'A'}
                            </AvatarFallback>
                        </Avatar>
                        <p className="text-center mt-5 break-words text-black text-lg font-bold">{userData?.firstName} {userData?.lastName}</p>
                        <p className="text-xs text-center mt-2 break-all">{userData?.contactEmail}</p>
                    </div>

                    {userData?.links?.length > 0 && userData?.links.map((item, index) => (
                        <div
                            key={index}
                            className={cn('flex justify-between items-center mt-4 rounded-lg px-4 py-5',
                                item?.platform == 'GitHub' && 'bg-[#25292E]',
                                item?.platform == 'YouTube' && 'bg-red-600',
                                item?.platform == 'LinkedIn' && 'bg-blue-800',
                                item?.platform == 'Facebook' && 'bg-blue-600',
                                item?.platform == 'Portfolio' && 'bg-teal-700',
                            )}
                        >
                            <div className='flex items-center text-white'>
                                {item?.platform == 'GitHub' && <TbBrandGithubFilled className='w-6 h-6 mr-2' />}
                                {item?.platform == 'LinkedIn' && <FaLinkedin className='w-6 h-6 mr-2' />}
                                {item?.platform == 'YouTube' && <AiFillYoutube className='w-6 h-6 mr-2' />}
                                {item?.platform == 'Facebook' && <AiFillFacebook className='w-6 h-6 mr-2' />}
                                {item?.platform == 'Portfolio' && <CgWebsite className='w-6 h-6 mr-2' />}
                                <p className='w-fit text-sm'>{item?.platform}</p>
                            </div>
                            <div className='flex items-center gap-2 text-white'>
                                <TooltipProvider>
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger>
                                            <IoCopy className='cursor-pointer w-5 h-5' onClick={() => handleCopy(item?.link)} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Copy</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger>
                                            <TbExternalLink className='cursor-pointer w-5 h-5' onClick={() => handleExternalLink(item?.link)} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Visit</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PreviewPage;
