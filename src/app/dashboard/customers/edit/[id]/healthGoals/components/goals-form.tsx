import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const goalsFormSchema = z.object({
  basalMetabolicRate: z.number().min(0, "A taxa metabólica basal deve ser um número positivo."),
  calorieGoal: z.number().min(0, "A meta de calorias deve ser um número positivo."),
  sleepTime: z.number().min(0, "O tempo de sono deve ser um número positivo."),
  stepGoal: z.number().min(0, "A meta de passos deve ser um número positivo."),
  physicalActivityTimeGoal: z.number().min(0, "A meta de tempo de atividade física deve ser um número positivo."),
  carbohydrate: z.number().min(0, "A meta de carboidratos deve ser um número positivo."),
  protein: z.number().min(0, "A meta de proteínas deve ser um número positivo."),
  fat: z.number().min(0, "A meta de gorduras deve ser um número positivo."),
});
  
  type GoalsFormValues = z.infer<typeof goalsFormSchema>;

export function GoalsForm() {
  const form = useForm<GoalsFormValues>({
    resolver: zodResolver(goalsFormSchema),
    defaultValues: {
      basalMetabolicRate: 1500,
      calorieGoal: 2000,
      sleepTime: 8,
      stepGoal: 6000,
      physicalActivityTimeGoal: 90,
      carbohydrate: 0,
      protein: 0,
      fat: 0,
    },
  });

  const onSubmit = (data: GoalsFormValues) => {
    console.log('Metas:', data);
    // Aqui você pode adicionar a lógica para lidar com os dados do formulário
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-wrap -mx-2">
          {/* Taxa Metabólica Basal */}
          <div className="w-1/2 px-2">
            <FormItem>
              <FormLabel>Taxa Metabólica Basal (kcal)</FormLabel>
              <Input {...form.register("basalMetabolicRate")} type="number" min="0" />
              <FormMessage name="basalMetabolicRate" />
            </FormItem>
          </div>
  
          {/* Objetivo de Calorias */}
          <div className="w-1/2 px-2">
            <FormItem>
              <FormLabel>Meta de Calorias (kcal)</FormLabel>
              <Input {...form.register("calorieGoal")} type="number" min="0" />
              <FormMessage name="calorieGoal" />
            </FormItem>
          </div>
  
          {/* Tempo de Sono */}
          <div className="w-1/2 px-2">
            <FormItem>
              <FormLabel>Tempo de Sono (em horas)</FormLabel>
              <Input {...form.register("sleepTime")} type="number" min="0" />
              <FormMessage name="sleepTime" />
            </FormItem>
          </div>
  
          {/* Objetivo de Passos */}
          <div className="w-1/2 px-2">
            <FormItem>
              <FormLabel>Meta de Passos</FormLabel>
              <Input {...form.register("stepGoal")} type="number" min="0" />
              <FormMessage name="stepGoal" />
            </FormItem>
          </div>
  
          {/* Tempo de Atividade Física */}
          <div className="w-1/2 px-2">
            <FormItem>
              <FormLabel>Meta de Tempo de Atividade Física (em minutos)</FormLabel>
              <Input {...form.register("physicalActivityTimeGoal")} type="number" min="0" />
              <FormMessage name="physicalActivityTimeGoal" />
            </FormItem>
          </div>
  
          {/* Carboidratos */}
          <div className="w-1/2 px-2">
            <FormItem>
              <FormLabel>Meta de Carboidratos (em gramas)</FormLabel>
              <Input {...form.register("carbohydrate")} type="number" min="0" />
              <FormMessage name="carbohydrate" />
            </FormItem>
          </div>
  
          {/* Proteínas */}
          <div className="w-1/2 px-2">
            <FormItem>
              <FormLabel>Meta de Proteínas (em gramas)</FormLabel>
              <Input {...form.register("protein")} type="number" min="0" />
              <FormMessage name="protein" />
            </FormItem>
          </div>
  
          {/* Gorduras */}
          <div className="w-1/2 px-2">
            <FormItem>
              <FormLabel>Meta de Gorduras (em gramas)</FormLabel>
              <Input {...form.register("fat")} type="number" min="0" />
              <FormMessage name="fat" />
            </FormItem>
          </div>
        </div>
  
        <Button type="submit">Salvar Metas</Button>
      </form>
    </Form>
  );  
}
