"use client"

import { removeFromCart } from "@/lib/funcs"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Loader2, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

type Props = {
   slug: string
}

export default function Page({slug}: Props) {
   const [loading, setLoading] = useState(false)
   const queryClient = useQueryClient()
   const router = useRouter()
   const mutation = useMutation({
      mutationFn: removeFromCart,
      onSuccess: async (status) => {
         if (status) {
            toast.success('Prodotto eliminato dal carrello')
            //await queryClient.refetchQueries({ queryKey: ["cartProductsNumber"] })
            router.refresh()
         } else {
            toast.error('Impossibile eliminare il prodotto dal carrello')
         }
      },
      onError: () => {
         toast.error('Errore durante l\'eliminazione dal carrello')
      }
   })
   async function click() {
      try {
         setLoading(true)
         mutation.mutate(slug)
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