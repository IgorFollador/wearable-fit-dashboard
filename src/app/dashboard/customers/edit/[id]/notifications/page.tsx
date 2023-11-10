
export default function NotificationsCustomerPage({ params }: { params: { id: number } }) {

    return (
        <>
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Notificações</h2>
            <p className="text-muted-foreground">
                Visualize avisos ou envie notificações personalizadas para seu aluno.
            </p>
          </div>
        </>
    );
}
