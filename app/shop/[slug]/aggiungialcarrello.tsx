"use client"

import { addToCart } from "@/lib/funcs"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"
//import { useRouter } from "next/navigation"

type Props = {
   slug: string
}

export default function Page({slug}: Props) {
   const [loading, setLoading] = useState(false)
   const [showLink, setShowLink] = useState(false)
   //const queryClient = useQueryClient()
   //const router = useRouter()

   const mutation = useMutation({
      mutationFn: addToCart,
      onSuccess: async(status) => {
         if (status == 201) {
         toast.success('Prodotto aggiunto al carrello')
         setShowLink(true)
         //await queryClient.refetchQueries({ queryKey: ["cartProductsNumber"]})
         } else if (status == 200) {
            toast('Prodotto gia aggiunto al carrello', {
               icon: '❌',
            });
         } else {
            toast.error('Impossibile aggiungere il prodotto al carrello')
         }
      },
      onError: () => {
         toast.error('Errore durante l\'aggiunta al carrello')
      }
   })

   async function Aggiungi(){
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
      <div className="flex items-center mt-4 lg:mt-2 gap-4">
         <button onClick={Aggiungi} disabled={loading} className="flex disabled:opacity-75 disabled:bg-opacity-75 disabled:cursor-not-allowed bg-primary  text-white lg:p-4 px-4 py-2  rounded font-semibold transition-all duration-300 hover:bg-opacity-75">
            {
               loading && <Loader2 className="animate-spin text-xl mr-2"/>
            }
            Aggiungi al carrello
         </button>
         {
            showLink && <Link href="/cart" className="block underline underline-offset-1 font-medium">Vai al carrello</Link>
         }
      </div>
   )
}