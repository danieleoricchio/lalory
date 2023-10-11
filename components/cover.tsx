import { getCoverProduct } from '@/lib/funcs'
import { ChevronsRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
   
}

export default async function Page({}: Props) {
   const product = await getCoverProduct()
   //bottom-2 right-4 md:right-[3rem] md:bottom-[4rem] lg:bottom-[10rem] lg:right-[15rem]
   if (!product) return null
   return (
      <div className="flex py-4 relative px-6 md:px-[100px]">
         <div className="relative aspect-square w-2/3 lg:ml-[50px] lg:w-1/2 shadow">
            <Image fill alt="I" style={{objectFit:"cover"}} src={product.images[0]} priority/>
         </div>
         <div className="bg-primary rounded py-6 px-4 lg:pl-4 xl:pr-[5rem] text-white absolute right-[calc(12vw)] bottom-[5vh] xl:bottom-[8vh] max-sm:bottom-2 max-sm:right-4">
            <h2 className='lg:text-2xl md:text-xl md:font-bold line-clamp-1 font-medium'>{product.name}</h2>
            <Link href={"/shop/"+product.slug} className="flex text-sm md:text-lg lg:text-xl md:font-medium font-light items-center hover:underline">Scopri ora il nuovo prodotto <ChevronsRight size={17} className='-mt-[2px]'/></Link>
         </div>
      </div>
   )
}