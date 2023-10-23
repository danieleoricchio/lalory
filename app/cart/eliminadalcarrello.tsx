"use client"

import { useCartProducts } from "@/components/cartcontext"
import { removeFromCart } from "@/lib/funcs"
//import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

type Props = {
   slug: string
}

export default function Page({slug}: Props) {
   const [loading, setLoading] = useState(false)
   const { decrement } = useCartProducts()
   const router = useRouter()

   async function click() {
      try {
         setLoading(true)
         const id = toast.loading("Sto eliminando dal carrello...")
         const status = await removeFromCart(slug)
         if (status) {
            toast.success('Prodotto eliminato dal carrello', {id})
            decrement()
            router.refresh()
         } else {
            toast.error('Impossibile eliminare il prodotto dal carrello', {id})
         }
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false)
      }
   }
   return (
      <button onClick={click} disabled={loading} className=" text-red-500 mt-2 text-base">
         {
            loading ? <Loader2 className="animate-spin lg:h-5 h-4"/> : <Trash2 className="lg:h-5 h-4"/>
         }
      </button>
   )
}