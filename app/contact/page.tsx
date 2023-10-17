import Form from "./form"
import type { Metadata } from "next"

export const metadata: Metadata = {
   title: "Contact me",
   description: "Contact me of LaLory E-Commerce",
};

export default function Page() {
   return (
      <div className="lg:px-[150px] xl:px-[250px] px-8 pt-4 space-y-4">
         <h1 className="font-bold text-3xl text-center pt-4 lg:pt-0 lg:mt-4">Contattami</h1>
         <p>
         Hai una domanda sui modelli? Ti piacerebbe collaborare con me? Compila il modulo sottostante e ti ricontatterò il prima possibile! Mi piace ascoltarti e parlare di cucito, ma LaLory è gestito solo da me, Lorena, quindi il mio tempo di risposta è spesso più lungo di quanto vorrei.
         </p>
         <Form />
      </div>
   )
}