import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
   return {
      rules: {
         userAgent: "*",
         allow: "/",
         disallow: ["/payment-completed","/api"]
      },
      sitemap: "https://lalory.vercel.app/sitemap.xml",
   };
}
