import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { FaLink } from "react-icons/fa6";

const Input = React.forwardRef(({ prefix, className, ...props }, ref) => {
  return (
    <div className="flex gap-2 items-center relative">
      {prefix}
      <input
        className={cn(
          "flex h-10 w-full rounded-md border border-slate-200 bg-white ps-8 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0082C8]focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});

const CustomInput = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <Input
      className={className}
      ref={ref}
      prefix={
        <FaLink className="cursor-pointer absolute left-3 text-slate-400" />
      }
      {...props}
    />
  );
});
CustomInput.displayName = "CustomInput";

export { CustomInput };
