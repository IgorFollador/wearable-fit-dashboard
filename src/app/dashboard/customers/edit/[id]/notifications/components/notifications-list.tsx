"use client"

import api from "@/lib/api";
import { useEffect, useState } from "react";

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
}

export function NotificationList(params: {id: string | number}) {
  const [ notifications, setNotifications ] = useState([]);


  useEffect(() => {
    const getData = async () => {
        try {
          let response;
          if (params.id === 'me') {
            response = await api.get('/notifications');
          } else {
            response = await api.get(`/notifications/${params.id}`);
          }
          setNotifications(response.data);

        } catch (error) {
            console.log(error);
        }
    }

    getData();
  }, [])

  return (
    <div className="bg-white shadow-md p-4 rounded-lg space-y-4">
      <h3 className="text-lg font-semibold">Lista de Notificações</h3>
      { 
        (typeof notifications == 'undefined' || notifications.length == 0) ? 
        <p>Nenhuma notificação encontrada!</p> : 
        notifications.map((notification: any) => (
          <div key={notification.id} className="bg-white shadow-md p-4 rounded-lg">
            <h4 className="font-medium">{notification.title}</h4>
            <p className="text-gray-600">{notification.message}</p>
            <p className="text-gray-400">Horário: {formatTimestamp(notification.createdAt)}</p>
          </div>
        ))
      }
    </div>
  );
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleString("pt-BR");
}