import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
   try {
      const cartId = cookies().get("cart")?.value || request.cookies.get("cart")?.value
      if (!cartId) {
         console.log("No cart found");
         return new NextResponse("Unauthorized", { status: 401 })
      }
      const res = await fetch(`${process.env.BACKEND_URL}/api/cart/checkout`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "cartId": cartId
         },
         cache: "no-cache"
      })
      if (res.status != 200) {
         console.error("Error while checking out", res.status, res.statusText);
         return new NextResponse("Internal Server Error", { status: 500 })
      }

      const data = await res.json()
      //redirect(data.url)
      return new NextResponse("Redirecting", {
         status: 302,
         headers: {
            Location: data.url
         }
      })
   } catch (error) {
      console.log(error);
      return new NextResponse("Internal Server Error", { status: 500 })
   }
}
