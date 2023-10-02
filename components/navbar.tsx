"use client"

import { getCartProductsNumber } from "@/lib/funcs"
import { cn } from "@/lib/utils"
import { Menu, Search, ShoppingCart, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

type Props = {
   
}

export default function Page({}: Props) {
   //TODO: usare react-query 
   const [numberProducts, setNumberProducts] = useState(0)
   const uguale = "bg-primary transition-all duration-300"

   async function numero(){
      setNumberProducts(await getCartProductsNumber())
   }

   useEffect(() => {
      window.addEventListener("scroll", () => {
         const nav = document.getElementById("nav1")
         
         if (nav) {
            const homediv = document.getElementById("homenav")
            
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

      numero()

      return () => {
         window.removeEventListener("scroll", () => {})
      }
   }, [])

   function toggleNavPhone() {
      const nav = document.getElementById("navphone")
      if (nav) {
         nav.style.width = nav.style.width === "0px" ? "80%" : "0"
      }
   }

   return (
      <>
         <nav className="transition-all duration-300 hidden lg:block fixed z-10 w-full" id="nav1">
            <div className="relative py-7 text-center bg-white shadow w-2/3 mx-auto text-3xl font-bold transition-all duration-50" id="divhomenav">
               <Link href={"/"} id="homenav">
                  Home
               </Link>
               <div className="absolute top-8 right-8">
                  <Link href={"/cart"} className="flex gap-2 items-center">
                     <ShoppingCart className="text-3xl"/>
                     {
                        /* numberProducts < 1 ? null : (
                           <span className="text-xl">{numberProducts}</span>
                        ) */
                     }
                  </Link>
               </div>
            </div>
            <div className="flex gap-6 justify-center items-center text-white shadow w-2/3 mx-auto font-semibold p-4 rounded-b-md text-lg bg-primary">
               <Link href={"/shop"} className="hover:text-white/80 transition-all duration-200  ">
                  Shop
               </Link>
               <Link href={"/contact"} className="hover:text-white/80 transition-all duration-200  ">
                  Contatti
               </Link>
               <Link href={"/chi-siamo"} className="hover:text-white/80 transition-all duration-200  ">
                  Chi siamo
               </Link>
               <Link href={"/search"} className="hover:text-white/80 transition-all duration-200  ">
                  Cerca
               </Link>
            </div>
         </nav>
         <nav className={cn(uguale, "flex justify-between lg:hidden p-4 text-white")}>
            <Menu onClick={e=>toggleNavPhone()}/>
            <Link href={"/"} className="font-semibold">
               Home
            </Link>
            <Link href={"/search"}>
               <Search />
            </Link>
         </nav>
         <nav className="fixed bg-primary left-0 top-0 h-full z-20 transition-all duration-300 overflow-hidden" style={{width: "0px"}} id="navphone">
            <X onClick={e=>toggleNavPhone()} className="absolute right-4 top-4 text-white cursor-pointer"/>
            <div className="flex w-full flex-col py-[80px] justify-start items-center gap-6">
               <Link href={"/shop"} className="font-semibold text-white text-lg" onClick={e=>toggleNavPhone()}>
                  Shop
               </Link>
               <Link href={"/contact"} className="font-semibold text-white text-lg" onClick={e=>toggleNavPhone()}>
                  Contatti
               </Link>
               <Link href={"/chi-siamo"} className="font-semibold text-white text-lg" onClick={e=>toggleNavPhone()}>
                  Chi siamo
               </Link>
               <Link href={"/cart"} className="font-semibold text-white text-lg" onClick={e=>toggleNavPhone()}>
                  Carrello
               </Link>
            </div>
         </nav>
      </>
   )
}