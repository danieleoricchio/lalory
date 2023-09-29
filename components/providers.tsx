"use client"

import { Toaster } from "react-hot-toast"

type Props = {
   children: React.ReactNode
}

export default function Page({children}: Props) {
   return (
      <>
         <Toaster />
         {children}
      </>
   )
}