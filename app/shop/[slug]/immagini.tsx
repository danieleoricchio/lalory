"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

type Props = {
   product: any
}

export default function Page({product}: Props) {
   const [current, setCurrent] = useState(0)
   return (
      <div>
         <Link className="cursor-pointer" href={product.images[current]}>
            <div className="xl:aspect-square lg:aspect-[9/12] aspect-square shadow w-full relative rounded overflow-hidden">
               <Image alt={product.name} src={product.images[current]} fill className="object-cover" priority />
            </div>
         </Link>
         <div className="mt-2 grid grid-cols-4 xl:grid-cols-6 w-full px-4">
            {
               product.images.map((image:string, index:number) => {
                  return (
                     <div className="aspect-square shadow-sm w-16 relative rounded overflow-hidden cursor-pointer" key={index} onClick={() => setCurrent(index)}>
                        <Image alt={product.name} src={image} fill className="object-cover" />
                     </div>
                  )
               })
            }
         </div>
      </div>
   )
}