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
      title: "Notificação 1",
      message: "Esta é a mensagem da notificação 1.",
      timestamp: "2023-11-16 10:00:00",
    },
    {
      id: 2,
      title: "Notificação 2",
      message: "Esta é a mensagem da notificação 2.",
      timestamp: "2023-11-16 11:00:00",
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