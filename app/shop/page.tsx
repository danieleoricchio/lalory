import Products from "@/components/products"
import LoadingSpin from "@/components/loadingspin"
import { getCategories } from "@/lib/funcs"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Suspense } from "react"
import type { Metadata } from "next"
import Filters from "./filters"

type Props = {
   searchParams: {
      category: string,
      orderBy: string
   }
}

export const metadata: Metadata = {
   title: "Shop",
   description: "Shop of LaLory E-Commerce",
};

export default async function Page({searchParams}: Props) {
   const categories = await getCategories()
   //check if order by is valid and category is valid
   let categoryFilter: string, orderByFilter: string
   if (searchParams.category && !categories.includes(searchParams.category)) { categoryFilter = "" } else { categoryFilter = searchParams.category }
   return (
      <div>
         <h1 className="text-center font-bold text-2xl mb-4 pt-4 lg:pt-0 lg:mt-4">Shop</h1>
         <div className="lg:flex">
            <Filters categories={categories} categoryFilter={categoryFilter}/>
            <Suspense fallback={<LoadingSpin />}>
               <Products category={categoryFilter != "" ? categoryFilter : undefined} orderBy={searchParams.orderBy} classNamesGrid="grid-cols-2 lg:grid-cols-3 w-full"/>
            </Suspense>
         </div>
         <div className="h-[33vh]"/>
      </div>
   )
}