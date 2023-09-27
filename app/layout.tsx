import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "LaLory",
   description: "LaLory E-Commerce",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="it">
         <body className={cn(inter.className, "bg-gray-100")}>
            <Navbar />
            <main className="lg:w-2/3 mx-auto pt-[160px]">
               {children}
            </main>
         </body>
      </html>
   );
}
