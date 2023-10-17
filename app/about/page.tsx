import type { Metadata } from "next"

export const metadata: Metadata = {
   title: "Chi siamo",
   description: "Chi siamo of LaLory E-Commerce",
};

export default function Page() {
   return (
      <div className="lg:px-[150px] xl:px-[250px] px-8 space-y-4">
         <h1 className="font-bold text-3xl text-center pt-4 lg:pt-0 lg:mt-4">Riguardo chi siamo</h1>
         <p>
            Creazione pagina in corso...   
         </p>
         <div className="h-[60vh] xl:h-[57vh] lg:h-[53vh] md:h-[73vh]"/>
      </div>
   )
}