import Image from "next/image";
import logo from "../../public/assets/logo.svg";

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <Image
          src={logo}
          alt="Wearable FIT Logo"
          width={400}
          className="m-auto"
          priority
        />
      </div>
    </div>
  );
}