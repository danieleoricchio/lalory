"use client"

import { cn } from "@/lib/utils"

type Props = {
   disabled: boolean
}

export default function Page({disabled}: Props) {
   return (
      <a href={/* disabled || loading ? "#/" :  */"/api/checkout"} /* onClick={onClick} */ className={cn("bg-primary p-4 rounded-md text-white font-semibold mx-auto block text-center w-full lg:w-4/5"/* , loading || disabled ? "cursor-not-allowed opacity-50" : "" */)}>Vai al checkout</a>
   )
}