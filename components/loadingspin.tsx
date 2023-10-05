type Props = {
   
}

import { Loader2 } from "lucide-react"

export default function Page({}: Props) {
   return (
      <div className="w-full py-[60px] lg:py-[120px] flex justify-center">
         <Loader2 className="animate-spin text-xl mr-2 text-primary" size={70}/>
      </div>
   )
}