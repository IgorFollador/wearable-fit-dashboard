import Image from "next/image";
import logo from "../../public/assets/logo.svg";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
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

export default Loading;
