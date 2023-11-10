
export default function NotificationsCustomerPage({ params }: { params: { id: number } }) {

    return (
        <>
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Metas de saúde</h2>
            <p className="text-muted-foreground">
                Visualize ou edite as metas do seu aluno.
            </p>
          </div>
        </>
    );
}
