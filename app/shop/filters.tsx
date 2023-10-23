"use client"

import { cn, createUrl } from "@/lib/utils"
import Link from "next/link"

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select"
 import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowDown01, ArrowDownAZ, ArrowDownNarrowWide, ArrowUp01, ArrowUpAZ, ArrowUpNarrowWide } from "lucide-react"
 

type Props = {
   categories: string[],
   categoryFilter: string
}
type PushProps = {
   category: string
} | {
   orderBy: string
}

export default function Page({categories, categoryFilter}: Props) {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   function replace(props: PushProps) {
      const newSearchParams = new URLSearchParams(searchParams);
      if ("category" in props) {
         if (props.category == "All") newSearchParams.delete("category")
         else newSearchParams.set("category", props.category)
      } else if ("orderBy" in props) {
         newSearchParams.set("orderBy", props.orderBy)
      }
      router.replace(createUrl(pathname, newSearchParams))
   }

   return (
      <>
         <div className="hidden lg:block w-2/3 lg:w-1/4 lg:pl-4 xl:w-[10%] xl:pl-8">
            <div className="flex justify-center items-center lg:flex-col lg:justify-start lg:items-start gap-4 flex-wrap mb-4 w-full">
               <span onClick={e=>replace({category: "All"})} className={cn("cursor-pointer px-4 py-2 text-left border-primary border-2 rounded text-primary font-semibold hover:max-sm:bg-primary hover:max-sm:text-white scale-95 hover:max-sm:scale-100 transition-all duration-300 lg:p-0 lg:border-0 lg:text-xl lg:uppercase lg:text-black lg:font-bold", categoryFilter == "" ? "bg-primary text-white lg:bg-white lg:text-primary" : "")} >
                  Tutti
               </span>
               {
                  categories.map((category, index) => (
                     <span onClick={e=>replace({category})} key={index} className={cn("cursor-pointer px-4 py-2 text-center border-primary border-2 rounded text-primary font-semibold hover:max-sm:bg-primary hover:max-sm:text-white scale-95 hover:max-sm:scale-100 transition-all duration-300 lg:p-0 lg:border-0 lg:text-xl lg:uppercase lg:text-black lg:font-bold", categoryFilter === category ? "bg-primary text-white lg:bg-white lg:text-primary" : "")} >
                        {category}
                     </span>
                  ))
               }
            </div>
            {/* <div className="flex flex-col w-full justify-start items-start">
               <span className={cn("cursor-pointer px-4 py-2 border-primary border-2 rounded text-primary font-semibold hover:max-sm:bg-primary hover:max-sm:text-white scale-95 hover:max-sm:scale-100 transition-all duration-300 lg:p-0 lg:border-0 lg:text-xl lg:uppercase lg:text-black lg:font-bold", searchParams.get("orderBy")! === "nameCr" ? "bg-primary text-white lg:bg-white lg:text-primary" : "")}>nome (cr.)</span>
               <span className={cn("cursor-pointer px-4 py-2 border-primary border-2 rounded text-primary font-semibold hover:max-sm:bg-primary hover:max-sm:text-white scale-95 hover:max-sm:scale-100 transition-all duration-300 lg:p-0 lg:border-0 lg:text-xl lg:uppercase lg:text-black lg:font-bold", searchParams.get("orderBy")! === "nameDe" ? "bg-primary text-white lg:bg-white lg:text-primary" : "")}>nome (decr.)</span>
               <span className={cn("cursor-pointer px-4 py-2 border-primary border-2 rounded text-primary font-semibold hover:max-sm:bg-primary hover:max-sm:text-white scale-95 hover:max-sm:scale-100 transition-all duration-300 lg:p-0 lg:border-0 lg:text-xl lg:uppercase lg:text-black lg:font-bold", searchParams.get("orderBy")! === "updatedAtCr" ? "bg-primary text-white lg:bg-white lg:text-primary" : "")}>pubblicazione (cr.)</span>
               <span className={cn("cursor-pointer px-4 py-2 border-primary border-2 rounded text-primary font-semibold hover:max-sm:bg-primary hover:max-sm:text-white scale-95 hover:max-sm:scale-100 transition-all duration-300 lg:p-0 lg:border-0 lg:text-xl lg:uppercase lg:text-black lg:font-bold", searchParams.get("orderBy")! === "updatedAtDe" ? "bg-primary text-white lg:bg-white lg:text-primary" : "")}>pubblicazione (decr.)</span>
               <span className={cn("cursor-pointer px-4 py-2 border-primary border-2 rounded text-primary font-semibold hover:max-sm:bg-primary hover:max-sm:text-white scale-95 hover:max-sm:scale-100 transition-all duration-300 lg:p-0 lg:border-0 lg:text-xl lg:uppercase lg:text-black lg:font-bold", searchParams.get("orderBy")! === "priceCr" ? "bg-primary text-white lg:bg-white lg:text-primary" : "")}>prezzo (cr.)</span>
               <span className={cn("cursor-pointer px-4 py-2 border-primary border-2 rounded text-primary font-semibold hover:max-sm:bg-primary hover:max-sm:text-white scale-95 hover:max-sm:scale-100 transition-all duration-300 lg:p-0 lg:border-0 lg:text-xl lg:uppercase lg:text-black lg:font-bold", searchParams.get("orderBy")! === "priceDe" ? "bg-primary text-white lg:bg-white lg:text-primary" : "")}>prezzo (decr.)</span>
            </div> */}
         </div>
         <div className="lg:hidden grid grid-cols-2 gap-4 mb-4 px-4">
            <Select onValueChange={e=>replace({category: e})}>
               <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoria" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="All">Tutti</SelectItem>
                  {
                     categories.map((category, index) => (
                        <SelectItem key={index} value={category}>{category}</SelectItem>
                     ))
                  }
               </SelectContent>
            </Select>
            <Select onValueChange={e=>replace({orderBy:e})}>
               <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordina per" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="nameCr" className="flex items-center" icon={<ArrowDownAZ />}>Nome (crescente)</SelectItem>
                  <SelectItem value="nameDe" className="flex items-center" icon={<ArrowUpAZ />}>Nome (decrescente)</SelectItem>
                  <SelectItem value="updatedAtCr" className="flex items-center" icon={<ArrowDownNarrowWide />}>Pubblicato il (crescente)</SelectItem>
                  <SelectItem value="updatedAtDe" className="flex items-center" icon={<ArrowUpNarrowWide />}>Pubblicato il (decrescente)</SelectItem>
                  <SelectItem value="priceCr" className="flex items-center" icon={<ArrowDown01 />}>Prezzo (crescente)</SelectItem>
                  <SelectItem value="priceDe" className="flex items-center" icon={<ArrowUp01 />}>Prezzo (decrescente)</SelectItem>
               </SelectContent>
            </Select>
         </div>
      </>
   )
}