import CardContent from "@/components/customUI/CardContent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { setPreviewDetails } from "@/redux/preview/previewSlice";
import { setUserDetails } from "@/redux/user/usersSlice";
import { EyeIcon } from "lucide-react";
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaLink } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { LuUserCircle2 } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../public/images/logo.png';


const TopBar = () => {
    const { userDetails } = useSelector((state) => state.usersSlice);
    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setUserDetails(null));
        dispatch(setPreviewDetails(null));
        router.push("/");
    };



    return (
        <div className='m-auto'>
            <CardContent className='flex justify-between w-full items-center p-4 md:p-3 mt-5 border-b py-2'>
                <div className="flex items-center">
                    <div className="ml-[-5px]">
                        <Image
                            src={Logo}
                            style={{ margin: 'auto', cursor: 'pointer' }}
                            alt="logo"
                            onClick={() => router.push('/links')}
                        />
                    </div>
                    <p className="w-fit text-xl font-bold hidden md:block text-black">devlinks</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className={router?.pathname == '/links' ?
                        "flex items-center gap-2 bg-[#e9e6fd] rounded-md py-2 px-5 cursor-pointer text-primary font-semibold"
                        :
                        "flex items-center gap-2 px-5 cursor-pointer font-semibold"
                    }
                        onClick={() => router.push("/links")}
                    >
                        <FaLink className="text-xl" />
                        <p className="hidden md:block">Links</p>
                    </div>

                    <div className={router?.pathname == '/profile' ?
                        "flex items-center gap-2 bg-[#e9e6fd] rounded-md py-2 px-5 cursor-pointer text-primary font-semibold"
                        :
                        "flex items-center gap-2 px-5 cursor-pointer font-semibold"
                    }
                        onClick={() => router.push("/profile")}
                    >
                        <LuUserCircle2 className="text-xl" />
                        <p className="hidden md:block">Profile</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                    <Button
                        variant="outline"
                        className="font-semibold p-2 md:py-3 md:px-5"
                        onClick={() => router.push(`/preview/${userDetails?.id}`)}
                    >
                        <EyeIcon className="md:hidden h-5 w-5" />
                        <span className="hidden md:block">Preview</span>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="cursor-pointer border border-solid border-slate-300 h-8 w-8 md:h-10 md:w-10">
                                <AvatarImage src={userDetails?.picture} />
                                <AvatarFallback className="uppercase">{userDetails?.firstName ? userDetails?.firstName[0] : 'A'}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className='mr-7 min-w-[250px] p-3'>
                            <div className="flex items-center py-1">
                                <Avatar className="cursor-pointer border border-solid border-slate-300">
                                    <AvatarImage src={userDetails?.picture} />
                                    <AvatarFallback className='uppercase'>{userDetails?.firstName ? userDetails?.firstName[0] : 'A'}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <DropdownMenuLabel className="py-0">{userDetails?.firstName} {userDetails?.lastName}</DropdownMenuLabel>
                                    <p className="text-xs px-2">{userDetails?.email}</p>
                                </div>
                            </div>
                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={() => handleLogout()}
                                className='cursor-pointer py-3'
                            >
                                <FiLogOut /> &nbsp;&nbsp; Log Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </CardContent>
        </div>
    );
};

export default TopBar;
