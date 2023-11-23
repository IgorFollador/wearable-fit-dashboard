import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusIcon } from "@radix-ui/react-icons"

export function BindCustomer() {


    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button
                variant="outline"
                size="sm"
                className="mr-5 hidden h-8 lg:flex"
            >
                <PlusIcon className="mr-2 h-4 w-4" />
                Vincular aluno
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Vincular aluno</DialogTitle>
            <DialogDescription>
                Vincule-se como profissional do seu aluno ou paciente. 
            </DialogDescription>
            </DialogHeader>
            <div className="flex w-full items-center gap-4 justify-center">
                <span className="text-center">Pesquise um aluno!</span>
            </div>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                Username
                </Label>
                <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
                />
            </div>
            </div>
            <DialogFooter>
            <Button type="submit" disabled>Vincular</Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}
