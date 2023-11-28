import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/lib/api";
import { Chart as ChartJS, ArcElement, LineElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { useEffect, useState } from "react";
import { Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, LineElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement);

const doughnutData = (data: any, colors: string[]) => ({
  labels: ['Atingido', 'Meta'],
  datasets: [
    {
      data,
      backgroundColor: colors,
      borderColor: colors,
      borderWidth: 1,
    },
  ],
});

const lineData = (labels: any, data: any, label: any, color: any) => ({
  labels,
  datasets: [
    {
      label,
      data,
      fill: false,
      borderColor: color,
      tension: 0.1
    }
  ]
});

type IHealthData = {
  current: any;
  goal: any;
}

export function CardsMetric({ selectedDate, id }: { selectedDate: any, id: string | number }) {
  const [caloricData, setCaloricData] = useState<IHealthData | null>(null);
  const [stepData, setStepData] = useState<IHealthData | null>(null);
  const [sleepData, setSleepData] = useState<IHealthData | null>(null);
  const [heartRateData, setHeartRateData] = useState({});

  useEffect(() => {
    const getHealthInformation = async () => {
      try {
        const response = await api.post("health", {
          date: selectedDate,
          userId: id
        });
        const data = response.data;
        setCaloricData(data.caloriesBurned);
        setStepData(data.steps);
        setSleepData(data.sleepDuration);
        setHeartRateData(data.heartRateData);
      } catch (error) {
        console.error(error);
      }
    };

    getHealthInformation();
  }, [selectedDate, id]);

  const isDataAvailable = (data: any) => data && Object.keys(data).length > 0;

  return (
    <div className="w-full grid grid-cols-2 gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Gasto Calórico</CardTitle>
          <CardDescription>
            Calorias queimadas durante o dia.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="h-[200px] w-full flex justify-center items-center">
            {isDataAvailable(caloricData) && caloricData ? (
              <Doughnut data={doughnutData([caloricData.current, caloricData.goal], ['rgba(255, 50, 50, 1)', 'rgba(255, 50, 50, 0.1)'])} />
            ) : (
              <p className="text-center">Sem acesso aos dados!</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Batimentos Cardíacos</CardTitle>
          <CardDescription>
            Média diária de batimentos cardíacos.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4 flex justify-center items-center">
          <div className="h-[200px] w-full flex justify-center items-center">
            {isDataAvailable(heartRateData) && heartRateData ? (
              <Line data={lineData(Object.keys(heartRateData), Object.values(heartRateData), 'Batimentos Cardíacos', 'rgb(75, 192, 192)')} />
            ) : (
              <p className="text-center">Sem acesso aos dados!</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Adicione mais cards abaixo para outras métricas */}
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Passos</CardTitle>
          <CardDescription>
            Quantidade de passos dados durante o dia.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4 flex justify-center items-center">
          <div className="h-[200px] w-full flex justify-center items-center">
            {isDataAvailable(stepData) && stepData ? (
              <Doughnut data={doughnutData([stepData.current, stepData.goal], ['rgba(100, 200, 150, 1)', 'rgba(100, 200, 150, 0.1)'])} />
            ) : (
              <p className="text-center">Sem acesso aos dados!</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Qualidade do Sono</CardTitle>
          <CardDescription>
            Horas de sono profundo vs sono leve.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-4 flex justify-center items-center">
          <div className="h-[200px] w-full flex justify-center items-center">
            {isDataAvailable(sleepData) && sleepData ? (
              <Doughnut data={doughnutData([sleepData.current, sleepData.goal], ['rgba(106, 90, 205, 1)', 'rgba(106, 90, 205, 0.1)'])} />
            ) : (
              <p className="text-center">Sem acesso aos dados!</p>
            )}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

