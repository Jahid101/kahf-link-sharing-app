/** @format */

import { cn } from "@/lib/utils";

export default function PageTitle({ title, className }) {
  return <h1 className={cn("text-[28px] text-black font-bold break-all font-header break-words", className)}>{title}</h1>;
}
