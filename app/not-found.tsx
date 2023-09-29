import Link from "next/link";

export default function NotFound() {
   return (
      <div className="mt-[100px]">
         <h2 className="text-center font-bold text-2xl">Non trovato</h2>
         <p className="text-center font-semibold">Impossibile trovare la pagina richiesta</p>
         <Link href="/" className="text-center underline mx-auto block">Ritorna alla Home</Link>
      </div>
   );
}
