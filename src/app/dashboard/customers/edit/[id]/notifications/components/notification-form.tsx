"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const notificationFormSchema = z.object({
  title: z.string().min(2, "O título deve conter pelo menos 2 caracteres."),
  message: z.string().min(5, "A mensagem deve conter pelo menos 5 caracteres."),
});

type NotificationFormValues = z.infer<typeof notificationFormSchema>;

export function NotificationForm() {
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      title: "",
      message: "",
    },
  });

  const onSubmit = (data: NotificationFormValues) => {
    console.log("Notificação:", data);
    // Aqui você pode adicionar a lógica para lidar com os dados da notificação
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
          <Button type="submit" className="bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
            Enviar Notificação
          </Button>
        </div>
      </form>
    </Form>
  );
}
