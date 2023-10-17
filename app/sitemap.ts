import { getProducts } from "@/lib/funcs";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const products = await getProducts();
   return [
      {
         url: "https://lalory.vercel.app",
         lastModified: new Date("2023-10-12"),
      },
      {
         url: "https://lalory.vercel.app/about",
         lastModified: new Date("2023-10-12"),
      },
      {
         url: "https://lalory.vercel.app/cart",
         lastModified: new Date("2023-10-12"),
      },
      {
         url: "https://lalory.vercel.app/contact",
         lastModified: new Date("2023-10-12"),
      }, 
      {
         url: "https://lalory.vercel.app/search",
         lastModified: new Date("2023-10-12"),
      },
      {
         url: "https://lalory.vercel.app/shop",
         lastModified: new Date("2023-10-12"),
      },
      ...products.map((product) => ({
         url: `https://lalory.vercel.app/shop/${product.slug}`,
         lastModified: product.createdAt,
      })),
   ];
}
