import React from 'react';
import { Button } from '@/components/ui/button';
import { FaRegEdit } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import CardContent from '@/components/customUI/CardContent';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useToast } from '@/components/ui/use-toast';


const PreviewTopBar = () => {
    const { userDetails } = useSelector((state) => state.usersSlice);
    const { toast } = useToast()
    const router = useRouter();

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

    const handleShareClick = () => {
        const sharableLink = window?.location?.href
        console.log(sharableLink)
    }


    return (
        <div className='px-5 h-[300px] bg-primary m-auto rounded-bl-3xl rounded-br-3xl pt-5'>
            <CardContent className='flex justify-between w-full'>
                <Button
                    variant="outline"
                    className="font-semibold p-3 md:py-3 md:px-5"
                    onClick={() => handleEditorClick()}
                >
                    <FaRegEdit className='md:hidden' />
                    <span className="hidden md:block">Back to Editor</span>
                </Button>

                <Button
                    className="font-semibold p-3 md:py-3 md:px-5"
                    onClick={() => handleShareClick()}
                >
                    <FaShareFromSquare className='md:hidden' />
                    <span className="hidden md:block">Share Link</span>
                </Button>
            </CardContent>
        </div>
    );
};

export default PreviewTopBar;
