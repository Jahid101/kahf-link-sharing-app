import { cn } from '@/lib/utils';
import React from 'react';

const Skeleton = (props) => {
    return (
        <div
            className={cn(
                "border rounded-md bg-gray-200 animate-pulse",
                props.className
            )}
        >
        </div>
    );
};

export default Skeleton;
