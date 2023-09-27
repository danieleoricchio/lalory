import Image from "next/image"
import Link from "next/link"

type Props = {
   
}

async function getData() {
   try {
      const res = await fetch("http://localhost:3550/api/products", { next: { tags: ['products'] } })
      const data: any[] = await res.json()
      return data
   } catch (error) {
      return []
   }
}

export default async function Page({}: Props) {
   let data = await getData()
   if (data.length == 0) return (<div>errore</div>)
   data = data.slice(0, 6)
   return (
      <div className="grid grid-cols-3 gap-6 px-[100px]">
         {
            data.map((product: any) => {
               return (
                  <>
                  <Link href={"/"} key={product.id}>
                     <div className="relative w-full h-[390px] lg:h-[500px] rounded overflow-hidden">
                        <Image alt={product.name} src={product.images[0]} fill className="object-cover" />
                     </div>
                     <h2 className="font-semibold text-center text-2xl pt-2">{product.name}</h2>
                     <p className="text-center">{(product.price as number).toFixed(2)}€</p>
                  </Link>
                  </>
               )
            })
         }
      </div>
   )
}