"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ptBR } from 'date-fns/locale';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";

const accountFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "O primeiro nome deve conter no mínimo 2 caracteres.")
    .max(50, "O primeiro nome não pode conter mais de 50 caracteres."),
  lastName: z
    .string()
    .min(2, "O sobrenome deve conter no mínimo 2 caracteres.")
    .max(50, "O sobrenome não pode conter mais de 50 caracteres."),
  email: z
    .string()
    .email("Insira um endereço de e-mail válido."),
  sex: z
    .string()
    .max(1, "O sexo deve ser um único caractere (M ou F).")
    .refine((val) => ['M', 'F'].includes(val), "Sexo deve ser 'M' para masculino ou 'F' para feminino."),
  birthdate: z.date({
    required_error: "A data de nascimento é obrigatória.",
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>

const defaultValues: Partial<AccountFormValues> = {
  // ...valores existentes
  firstName: "Seu nome",
  lastName: "Seu sobrenome",
  email: "seuemail@example.com",
  sex: "M", // ou "F"
  birthdate: new Date("2000-01-01"), // Uma data de exemplo
}

export function AccountForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })

  function onSubmit(data: AccountFormValues) {
    console.log('teste');
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <FormLabel>Primeiro Nome</FormLabel>
          <Input {...form.register("firstName")} placeholder="Seu primeiro nome" />
          <FormMessage name="firstName" />
        </FormItem>
  
        <FormItem>
          <FormLabel>Sobrenome</FormLabel>
          <Input {...form.register("lastName")} placeholder="Seu sobrenome" />
          <FormMessage name="lastName" />
        </FormItem>

        <FormItem>
          <FormLabel>E-mail</FormLabel>
          <Input {...form.register("email")} placeholder="Seu e-mail" />
          <FormMessage name="email" />
        </FormItem>
  
        <FormItem>
          <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sexo</FormLabel>
          <select {...form.register("sex")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>
          <FormMessage name="sex" />
        </FormItem>
  
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de aniversário</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy", { locale: ptBR })
                      ) : (
                        <span>Escolha uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    locale={ptBR}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Data de aniversário usada para calular a idade do usuário.
              </FormDescription>
            </FormItem>
          )}
        />
          
        <Button type="submit" disabled={false} >Atualizar</Button>
      </form>
    </Form>
  );
}
