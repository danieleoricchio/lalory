import Products from "@/components/products"
import { ChevronsRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import LoadingSpin from "@/components/loadingspin"
import Cover from "@/components/cover"
import { revalidateTag } from "next/cache"

export default function Page() {
   revalidateTag("products")
   revalidateTag("cover")
   revalidateTag("categories")
   return (
      <div>
         <Suspense fallback={<LoadingSpin />}>
            <Cover />
         </Suspense>
         <h1 className="text-center font-bold text-2xl mt-0 pt-4 lg:pt-0 mb-4 lg:mt-2">Prodotti</h1>
         <Suspense fallback={<LoadingSpin />}>
            <Products take={6} classNamesGrid="grid-cols-2 lg:grid-cols-3"/>
         </Suspense>
         <div className="bg-primary text-center text-white text-sm lg:text-base font-light py-4 px-6 lg:py-6 lg:px-12 space-y-4 lg:space-y-8 mt-6">
            <h2 className="text-2xl font-bold">Riguardo me stessa</h2>
            <p>LaLory è il luogo in cui condivido la mia passione per il cucito del guardaroba dei miei sogni, ispirato al prêt-à-porter di lusso. Attraverso modelli di cucito esclusivi e attenti ai dettagli, il mio obiettivo è aiutarti a creare bellissimi vestiti che amerai per sempre.</p>
            <p className="hover:underline font-medium"><Link href="/about">Leggi di piu riguardo a quello che faccio <ChevronsRight className="text-white inline-block lg:-mt-1" size={20}/></Link></p>
         </div>
         <div className="text-center text-sm lg:text-base font-light py-4 px-6 lg:py-6 lg:px-12 space-y-4 lg:space-y-8 mt-4">
            <h2 className="text-2xl font-bold">Stiamo in contatto!</h2>
            <p>Se hai bisogno di informazione riguardo alle taglie, a come li produco, a qualsiasi cosa, inviami un messaggio!</p>
            <div><Link className="hover:bg-opacity-90 transition-all duration-200 font-medium bg-primary text-white px-4 py-2 rounded lg:px-8 lg:py-4" href="/contact">Contattami <ChevronsRight className="inline-block lg:-mt-1" size={20}/></Link></div>
         </div>
      </div>
   )
}