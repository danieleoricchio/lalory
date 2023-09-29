import { z } from "zod";

export const formContact = z.object({
   name: z.string().min(2, {
      message: "Il nome deve essere di almeno 2 caratteri",
   }),
   email: z.string().email({
      message: "Inserisci un indirizzo email valido",
   }),
   subject: z.string().min(5, {
      message: "Il soggetto deve essere di almeno 5 caratteri",
   }).max(50, {
      message: "Il soggetto deve essere di massimo 50 caratteri",
   }),
   message: z.string().min(10, {
      message: "Il messaggio deve essere di almeno 10 caratteri",
   }).max(500, {
      message: "Il messaggio deve essere di massimo 500 caratteri",
   }),
});