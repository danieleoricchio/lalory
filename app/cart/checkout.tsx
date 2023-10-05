"use client"

import { checkout } from "@/lib/funcs"
import { Loader2 } from "lucide-react"
import { useState } from "react"

type Props = {
   disabled: boolean
}

export default function Page({disabled}: Props) {
   const [loading, setLoading] = useState(false)
   async function onCheckout() {
      setLoading(true)
      const res = await checkout()
      if (res.status) {
         window.location = res.url as unknown as Location
      }
   }
   return (
      <button disabled={disabled || loading} onClick={onCheckout} className="bg-primary p-4 rounded-md text-white font-semibold mx-auto block w-full lg:w-4/5 disabled:cursor-not-allowed disabled:opacity-50">{
         loading && <Loader2 className="animate-spin inline-block mr-2" size={18} />
      }Vai al checkout</button>
   )
}