import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

if (!process.env.MY_SECRET_TOKEN) throw new Error("Missing env var MY_SECRET_TOKEN");

export async function POST(request: NextRequest) {
   const secret = headers().get("x-secret-token");
   const { tags } = await request.json();
      
   if (secret !== process.env.MY_SECRET_TOKEN) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
   }

   console.log(new Date().toLocaleTimeString(), "Revalidating" ,tags);
   
   if (!tags) {
      return NextResponse.json(
         { message: "Missing tags param" },
         { status: 400 }
      );
   }

   for (const tag of tags) {
      revalidateTag(tag);
   }
   

   return NextResponse.json({ revalidated: true, now: Date.now() });
}
