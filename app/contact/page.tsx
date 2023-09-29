import Form from "./form"

type Props = {
   
}



export default function Page({}: Props) {
   return (
      <div className="lg:px-[150px] xl:px-[250px] px-8 pt-4 space-y-4">
         <h1 className="font-bold text-3xl text-center pt-4 lg:pt-0 lg:mt-4">Contattami</h1>
         <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae asperiores eos ut quae ipsum id doloribus labore, autem minima similique voluptatibus voluptatum necessitatibus incidunt dolor sint laboriosam laborum obcaecati omnis?
         </p>
         <Form />
      </div>
   )
}