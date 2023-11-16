import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chart as ChartJS, ArcElement, LineElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement } from 'chart.js';
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

const lineData = (data: any, label: string, color: string) => ({
  labels: ['00h', '04h', '08h', '12h', '16h', '20h', '24h'],
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

export function CardsMetric(params: {selectedDate: Date, id: string | number}) {
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
            <Doughnut data={doughnutData([2300, 2500], ['rgba(255, 50, 50, 1)', 'rgba(255, 50, 50, 0.1)'])} />
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
            <Line data={lineData([65, 59, 80, 81, 56, 55, 40], 'Batimentos Cardíacos', 'rgb(75, 192, 192)')} />
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
            <Doughnut data={doughnutData([3235, 5000], ['rgba(100, 200, 150, 1)', 'rgba(100, 200, 150, 0.1)'])} />
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
            <Doughnut data={doughnutData([4, 8], ['rgba(106, 90, 205, 1)', 'rgba(106, 90, 205, 0.1)'])} />
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

