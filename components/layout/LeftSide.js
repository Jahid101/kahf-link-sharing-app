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
import { AiFillFacebook, AiFillYoutube } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import { FaLinkedin } from 'react-icons/fa6';
import { IoCopy } from "react-icons/io5";
import { TbBrandGithubFilled, TbExternalLink } from "react-icons/tb";
import { useSelector } from 'react-redux';


const LeftSide = () => {
    const { userDetails } = useSelector((state) => state.usersSlice);
    const { toast } = useToast()

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


    return (
        <div className="hidden lg:block lg:w-[40%]">
            <CardContent className='flex justify-center py-7'>
                <div className='bg-phone h-[620px] w-[400px] bg-center bg-no-repeat bg-cover flex flex-col items-center'>
                    <div className='pt-16 mb-5'>
                        <Avatar className="border-4 border-solid border-primary h-28 w-28 m-auto">
                            <AvatarImage src={userDetails?.picture} />
                            <AvatarFallback className="uppercase text-3xl">
                                {userDetails?.firstName ? userDetails?.firstName[0] : 'A'}
                            </AvatarFallback>
                        </Avatar>
                        <p className="text-center mt-5 break-words text-black text-lg font-bold px-[80px]">{userDetails?.firstName} {userDetails?.lastName}</p>
                        <p className="text-xs text-center mt-2 break-all px-[80px]">{userDetails?.contactEmail}</p>
                    </div>

                    {userDetails?.links?.length > 0 && userDetails?.links.map((item, index) => (
                        <div
                            key={index}
                            className={cn('flex justify-between items-center mt-3 rounded-lg p-3 w-[230px]',
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
            </CardContent>
        </div>
    );
};

export default LeftSide;
