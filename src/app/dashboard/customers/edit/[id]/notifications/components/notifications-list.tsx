"use client"

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
}

const notifications = [
    {
      id: 1,
      title: "Aumento do tempo de treino",
      message: "Igor vamos aumentar seu tempo de treino de 60 para 90 min diários.",
      timestamp: "2023-11-08 10:00:02",
    },
    {
      id: 2,
      title: "Cuidado com o tempo sentado",
      message: "Tente realizar mais caminhadas durante o dia.",
      timestamp: "2023-11-16 11:22:09",
    },
  ];

export function NotificationList() {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg space-y-4">
      <h3 className="text-lg font-semibold">Lista de Notificações</h3>
      {notifications.map((notification) => (
        <div key={notification.id} className="bg-white shadow-md p-4 rounded-lg">
          <h4 className="font-medium">{notification.title}</h4>
          <p className="text-gray-600">{notification.message}</p>
          <p className="text-gray-400">Horário: {formatTimestamp(notification.timestamp)}</p>
        </div>
      ))}
    </div>
  );
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString("pt-BR");
}