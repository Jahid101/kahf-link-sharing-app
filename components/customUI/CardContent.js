import React from 'react';
import { cn } from "@/lib/utils";


const CardContent = (props) => {

    return (
        <div
            {...props}
            className={cn(
                "rounded-xl border p-5 shadow-xl bg-white",
                props.className
            )}
        />
    );
};

export default CardContent;
