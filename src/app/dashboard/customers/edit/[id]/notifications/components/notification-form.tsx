"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import api from "@/lib/api";

const notificationFormSchema = z.object({
  title: z.string().min(2, "O título deve conter pelo menos 2 caracteres."),
  message: z.string().min(5, "A mensagem deve conter pelo menos 5 caracteres."),
});

type NotificationFormValues = z.infer<typeof notificationFormSchema>;

export function NotificationForm(params: {id: string | number}) {
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      title: "",
      message: "",
    },
  });

  const onSubmit = async (data: NotificationFormValues) => {
    try {
      const response = await api.post(`/notifications`, {
        ...data,
        "toUserId": params.id,
      });

      console.log(response);

      toast({
        description: `Nova notificação enviada para o usuário!` 
      });

      window.location.reload();
    } catch (error: any) {
      toast({
        title: "Ops... ocorreu um erro!",
        variant: "destructive",
        description: error.getMessage()
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Criação de Notificação</h3>

          {/* Título */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <Input {...field} type="text" placeholder="Ex: Cuidado com o sono" className="w-full rounded-md" />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Mensagem */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensagem</FormLabel>
                <textarea {...field} rows={4} placeholder="Ex: Cuide para manter suas 8 horas de sono diárias e continuas" className="w-full rounded-md" />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className=" text-white rounded-md focus:outline-none focus:ring focus:ring-blue-300">
            Enviar Notificação
          </Button>
        </div>
      </form>
    </Form>
  );
}
