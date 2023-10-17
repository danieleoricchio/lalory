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
   products?: any,
   orderBy?: string
}

export default async function Page({take, category, classNamesPrezzo, classNamesTitolo, classNamesGrid, products, classNamesImage, orderBy}: Props) {
   let data;
   if (!products) {
      data = await getProducts(take, category)
      if (data.length == 0) return (
         <div className="xl:px-[100px] px-[50px]">
            Nessun prodotto trovato
         </div>
      )
      if (orderBy) {
         data.sort((a, b) => {
            if (orderBy == "nameCr") {
               if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
               else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
               else return 0
            } else if (orderBy == "nameDe") {
               if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
               else if (a.name.toLowerCase() > b.name.toLowerCase()) return -1
               else return 0
            } else if (orderBy == "priceCr") {
               if (a.price < b.price) return -1
               else if (a.price > b.price) return 1
               else return 0
            } else if (orderBy == "priceDe") {
               if (a.price < b.price) return 1
               else if (a.price > b.price) return -1
               else return 0
            } else if (orderBy == "updatedAtCr") {
               if (a.updatedAt < b.updatedAt) return -1
               else if (a.updatedAt > b.updatedAt) return 1
               else return 0
            } else if (orderBy == "updatedAtDe") {
               if (a.updatedAt < b.updatedAt) return 1
               else if (a.updatedAt > b.updatedAt) return -1
               else return 0
            } else return 0
         })
      }
   } else {data = products}
   return (
      <div className={cn("grid grid-cols-3 gap-6 px-8 lg:px-[50px] xl:px-[100px]", classNamesGrid)}>
         {
            data.map((product:any) => {
               return (
                  <>
                     <Link href={"/shop/"+product.slug} key={product.id}>
                        <div className={cn("relative w-full aspect-[9/12] md:aspect-[4/6] lg:aspect-[9/12] shadow-sm rounded overflow-hidden group mx-auto", classNamesImage)}>
                           <Image alt={product.name} src={product.images[0]} fill className="object-cover group-hover:scale-105 transition-all duration-200" priority/>
                        </div>
                        <h2 className={cn("xl:font-medium text-center lg:text-xl xl:text-2xl pt-2 line-clamp-2", classNamesTitolo)}>{product.name}</h2>
                        <p className={cn("text-center xl:font-normal lg:text-base text-sm font-light", classNamesPrezzo)}>{(product.price as number).toFixed(2)}€</p>
                     </Link>
                  </>
               )
            })
         }
      </div>
   )
}