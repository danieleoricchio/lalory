import { searchProducts } from "@/lib/funcs"
import SearchBar from "./searchbar"
import Products from "@/components/products"
import LoadingSpin from "@/components/loadingspin"
import { Suspense } from "react"

type Props = {
   searchParams: {
      q: string
   }
}

export default async function Page({searchParams}: Props) {
   let products: any[] = []
   if (searchParams.q != undefined || searchParams.q != "") {
      products = await searchProducts(searchParams.q)
   }
   return (
      <div className="px-8 lg:px-[50px] xl:px-[100px] pt-4">
         <SearchBar />
         <div>
            {
               searchParams.q == undefined || searchParams.q == "" ? (
                  <div className="text-center text-2xl font-semibold mt-[30px]">
                     Comincia a cercare!
                  </div>
               ) : products.length == 0 ? (
                  <div className="text-center text-2xl font-semibold mt-[30px]">
                     Nessun risultato per <span className="font-bold">{searchParams.q}</span>
                  </div>
               ) : (
                  <div className="mt-4">
                     <Suspense fallback={<LoadingSpin />}>
                        <Products products={products} classNamesGrid="grid-cols-2 max-sm:px-0 lg:grid-cols-3"/>
                     </Suspense>
                  </div>
               )
            }

         </div>
         <div className="h-[80vh]"/>
      </div>
   )
}