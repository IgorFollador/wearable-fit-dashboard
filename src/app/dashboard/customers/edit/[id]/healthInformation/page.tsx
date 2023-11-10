
export default function NotificationsCustomerPage({ params }: { params: { id: number } }) {

    return (
        <>
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Informações de saúde</h2>
            <p className="text-muted-foreground">
                Aqui você pode acessar todas as métricas coletadas pelo dispositivo do seu aluno.
            </p>
          </div>
        </>
    );
}
