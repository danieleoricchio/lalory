"use client"

import { Search } from "lucide-react"
import { useRouter } from "next/navigation";

type Props = {
   
}

export default function Page({}: Props) {
   const router = useRouter()
   
   function search(e: any) {
      const { value } = document.getElementById("value") as HTMLInputElement
      if (value == "") return
      console.log(value);
      router.push("/search?q=" + value, {
         scroll: false
      })
   }

   return (
      <div className="flex gap-4 w-full">
         <div className="w-full border-2 border-primary rounded-md lg:rounded flex items-center p-2">
            <Search className="text-primary"/>
            <input type="text" placeholder="Cerca..." className="w-full outline-none px-2" id="value"/>
         </div>
         <button className="bg-primary px-4 py-2 rounded-md lg:rounded text-white" onClick={search}>
            Cerca
         </button>
      </div>
   )
}