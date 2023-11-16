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
import api from "@/lib/api";
import { useEffect, useState } from "react";

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
    .refine((val) => ['m', 'f'].includes(val), "Sexo deve ser 'm' para masculino ou 'f' para feminino."),
  birthDate: z.date({
    required_error: "A data de nascimento é obrigatória.",
  }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>

export function AccountForm(params: {id: string | number}) {

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema)
  });

  const disableInputs = params.id == "me" ? false : true

  useEffect(() => {
    const getData = async () => {
        try {
          let response;
          if (params.id === 'me') {
            response = await api.get('/users');
          } else {
            response = await api.get(`/users/${params.id}`);
          }

          // Ajustar a data para evitar problemas com fuso horário
          let adjustedDate;
          if (response.data.birthDate) {
            const birthDate = response.data.birthDate;
            adjustedDate = new Date(birthDate + 'T00:00:00'); // Adiciona o horário
          }

          const formattedData = {
            ...response.data,
            dob: adjustedDate
          };

          form.reset(formattedData);
        } catch (error) {
            console.log(error);
        }
    }

    getData();
  }, [])


  function onSubmit(data: AccountFormValues) {
    try {
      let response: any;
      if (params.id === 'me') {
        response = api.put('/users');
      } else {
        response = api.put(`/users/${params.id}`);
      }

      toast({
        description: `Dados do usuario ${response.id} alterados!` 
      });
    } catch (error: any) {
      toast({
        title: "Ops... ocorreu um erro!",
        variant: "destructive",
        description: error.getMessage()
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <FormLabel>Primeiro Nome</FormLabel>
          <Input {...form.register("firstName")} placeholder="Seu primeiro nome" disabled={disableInputs}/>
          <FormMessage name="firstName" />
        </FormItem>
  
        <FormItem>
          <FormLabel>Sobrenome</FormLabel>
          <Input {...form.register("lastName")} placeholder="Seu sobrenome" disabled={disableInputs}/>
          <FormMessage name="lastName" />
        </FormItem>

        <FormItem>
          <FormLabel>E-mail</FormLabel>
          <Input {...form.register("email")} placeholder="Seu e-mail" disabled={disableInputs}/>
          <FormMessage name="email" />
        </FormItem>
  
        <FormItem>
          <FormLabel className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sexo</FormLabel>
          <select {...form.register("sex")} disabled={disableInputs} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="m">Masculino</option>
            <option value="f">Feminino</option>
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
                      disabled={disableInputs}
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
                    value={field.value}
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
        
        <Button type="submit" disabled={disableInputs} >Atualizar</Button>
      </form>
    </Form>
  );
}
