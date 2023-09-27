type Props = {
   
}

async function getData() {
   const res = await fetch("http://localhost:3550/api/products", { cache: "no-cache" })
   const data = await res.json()
   return data
}

export default async function Page({}: Props) {
   const data = await getData();
   return (
      <pre>
         {JSON.stringify(data, null, 3)}
      </pre>
   )
}