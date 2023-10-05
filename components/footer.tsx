type Props = {
   
}

import { Facebook, Instagram } from "lucide-react"
import Link from "next/link"
import { BsPinterest } from "react-icons/bs"
import { HiOutlineMail } from "react-icons/hi"

export default function Page({}: Props) {
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
            <Link href="mailto:lalory@gmail.com" className="cursor-pointer hover:scale-105 transition-all duration-100">
               <HiOutlineMail className="text-white text-2xl"/>
            </Link>
         </div>
         <p className="text-sm font-light my-2 ">
            Copyright © 2023 - LaLory Patterns
         </p>
         <div className="my-2 grid grid-cols-2 lg:flex lg:flex-row lg:justify-around">
            <Link href="/" className="text-sm font-light hover:underline">
               Home
            </Link>
            <Link href="/privacy" className="text-sm font-light hover:underline">
               Privacy Policy
            </Link>
            <Link href="/faq" className="text-sm font-light hover:underline">
               FAQ
            </Link>
            <Link href="/sizing" className="text-sm font-light hover:underline">
               Guida alle taglie
            </Link>
         </div>
         <p className="text-sm font-light my-2">Created and Published By Lorenzo Raia, <Link href="https://lorenzoraia.it" className="underline" target="_blank">lorenzoraia.it</Link></p>
      </footer>
   )
}