import { getProduct } from "@/lib/funcs"
import { notFound } from "next/navigation"
import Immagini from "./immagini"
import Products from "@/components/products"
import LoadingSpin from "@/components/loadingspin"
import AggiungiAlCarrello from "./aggiungialcarrello"
import { Suspense } from "react"

type Props = {
   params: {
      slug: string
   }
}

export default async function Page({params}: Props) {
   const product = await getProduct(params.slug)
   if (!product) return notFound()
   return (
      <>
      <div className="lg:grid grid-cols-2 gap-8 px-8 lg:px-[50px] xl:px-[100px] md:px-[60px] pt-4 lg:pt-0 lg:mt-4">
         <div>
            <h1 className="font-semibold text-3xl lg:hidden pb-4">{product.name}</h1>
            <Immagini product={product}/>
         </div>
         <div>
            <h1 className="font-bold text-3xl hidden lg:block">{product.name}</h1>
            <p className="mt-4 lg:mt-2 font-semibold text-lg">{(product.price as number).toFixed(2)}€</p>
            <p className="mt-4 lg:mt-2 text-[15px] font-light">{product.description}</p>
            <AggiungiAlCarrello slug={params.slug}/> 
         </div>
      </div>
      <div className="px-8 lg:px-0">
         <h2 className="text-center font-bold text-2xl mb-4 mt-4 lg:mt-2">Prodotti correlati</h2>
         <Suspense fallback={<LoadingSpin />}>
            <Products take={3} category={product.category} classNamesTitolo="font-medium text-base max-sm:text-sm" classNamesPrezzo="text-sm"/>
         </Suspense>
      </div>
      </>
   )
}