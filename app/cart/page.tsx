import { getCart } from "@/lib/funcs"
import Image from "next/image"
import Link from "next/link"
import EliminaDalCarrello from "./eliminadalcarrello"
import Products from "@/components/products"
import LoadingSpin from "@/components/loadingspin"
import Checkout from "./checkout"
import { Suspense } from "react"

type Props = {
   
}

export default async function Page({}: Props) {
   const cart = await getCart()
   if (!cart) {
      return (
         <div className="lg:p-12 p-4">
            <h1 className="text-3xl font-semibold">Carrello</h1>
            <div className="mt-4">
               <div className="lg:w-3/4 w-full ">
                  <p>Il carrello è vuoto</p>
                  <p>Vai allo <Link href="/shop" className="underline font-medium">shop</Link> per aggiungere prodotti!</p>
               </div>
            </div>
            <h2 className="py-6 text-2xl font-semibold">Prodotti consigliati</h2>
            <Suspense fallback={<LoadingSpin />}>
               <Products take={3} classNamesGrid="lg:px-[150px]" classNamesTitolo="max-sm:text-sm" classNamesPrezzo="max-sm:text-sm" classNamesImage="lg:aspect-square lg:w-[250px] lg:mt-8"/>
            </Suspense>
            <div className="h-[30vh] lg:h-0"/>
         </div>
      )
   }

   let total = 0
   for (let index = 0; index < cart.products.length; index++) {
      const element = cart.products[index].product;
      total += element.price
   }

   return (
      <div className="lg:p-12 p-4">
         <h1 className="text-3xl font-semibold ">Carrello</h1>
         <div className="lg:mt-4 flex flex-col lg:flex-row w-full">
            {
               cart._count.products === 0 ? (
                  <div className="lg:w-3/4 w-full lg:px-8">
                     <p>Il carrello è vuoto</p>
                     <p>Vai allo <Link href="/shop" className="underline font-medium">shop</Link> per aggiungere prodotti!</p>
                  </div>
               ) : (
                  <div className="lg:w-3/4 px-4 lg:px-0 divide-y">
                     {
                        cart.products.map(({product}:any, index:any) => (
                           <div key={index} className="w-full py-4 lg:pr-8 flex items-start gap-2">
                              <div className="relative aspect-square rounded-md w-[100px] lg:w-[150px] overflow-hidden">
                                 <Image alt={product.name} src={product.images[0].url} fill className="object-cover"/>
                              </div>
                              <div className="">
                                 <Link href={"/shop/"+product.slug} className="lg:text-lg font-medium max-sm:text-sm">{product.name}</Link>
                                 <p className=" font-semibold max-sm:text-sm">{(product.price as number).toFixed(2)}€</p>
                              </div>
                              <div className="ml-auto">
                                 <EliminaDalCarrello slug={product.slug}/>
                              </div>
                           </div>
                        ))
                     }
                  </div>
               )
            }
            <div className="lg:w-1/4">
               <div className="lg:w-2/3 w-4/5 mx-auto">
                  <div className="divide-y">
                     <div>
                        <h2 className="font-bold text-lg">Riepilogo dell{"\'"}ordine</h2>
                        <div className="max-sm:text-sm flex py-2 items-center justify-between">
                           <p className="font-semibold">Subtotale: </p>
                           <span className="font-normal">{total.toFixed(2)}€</span>
                        </div>
                        <div className=" max-sm:text-sm flex pb-4 items-center justify-between">
                           <p className="font-semibold">Spedizione: </p>
                           <span className="font-normal">0€</span>
                        </div>
                     </div>
                     <div className="max-sm:text-sm flex py-4 items-center justify-between">
                        <p className="font-semibold">Totale: </p>
                        <span className="font-normal">{total.toFixed(2)}€</span>
                     </div>
                  </div>
               </div>
               {
                  cart._count.products === 0 ? null :
                  <Checkout disabled={total == 0} />
               }
            </div>
         </div>
         <h2 className="py-6 text-2xl font-semibold">Prodotti consigliati</h2>
         <Suspense fallback={<LoadingSpin />}>
            <Products take={3} classNamesGrid="lg:px-[150px]" classNamesImage="lg:aspect-square lg:w-[250px] lg:mt-8"/>
         </Suspense>
         { cart._count.products === 0 && <div className="h-[30vh] lg:h-0"/> }
      </div>
   )
}