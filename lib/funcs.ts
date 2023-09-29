"use server"

import { formContact } from "./schemas"

type Product = {
   id: string
   name: string
   price: number
   description: string
   images: string[]
   category: string
   slug: string
}

export async function getProducts(take?:number, category?:string) {
   try {
      let url = "http://localhost:3550/api/products"
      if (take && !category) {
         url += `?take=${take}`
      } else if (!take && category) {
         url += `?category=${category}`
      } else if (take && category) {
         url += `?take=${take}&category=${category}`
      }
      const res = await fetch(url, { next: { tags: ['products'] } })
      if (res.status != 200) return [] as Product[]
      const data: Product[] = await res.json()
      return data
   } catch (error) {
      return [] as Product[]
   }
}

export async function getProduct(slug:string) {
   try {
      const res = await fetch(`http://localhost:3550/api/product/${slug}`, { next: { tags: ["product"] } })
      if (res.status === 404) return null
      const data: Product = await res.json()
      return data
   } catch (error) {
      return null
   }
}

export async function searchProducts(query:string) {
   try {
      const res = await fetch(`http://localhost:3550/api/search/${query}`, { next: { tags: ["products"] } })
      if (res.status != 200) return [] as Product[]
      const data: Product[] = await res.json()
      return data
   } catch (error) {
      return [] as Product[]
   }
}

export async function getCategories() {
   try {
      const res = await fetch(`http://localhost:3550/api/categories`, { next: { tags: ["categories"] } })
      if (res.status != 200) return []
      const data: string[] = await res.json()
      return data
   } catch (error) {
      return []
   }
}

export async function sendContactMessage(values:any){
   try {
      const realValues = formContact.parse(values)
      const res = await fetch(`http://localhost:3550/api/contact`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(realValues),
         cache: "no-cache",
      })
      if (res.status != 201) {
         console.log(await res.json());
         return false
      }
      return true
   } catch (error) {
      console.log(error);
      return false
   }
}