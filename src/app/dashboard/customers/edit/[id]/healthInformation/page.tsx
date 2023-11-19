"use client"

import { useState } from "react";
import { DateSelector } from "./components/date-selector";
import { CardsMetric } from "./components/metric";
export default function HealthInformationPage(parent: { params: { id: number } }) {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const handleDateChange = (newDate: any) => {
      setSelectedDate(newDate);
      // Aqui você pode adicionar lógica adicional se necessário
    };  

    return (
        <>
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Informações de saúde</h2>
            <p className="text-muted-foreground">
                Aqui você pode acessar todas as métricas coletadas pelo dispositivo do seu aluno.
            </p>
          </div>
          <div className="w-full">
            <DateSelector onDateChange={handleDateChange} />
          </div>
          <div className="w-full">
            <CardsMetric selectedDate={selectedDate} id={parent.params.id}/>
          </div>
        </>
    );
  }
