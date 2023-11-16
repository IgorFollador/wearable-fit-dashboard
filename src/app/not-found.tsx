import Image from "next/image";
import Link from "next/link";
import logo from "../../public/assets/icon.svg";

export default function NotFoundPage() {
  return (
    <div className="not-found-container flex items-center justify-center min-h-screen bg-gray-300">
      <div className="not-found-content text-center">
        <Link href="/">
          <div className="logo-container animate-pulse-20">
            <Image
              src={logo}
              alt="Wearable FIT Icon"
              width={150}
              className="m-auto"
            />
          </div>
        </Link>
        <p className="text-xl mt-4">Ops... Página não encontrada!</p>
        <Link href="/">Voltar para a Home</Link>
      </div>
    </div>
  );
}