import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// e.g a webhook to `your-website.com/api/revalidate?tag=collection&secret=<token>`
export async function POST(request: NextRequest) {
   //const secret = request.nextUrl.searchParams.get("secret");
   const { tags } = await request.json();
   
   console.log(new Date().toLocaleTimeString(), tags);
   
   //const { tags } : { tags: string[] } = (await request.json()).tags

   /* if (secret !== process.env.MY_SECRET_TOKEN) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
   } */
   //console.log(tags);
   
   if (!tags) {
      return NextResponse.json(
         { message: "Missing tags param" },
         { status: 400 }
      );
   }

   for (const tag of tags) {
      revalidateTag(tag);
   }
   console.log("Revalidated: " + tags.join(", "));
   

   return NextResponse.json({ revalidated: true, now: Date.now() });
}
