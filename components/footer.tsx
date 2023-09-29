type Props = {
   
}

import { Facebook, Instagram } from "lucide-react"
import Link from "next/link"
import { BsPinterest } from "react-icons/bs"
import { HiOutlineMail } from "react-icons/hi"

export default function Page({}: Props) {
   //TODO: mettere links
   return (
      <footer className="bg-primary p-4 w-full lg:w-2/3 mx-auto lg:rounded-t-md text-white">
         <div className="flex gap-4 items-center">
            <Link href="/" className="cursor-pointer hover:scale-105 transition-all duration-100">
               <Instagram className="text-white text-xl"/>
            </Link>
            <Link href="/" className="cursor-pointer hover:scale-105 transition-all duration-100">
               <Facebook className="text-white text-xl"/>
            </Link>
            <Link href="/" className="cursor-pointer hover:scale-105 transition-all duration-100">
               <BsPinterest className="text-white text-xl"/>
            </Link>
            <Link href="/" className="cursor-pointer hover:scale-105 transition-all duration-100">
               <HiOutlineMail className="text-white text-2xl"/>
            </Link>
         </div>
         <p className="text-sm font-light my-2 ">
            Copyright © 2023 - LaLory Patterns
         </p>
      </footer>
   )
}