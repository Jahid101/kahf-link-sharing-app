import React from 'react';
import CardContent from '@/components/customUI/CardContent';
import { useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TbBrandGithubFilled, TbExternalLink } from "react-icons/tb";
import { IoCopy } from "react-icons/io5";
import { cn } from '@/lib/utils';
import { AiFillYoutube } from "react-icons/ai";
import { FaLinkedin } from 'react-icons/fa6';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const LeftSide = () => {
    const { userDetails } = useSelector((state) => state.usersSlice);


    const handleCopy = () => {

    }

    const handleExternalLink = () => {

    }


    return (
        <div className="w-full md:w-[40%]">
            <CardContent className='flex justify-center'>
                <div className='bg-phone h-[620px] w-[400px] bg-center bg-no-repeat bg-cover flex flex-col items-center'>
                    <div className='pt-16 mb-5'>
                        <Avatar className="border border-solid border-slate-300 h-28 w-28 m-auto">
                            <AvatarImage src={userDetails?.picture} />
                            <AvatarFallback className="uppercase text-3xl">
                                {userDetails?.firstName ? userDetails?.firstName[0] : 'A'}
                            </AvatarFallback>
                        </Avatar>
                        <p className="text-center mt-5 break-words px-[80px]">{userDetails?.firstName} {userDetails?.lastName}</p>
                        <p className="text-xs text-center mt-2 break-all px-[80px]">{userDetails?.email}</p>
                    </div>

                    <div
                        className={cn('flex justify-between items-center mt-2 rounded-lg p-3 w-[230px]',
                            'bg-[#25292E]'
                            // 'bg-red-600'
                            // 'bg-blue-600'
                        )}
                    >
                        <div className='flex items-center text-white'>
                            <TbBrandGithubFilled className='w-4 h-4 mr-2' />
                            {/* <AiFillYoutube className='w-4 h-4 mr-2' />
                            <FaLinkedin className='w-4 h-4 mr-2' /> */}
                            <p className='w-fit text-sm'>GitHub</p>
                        </div>
                        <div className='flex items-center gap-2 text-white'>
                            <TooltipProvider>
                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger>
                                        <IoCopy className='cursor-pointer w-4 h-4' onClick={() => handleCopy()} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Copy</p>
                                    </TooltipContent>
                                </Tooltip>

                                <Tooltip delayDuration={0}>
                                    <TooltipTrigger>
                                        <TbExternalLink className='cursor-pointer w-4 h-4' onClick={() => handleExternalLink()} />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Visit</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </div>
            </CardContent>
        </div>
    );
};

export default LeftSide;
