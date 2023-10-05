"use client"

import { addToCart } from "@/lib/funcs"
import { useQueryClient } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

type Props = {
   slug: string
}

export default function Page({slug}: Props) {
   const [loading, setLoading] = useState(false)
   const { invalidateQueries } = useQueryClient()
   //const router = useRouter()

   async function Aggiungi(){
      try {
         setLoading(true)
         const status = await addToCart(slug)
         if (status == 201) {
            toast.success('Prodotto aggiunto al carrello')
            //invalidateQueries(["cartProductsNumber"])
            //router.refresh()
         } else if (status == 200) {
            toast('Prodotto gia aggiunto al carrello', {
               icon: '❌',
            });
         } else {
            toast.error('Impossibile aggiungere il prodotto al carrello')
         }
      } catch (error) {
         console.log(error);
         toast.error('Errore durante l\'aggiunta al carrello')
      } finally {
         setLoading(false)
      }
   } 

   return (
      <button onClick={Aggiungi} disabled={loading} className="flex disabled:opacity-75 disabled:bg-opacity-75 disabled:cursor-not-allowed bg-primary mt-4 lg:mt-2 text-white lg:p-4 px-4 py-2  rounded font-semibold transition-all duration-300 hover:bg-opacity-75">
         {
            loading && <Loader2 className="animate-spin text-xl mr-2"/>
         }
         Aggiungi al carrello
      </button>
   )
}