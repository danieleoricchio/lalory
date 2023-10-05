import { Loader2 } from "lucide-react"

type Props = {
   
}

export default function Page({}: Props) {
   return (
      <div className="w-full py-[325px] lg:py-[350px] flex justify-center">
         <Loader2 className="animate-spin text-xl mr-2 text-primary" size={100}/>
      </div>
   )
}