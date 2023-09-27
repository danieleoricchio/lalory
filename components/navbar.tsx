"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useEffect } from "react"

type Props = {
   
}

export default function Page({}: Props) {
   const uguale = "bg-primary transition-all duration-300"

   useEffect(() => {
      window.addEventListener("scroll", () => {
         const nav = document.getElementById("nav1")
         console.log(nav);
         
         if (nav) {
            const homediv = document.getElementById("homenav")
            console.log(homediv);
            
            if (!homediv) return
            if (window.scrollY > 120) {
               document.getElementById("divhomenav")?.classList.remove("py-7")
               document.getElementById("divhomenav")?.classList.add("py-2")
               homediv.classList.remove("text-3xl")
               homediv.classList.add("text-xl")
            } else {
               document.getElementById("divhomenav")?.classList.remove("py-2")
               document.getElementById("divhomenav")?.classList.add("py-7")
               homediv.classList.remove("text-xl")
               homediv.classList.add("text-3xl")
            }
         }
      })

      return () => {
         window.removeEventListener("scroll", () => {})
      }
   }, [])

   return (
      <>
         <nav className="transition-all duration-300 hidden lg:block fixed z-10 w-full" id="nav1">
            <div className="py-7 text-center bg-white shadow w-2/3 mx-auto text-3xl font-bold transition-all duration-50" id="divhomenav">
               <Link href={"/"} id="homenav">
                  Home
               </Link>
            </div>
            <div className="flex gap-6 justify-center items-center shadow w-2/3 mx-auto font-light p-4 rounded-b-md text-lg bg-primary">
               <Link href={"/"} className="hover:text-black/60 transition-all duration-200  ">
                  Shop
               </Link>
               <Link href={"/"} className="hover:text-black/60 transition-all duration-200  ">
                  Contatti
               </Link>
               <Link href={"/"} className="hover:text-black/60 transition-all duration-200  ">
                  Chi siamo
               </Link>
            </div>
         </nav>
         <nav className={cn(uguale, "flex lg:hidden ")}>

         </nav>
      </>
   )
}