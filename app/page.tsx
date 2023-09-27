import Products from "@/components/products"

type Props = {
   
}



export default async function Page({}: Props) {
   return (
      <div>
         <h1 className="text-center font-bold text-2xl mb-4 mt-2">Prodotti</h1>
         <Products />
      </div>
   )
}