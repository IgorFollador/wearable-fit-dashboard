import styles from "./styles.scss";

export default function Login() {
    return (
        <div className={ styles.container }>
            <div className="">
                <div className="">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Entrar</h1>
                        <p className="text-sm text-muted-foreground">Entre com seus dados de Login</p>
                    </div>
                    {/* <UserLoginForm /> */}
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        Clicando para continuar, você aceita com nossos{" "}
                        {/* <Link
                            href="/terms"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Termos de Serviço
                        </Link>{" "}
                        e{" "}
                        <Link
                            href="/privacy"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Política de Privacidade
                        </Link> */}
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}