"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
type Props = {
   
}

export default function Page({}: Props) {
   const ref = useRef<HTMLAnchorElement>(null)
   const [font, setFont] = useState("font-sans")
   
   const all = ["font-sans", "font-serif", "font-mono"]

   /* useEffect(() => {
      setInterval(() => {
         setFont(all[Math.floor(Math.random() * all.length)])
      }, 5000)
   }, []) */

   return (
      <Link href={"/"} className={cn("font-bold text-2xl", font)} >
         LaLory
      </Link>
   )
}