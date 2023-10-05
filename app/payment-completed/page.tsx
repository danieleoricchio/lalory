import Products from "@/components/products"
import { Suspense } from "react"
import LoadingSpin from "@/components/loadingspin"

type Props = {
   searchParams: {
      success: number
   }
}

export default function Page({searchParams}: Props) {
   const success = searchParams.success == 1
   
   return (
      <div>
         <div className="lg:p-12 p-4">
            {
               success ? (
                  <>
                     <h1 className="text-3xl font-semibold">Pagamento completato</h1>
                     <div className="mt-4">
                        <div className="lg:w-3/4 w-full ">
                           <p>Il tuo pagamento è stato completato con successo!</p>
                           <p>Il tuo ordine è stato registrato e ti verrà inviata la mail con il tuo prodotto il prima possibile.</p>
                        </div>
                     </div>
                  </>
               ) : (
                  <>
                     <h1 className="text-3xl font-semibold">Pagamento fallito</h1>
                     <div className="mt-4">
                        <div className="lg:w-3/4 w-full ">
                           <p>Il tuo pagamento è fallito.</p>
                           <p>Controlla di aver inserito correttamente i dati della carta e riprova.</p>
                        </div>
                     </div>
                  </>
               )
            }
            <h2 className="py-6 text-2xl font-semibold">Prodotti consigliati</h2>
            <Suspense fallback={<LoadingSpin />}>
               <Products take={3} classNamesGrid="lg:px-[150px]" classNamesTitolo="max-sm:text-sm" classNamesPrezzo="max-sm:text-sm" classNamesImage="lg:aspect-square lg:w-[250px] lg:mt-8"/>
            </Suspense>
            <div className="h-[30vh] lg:h-0"/>
         </div>
      </div>
   )
}