import { createContext, useState, useContext, } from "react"

interface FormState {
   numberOfProducts: number
   increment: () => void
   decrement: () => void
}

const Context = createContext<FormState>({
   numberOfProducts: 0,
   increment: () => {},
   decrement: () => {},
})

type Props = {
   children: React.ReactNode
}

export function CartProvider({children}: Props) {
   const [number, setNumber] = useState(0)

   function increment() {
      setNumber((prev) => prev + 1)
   }

   function decrement() {
      setNumber((prev) => prev - 1)
   }

   return (
      <Context.Provider value={{numberOfProducts: number, increment, decrement}}>
         {children}
      </Context.Provider>
   )
}

export function useCartProducts(){
   const context = useContext(Context)
   if (context === undefined) {
      throw new Error('useCartProducts must be used within a CartProvider')
   }
   return context
}