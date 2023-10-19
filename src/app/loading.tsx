import Image from "next/image";
import logo from "../../public/assets/logo.svg";

export default function LoadingPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="text-center">
        <div className="logo-container">
          <Image
            src={logo}
            alt="Wearable FIT Logo"
            width={400}
            className="m-auto animate-pulse"
          />
        </div>
      </div>
    </div>
  );
};
