import CardContent from '@/components/customUI/CardContent';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { setPreviewDetails } from '@/redux/preview/previewSlice';
import { useEffect } from 'react';
import { AiFillFacebook, AiFillYoutube } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import { FaLinkedin } from 'react-icons/fa6';
import { IoCopy } from "react-icons/io5";
import { TbBrandGithubFilled, TbExternalLink } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from '@/components/customUI/Skeleton';


const LeftSide = () => {
    const { userDetails } = useSelector((state) => state.usersSlice);
    const { previewDetails } = useSelector((state) => state.previewSlice);
    const { toast } = useToast()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPreviewDetails(userDetails));
    }, [])

    const handleCopy = (link) => {
        navigator.clipboard.writeText(link);
        toast({
            variant: "success",
            title: "Copied to clipboard",
        })
    }

    const handleExternalLink = (link) => {
        if (link.startsWith("https://")) {
            window.open(link, '_blank');
        } else {
            window.open("https://" + link, '_blank');
        }
    }

    console.log('previewDetails =>', previewDetails);

    return (
        <div className="hidden lg:block lg:w-[40%]">
            <CardContent className='flex justify-center py-20'>
                <div className='bg-phone h-[650px] w-[300px] bg-center bg-no-repeat bg-cover flex flex-col items-center'>
                    <div className='pt-[85px] mb-5'>
                        {(!previewDetails?.picture || previewDetails?.picture == '') ?
                            <Skeleton className="h-28 w-28 rounded-full m-auto" />
                            :
                            <Avatar className="border-4 border-solid border-primary h-28 w-28 m-auto">
                                <AvatarImage src={previewDetails?.picture} />
                                <AvatarFallback className="uppercase text-3xl">
                                    {previewDetails?.firstName ? previewDetails?.firstName[0] : 'A'}
                                </AvatarFallback>
                            </Avatar>
                        }
                        {(previewDetails?.firstName == '' && previewDetails?.lastName == '') ?
                            <Skeleton className="h-6 w-[180px] rounded-lg my-2 mx-auto" />
                            :
                            <p className="text-center mt-5 break-words text-black text-lg font-bold px-[80px]">{previewDetails?.firstName} {previewDetails?.lastName}</p>
                        }
                        {(!previewDetails?.contactEmail || previewDetails?.contactEmail == '') ?
                            <Skeleton className="h-6 w-[200px] rounded-lg my-2 mx-auto" />
                            :
                            <p className="text-xs text-center mt-2 break-all px-[80px]">{previewDetails?.contactEmail}</p>
                        }
                    </div>

                    <div className='max-h-[300px] overflow-y-auto px-1'>
                        {previewDetails?.links?.length > 0 && previewDetails?.links.map((item, index) => (
                            <div
                                key={index}
                                className={cn('flex justify-between items-center mt-3 rounded-lg p-3 w-[260px]',
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

                        {previewDetails?.links?.length < 5 &&
                            [...Array(5 - previewDetails?.links?.length).keys()].map(i => i + 1).map((item, index) => (
                                <Skeleton className="h-10 w-[250px] rounded-lg my-3 mx-auto" />
                            ))
                        }
                    </div>
                </div>
            </CardContent>
        </div>
    );
};

export default LeftSide;
