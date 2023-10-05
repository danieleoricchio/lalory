import Products from "@/components/products"
import LoadingSpin from "@/components/loadingspin"
import { getCategories } from "@/lib/funcs"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Suspense } from "react"

type Props = {
   searchParams: {
      category: string
   }
}

export default async function Page({searchParams}: Props) {
   const categories = await getCategories()
   return (
      <div>
         <h1 className="text-center font-bold text-2xl mb-4 pt-4 lg:pt-0 lg:mt-4">Prodotti</h1>
         <div className="flex justify-center items-center gap-4 flex-wrap lg:w-1/2 lg:mx-auto mb-4">
            <Link className="px-4 py-2 text-center border-primary border-2 rounded text-primary font-semibold hover:bg-primary hover:text-white scale-95 hover:scale-100 transition-all duration-300" href="/shop">
               Tutti
            </Link>
            {
               categories.map((category, index) => (
                  <Link key={index} className={cn("px-4 py-2 text-center border-primary border-2 rounded text-primary font-semibold hover:bg-primary hover:text-white scale-95 hover:scale-100 transition-all duration-300", searchParams.category === category ? "bg-primary text-white" : "")} href={`/shop?category=${category}`}>
                     {category}
                  </Link>
               ))
            }
         </div>
         <Suspense fallback={<LoadingSpin />}>
            <Products category={searchParams.category} classNamesGrid="grid-cols-2 lg:grid-cols-3"/>
         </Suspense>
         <div className="h-[33vh]"/>
      </div>
   )
}