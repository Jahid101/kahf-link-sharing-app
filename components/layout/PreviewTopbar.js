import React from 'react';
import { Button } from '@/components/ui/button';
import { FaRegEdit } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import CardContent from '@/components/customUI/CardContent';
import { useRouter } from 'next/router';


const PreviewTopBar = () => {
    const router = useRouter();

    return (
        <div className='px-5 h-[300px] bg-primary m-auto rounded-bl-3xl rounded-br-3xl pt-5'>
            <CardContent className='flex justify-between w-full'>
                <Button
                    variant="outline"
                    className="font-semibold p-3 md:py-3 md:px-5"
                    onClick={() => router.push("/links")}
                >
                    <FaRegEdit className='md:hidden' />
                    <span className="hidden md:block">Back to Editor</span>
                </Button>

                <Button
                    className="font-semibold p-3 md:py-3 md:px-5"
                    onClick={() => { }}
                >
                    <FaShareFromSquare className='md:hidden' />
                    <span className="hidden md:block">Share Link</span>
                </Button>
            </CardContent>
        </div>
    );
};

export default PreviewTopBar;
