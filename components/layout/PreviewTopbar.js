import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaRegEdit } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import CardContent from '@/components/customUI/CardContent';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useToast } from '@/components/ui/use-toast';
import ShareButton from './ShareButton';
import Logo from '../../public/images/logo.png';
import Image from 'next/image';


const PreviewTopBar = () => {
    const { userDetails } = useSelector((state) => state.usersSlice);
    const { toast } = useToast()
    const router = useRouter();
    const [isDialogOpen, setDialogOpen] = useState(false)

    const handleEditorClick = () => {
        if (userDetails && userDetails?.id) {
            router.push("/links")
        } else {
            toast({
                variant: "error",
                title: "Please login first.",
            })
            router.push('/')
        }
    }



    return (
        <div className='px-5 h-[400px] bg-primary m-auto rounded-bl-3xl rounded-br-3xl pt-5'>
            <CardContent className='flex justify-between w-full p-3'>
                <Button
                    variant="outline"
                    className="font-semibold p-3 md:py-3 md:px-5"
                    onClick={() => handleEditorClick()}
                >
                    <FaRegEdit className='md:hidden' />
                    <span className="hidden md:block">Back to Editor</span>
                </Button>

                <div className="flex items-center">
                    <div className='md:mr-2'>
                        <Image
                            src={Logo}
                            alt="logo"
                            className="max-[767px]:border max-[767px]:border-primary max-[767px]:rounded-lg"
                        />
                    </div>
                    <p className="w-fit text-xl font-bold hidden md:block text-black">devlinks</p>
                </div>

                <Button
                    className="font-semibold p-3 md:py-3 md:px-5"
                    onClick={() => setDialogOpen(true)}
                >
                    <FaShareFromSquare className='md:hidden' />
                    <span className="hidden md:block">Share Link</span>
                </Button>
            </CardContent>

            <ShareButton
                open={isDialogOpen}
                setDialogOpen={setDialogOpen}
            />
        </div>
    );
};

export default PreviewTopBar;
