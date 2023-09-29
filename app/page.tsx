import Products from "@/components/products"

type Props = {
   
}



export default async function Page({}: Props) {
   return (
      <div>
         <h1 className="text-center font-bold text-2xl mt-0 pt-4 lg:pt-0 mb-4 lg:mt-2">Prodotti</h1>
         <Products take={6} classNamesGrid="grid-cols-2 lg:grid-cols-3"/>
         <div className="h-[40vh]"/> 
      </div>
   )
}