import { Separator } from "@/components/ui/separator";
import { GoogleFitIntegration } from "./components/google-fit-integration";

export default function SettingsPage() {
    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
            </div>
            <Separator />
            <GoogleFitIntegration />
        </>
    )
}