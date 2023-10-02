import Image from "next/image"
import Link from "next/link"
import { getProducts } from "@/lib/funcs"
import { cn } from "@/lib/utils"

type Props = {
   take?: number
   category?: string
   classNamesTitolo?: string
   classNamesPrezzo?: string
   classNamesGrid?: string,
   classNamesImage?: string,
   products?: any
}

export default async function Page({take, category, classNamesPrezzo, classNamesTitolo, classNamesGrid, products, classNamesImage}: Props) {
   let data;
   if (!products) {
      data = await getProducts(take, category)
      if (data.length == 0) return (
         <div className="xl:px-[100px] px-[50px]">
            Nessun prodotto trovato
         </div>
      )
   } else {data = products}
   return (
      <div className={cn("grid grid-cols-3 gap-6 px-8 lg:px-[50px] xl:px-[100px]", classNamesGrid)}>
         {
            data.map((product:any) => {
               return (
                  <>
                     <Link href={"/shop/"+product.slug} key={product.id}>
                        <div className={cn("relative w-full aspect-[9/12] shadow-sm rounded overflow-hidden group mx-auto", classNamesImage)}>
                           <Image alt={product.name} src={product.images[0]} fill className="object-cover group-hover:scale-105 transition-all duration-200" priority/>
                        </div>
                        <h2 className={cn("xl:font-medium text-center lg:text-xl xl:text-2xl pt-2", classNamesTitolo)}>{product.name}</h2>
                        <p className={cn("text-center xl:font-normal lg:text-base text-sm font-light", classNamesPrezzo)}>{(product.price as number).toFixed(2)}€</p>
                     </Link>
                  </>
               )
            })
         }
      </div>
   )
}