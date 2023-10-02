import { getCart } from "@/lib/funcs"
import Image from "next/image"
import Link from "next/link"
import EliminaDalCarrello from "./eliminadalcarrello"
import Products from "@/components/products"

type Props = {
   
}

export default async function Page({}: Props) {
   const cart = await getCart()
   if (!cart) {
      return (
         <div>
            <h1 className="text-3xl font-semibold pl-6 py-2">Carrello</h1>
            <div className="mt-4">
               <div className="w-3/4 px-8">
                  <p>Il carrello è vuoto</p>
                  <p>Vai allo <Link href="/shop" className="underline font-medium">shop</Link> per aggiungere prodotti!</p>
               </div>
            </div>
            <h2 className="py-6 text-2xl pl-6 font-semibold">Prodotti consigliati</h2>
            <Products take={3} classNamesGrid="lg:px-[150px]" classNamesImage="lg:aspect-square lg:w-[250px] lg:mt-4"/>
         </div>
      )
   }

   let total = 0
   for (let index = 0; index < cart.products.length; index++) {
      const element = cart.products[index].product;
      total += element.price
   }

   return (
      <div>
         <h1 className="text-3xl font-semibold pl-6 pt-4 lg:py-2 lg:pt-0">Carrello</h1>
         <div className="lg:mt-4 flex flex-col lg:flex-row w-full">
            {
               cart._count.products === 0 ? (
                  <div className="lg:w-3/4 lg:px-8">
                     <p>Il carrello è vuoto</p>
                     <p>Vai allo <Link href="/shop" className="underline font-medium">shop</Link> per aggiungere prodotti!</p>
                  </div>
               ) : (
                  <div className="lg:w-3/4 px-4 lg:px-0 divide-y">
                     {
                        cart.products.map(({product}:any, index:any) => (
                           <div key={index} className="w-full py-4 lg:px-8 flex items-center gap-2 lg:gap-4">
                              <div className="relative aspect-square rounded-md w-[100px] lg:w-[200px] overflow-hidden">
                                 <Image alt={product.name} src={product.images[0].url} fill className="object-cover"/>
                              </div>
                              <div className="">
                                 <Link href={"/shop/"+product.slug} className="lg:text-xl underline-offset-2 hover:lg:underline font-medium underline lg:no-underline">{product.name}</Link>
                                 <p className="lg:text-2xl font-semibold lg:mt-2">{product.price}€</p>
                                 <EliminaDalCarrello slug={product.slug}/>
                              </div>
                           </div>
                        ))
                     }
                  </div>
               )
            }
            <div className="lg:w-1/4">
               <div className="w-2/3 lg:w-1/2 mx-auto">
                  <div className="divide-y">
                     <p className="py-2 font-semibold">Subtotale: <span className="font-normal">{total}€</span></p>
                     <p className="py-2 font-semibold">Totale: <span className="font-normal">{total}€</span></p>
                  </div>
               </div>
               {
                  cart._count.products === 0 ? null :
                  <button disabled={total == 0} className="bg-primary p-4 rounded-md text-white font-semibold mx-auto block w-2/3 disabled:cursor-not-allowed disabled:opacity-50">Paga</button>
               }
            </div>
         </div>
         <h2 className="py-6 text-2xl pl-6 font-semibold">Prodotti consigliati</h2>
         <Products take={3} classNamesGrid="lg:px-[150px]" classNamesImage="lg:aspect-square lg:w-[250px] lg:mt-8"/>
      </div>
   )
}