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

    const handleCopy = (link) => {
        navigator.clipboard.writeText(link);
        toast({
            variant: "success",
            title: "Copied to clipboard",
        })
    }

    const handleExternalLink = (link) => {
        window.open(link, '_blank');
    }


    if (loading) {
        return (<CustomLoader />)
    }

    return (
        <div className=''>
            <PreviewTopBar />

            <div className='m-auto bg-white rounded-2xl shadow-lg p-5 w-[300px] mt-[-120px]'>
                <div className='p-3'>
                    <div className='pt-3 mb-9'>
                        <Avatar className="border-4 border-solid border-primary h-28 w-28 m-auto">
                            <AvatarImage src={userDetails?.picture} />
                            <AvatarFallback className="uppercase text-3xl">
                                {userDetails?.firstName ? userDetails?.firstName[0] : 'A'}
                            </AvatarFallback>
                        </Avatar>
                        <p className="text-center mt-5 break-words text-black text-lg font-bold">{userDetails?.firstName} {userDetails?.lastName}</p>
                        <p className="text-xs text-center mt-2 break-all">{userDetails?.contactEmail}</p>
                    </div>

                    {userDetails?.links?.length > 0 && userDetails?.links.map((item, index) => (
                        <div
                            key={index}
                            className={cn('flex justify-between items-center mt-3 rounded-lg p-3',
                                item?.platform == 'GitHub' && 'bg-[#25292E]',
                                item?.platform == 'YouTube' && 'bg-red-600',
                                item?.platform == 'LinkedIn' && 'bg-blue-800',
                                item?.platform == 'Facebook' && 'bg-blue-600',
                                item?.platform == 'Portfolio' && 'bg-teal-700',
                            )}
                        >
                            <div className='flex items-center text-white'>
                                {item?.platform == 'GitHub' && <TbBrandGithubFilled className='w-4 h-4 mr-2' />}
                                {item?.platform == 'LinkedIn' && <FaLinkedin className='w-4 h-4 mr-2' />}
                                {item?.platform == 'YouTube' && <AiFillYoutube className='w-4 h-4 mr-2' />}
                                {item?.platform == 'Facebook' && <AiFillFacebook className='w-4 h-4 mr-2' />}
                                {item?.platform == 'Portfolio' && <CgWebsite className='w-4 h-4 mr-2' />}
                                <p className='w-fit text-sm'>{item?.platform}</p>
                            </div>
                            <div className='flex items-center gap-2 text-white'>
                                <TooltipProvider>
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger>
                                            <IoCopy className='cursor-pointer w-4 h-4' onClick={() => handleCopy(item?.link)} />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Copy</p>
                                        </TooltipContent>
                                    </Tooltip>

                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger>
                                            <TbExternalLink className='cursor-pointer w-4 h-4' onClick={() => handleExternalLink(item?.link)} />
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
