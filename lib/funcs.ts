"use server"

import { formContact } from "./schemas"
import { cookies } from 'next/headers'

type Product = {
   id: string
   name: string
   price: number
   description: string
   images: string[]
   category: string
   slug: string
}

if (!process.env.BACKEND_URL || process.env.BACKEND_URL.trim() == "") throw new Error("BACKEND_URL env variable not set")

export async function getProducts(take?:number, category?:string) {
   try {
      let url = `${process.env.BACKEND_URL}/api/products`
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
      console.log(error);
      return [] as Product[]
   }
}

export async function getProduct(slug:string) {
   try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/product/${slug}`, { next: { tags: ["product"] } })
      if (res.status === 404) return null
      const data: Product = await res.json()
      return data
   } catch (error) {
      console.log(error);
      return null
   }
}

export async function getCoverProduct() {
   try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/cover`, { next: { tags: ["cover"] } })
      if (res.status === 404) return null
      const data: Product = await res.json()
      return data
   } catch (error) {
      console.log(error);
      return null
   }
}

export async function searchProducts(query:string) {
   try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/search/${query}`, { next: { tags: ["products"] } })
      if (res.status != 200) return [] as Product[]
      const data: Product[] = await res.json()
      return data
   } catch (error) {
      console.log(error);
      return [] as Product[]
   }
}

export async function getCategories() {
   try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/categories`, { next: { tags: ["categories"] } })
      if (res.status != 200) return []
      const data: string[] = await res.json()
      return data
   } catch (error) {
      console.log(error);
      return []
   }
}

export async function sendContactMessage(values:any){
   try {
      const realValues = formContact.parse(values)
      const res = await fetch(`${process.env.BACKEND_URL}/api/contact`, {
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

export async function getCart(){
   try {
      const cartId = cookies().get("cart")?.value
      if (!cartId) {
         return null;
      }
      const res = await fetch(`${process.env.BACKEND_URL}/api/cart`, { 
         cache: "no-cache",
         headers: {
            "Content-Type": "application/json",
            "cartId": cartId
         }
      })
      if (res.status != 200) return null
      const data = await res.json()
      return data
   } catch (error) {
      console.log(error);
      return null
   }
}

export async function addToCart(slug:string){
   try {
      /* if (cookies().get("cart")?.value) {
         const res = await createCart()
         if (!res) return false
      }
      const cartId = cookies().get("cart")?.value */
      const res = await fetch(`${process.env.BACKEND_URL}/api/cart/add`, { 
         cache: "no-cache",
         headers: {
            "Content-Type": "application/json"
         },
         method: "POST",
         body: JSON.stringify({
            cartId: cookies().get("cart")?.value,
            slug: slug
         }),
      })
      if (res.status > 299) return res.status
      const data = await res.json()
      cookies().set("cart", data.cartId, { expires: Date.now() + 60 * 60 * 24 * 3 })
      return res.status
   } catch (error) {
      console.log(error);
      return 500
   }
}

export async function removeFromCart(slug:string){
   try {
      const cartId = cookies().get("cart")?.value
      if (!cartId) {
         return false;
      }
      const res = await fetch(`${process.env.BACKEND_URL}/api/cart/remove`, { 
         cache: "no-cache",
         headers: {
            "Content-Type": "application/json",
            "cartId": cartId,
            "slug": slug
         },
         method: "DELETE",
      })
      if (res.status > 299) false
      return true
   } catch (error) {
      console.log(error);
      return false
   }
}

export async function createCart() {
   try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/cart/create`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         cache: "no-cache",
      })
      if (res.status != 201) return false
      const data = await res.json()
      cookies().set("cart", data.cartId, { expires: Date.now() + 60 * 60 * 24 * 3 })
      return true
   } catch (error) {
      console.log(error);
      return false
   }
}

export async function getCartProductsNumber(){
   try {
      const cartId = cookies().get("cart")?.value
      if (!cartId) {
         return -2;
      }
      const res = await fetch(`${process.env.BACKEND_URL}/api/cart/number`, { 
         cache: "no-cache",
         headers: {
            "Content-Type": "application/json",
            "cartId": cartId
         }
      })
      if (res.status != 200) return -1
      const data = await res.json()
      return data.number as number
   } catch (error) {
      console.log(error);
      return -1
   }
}

type CheckoutResponse = {
   status: false
} | {
   status: true;
   url: string
}
export async function checkout(): Promise<CheckoutResponse> {
   try {
      const cartId = cookies().get("cart")?.value
      if (!cartId) {
         return {
            status: false
         };
      }
      const res = await fetch(`${process.env.BACKEND_URL}/api/cart/checkout`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "cartId": cartId
         },
         cache: "no-cache"
      })
      if (res.status != 200) return {
         status: false
      };
      const data = await res.json()
      cookies().set("cart", "")
      return {
         status: true,
         url: data.url
      }
   } catch (error) {
      console.log(error);
      return {
         status: false
      };
   }
}