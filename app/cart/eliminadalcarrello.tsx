"use client"

import { removeFromCart } from "@/lib/funcs"
import { Loader2, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

type Props = {
   slug: string
}

export default function Page({slug}: Props) {
   const [loading, setLoading] = useState(false)
   const router = useRouter()
   async function click() {
      try {
         setLoading(true)
         const status = await removeFromCart(slug)
         if (status) {
            toast.success('Prodotto eliminato dal carrello')
            router.refresh()
         } else {
            toast.error('Impossibile eliminare il prodotto dal carrello')
         }
      } catch (error) {
         console.log(error);
         toast.error('Errore durante l\'eliminazione dal carrello')
      } finally {
         setLoading(false)
      }
   }
   return (
      <button onClick={click} disabled={loading} className="bg-red-500 text-white px-2 py-1 rounded-md mt-2 lg:mt-4 text-base">
         {
            loading ? <Loader2 className="animate-spin lg:h-5 h-4"/> : <Trash2 className="lg:h-5 h-4"/>
         }
      </button>
   )
}