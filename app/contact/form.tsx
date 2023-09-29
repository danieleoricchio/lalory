"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { formContact } from "@/lib/schemas";
import { sendContactMessage } from "@/lib/funcs";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
};

export default function ProfileForm({}:Props) {
   const [loading, setLoading] = useState(false);
   const form = useForm<z.infer<typeof formContact>>({
      resolver: zodResolver(formContact),
      defaultValues: {
         name: "",
         email: "",
         message: "",
         subject: "",
      },
   });

   async function onSubmit(values: z.infer<typeof formContact>) {
      setLoading(true);
      const res = await sendContactMessage(values);
      if (res) {
         form.reset();
         toast.success("Messaggio inviato");
      } else {
         toast.error("Errore nell'invio del messaggio");
      }
      setLoading(false);
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nome</FormLabel>
                     <FormControl>
                        <Input {...field} />
                     </FormControl>
                     <FormDescription>
                        Il tuo nome
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input {...field} />
                     </FormControl>
                     <FormDescription>
                        La tua email
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="subject"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Oggetto</FormLabel>
                     <FormControl>
                        <Textarea {...field} maxLength={50}/>
                     </FormControl>
                     <FormDescription>
                        L&apos;oggetto del messaggio
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="message"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Messaggio</FormLabel>
                     <FormControl>
                        <Textarea {...field} maxLength={500}/>
                     </FormControl>
                     <FormDescription>
                        Il tuo messaggio
                     </FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit" className="bg-primary hover:bg-primary">Invia</Button>
         </form>
      </Form>
   );
}
