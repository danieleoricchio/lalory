"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
//import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from "react-hot-toast"
import { CartProvider } from "./cartcontext"

type Props = {
   children: React.ReactNode
}

export default function Page({children}: Props) {
   const queryClient = new QueryClient()
   return (
      <QueryClientProvider client={queryClient}>
         <CartProvider>
            <Toaster />
            {children}
         </CartProvider>
      </QueryClientProvider>
   )
}