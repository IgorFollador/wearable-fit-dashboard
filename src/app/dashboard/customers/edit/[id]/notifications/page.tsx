"use client"

import { NotificationForm } from "./components/notification-form";
import { NotificationList } from "./components/notifications-list";

export default function NotificationsCustomerPage({ params }: { params: { id: number | string } }) {
  return (
      <>
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Notificações</h2>
          <p className="text-muted-foreground">
              Visualize avisos ou envie notificações personalizadas para seu aluno.
          </p>
          <NotificationList id={params.id} />
          { params.id != "me" ? <NotificationForm id={params.id} /> : ''}
        </div>
      </>
  );
}
