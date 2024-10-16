import React from 'react';
import CardContent from '@/components/customUI/CardContent';

const LeftSide = () => {

    return (
        <div className="w-full md:w-[40%]">
            <CardContent className='flex justify-center'>
                <div className='bg-phone h-[620px] w-[400px] bg-center bg-no-repeat bg-cover py-7 px-5'>
                    <p>Hi</p>
                </div>
            </CardContent>
        </div>
    );
};

export default LeftSide;
