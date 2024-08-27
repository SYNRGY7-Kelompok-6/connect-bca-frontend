import React, { useState } from "react";
import Header from "../components/layout/header";
import FormLogin from "../components/layout/formlogin";
import Carousel from "../components/layout/carousel";
import Information from "../components/layout/information";
import { useLocation } from "react-router-dom";
import Popup from "../components/base/popup";

const Login: React.FC = () => {
  const location = useLocation();
  const [isPopupVisible, setPopupVisible] = useState(
    location.state?.showPopup || false
  );

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="bg-fill0 font-jakartasans">
      <Header />
      <div className="container mx-auto lg:mt-14 md:mt-5 flex flex-col gap-5 px-4">
        <div className="flex lg:flex-row flex-col lg:gap-[52px] gap-10">
          <FormLogin />
          <Carousel />
        </div>
        <Information />
      </div>
      {isPopupVisible && (
        <Popup
          message="Sesi Anda telah berakhir. Silakan login kembali."
          svgSrc="/AlertError.svg"
          svgAlt="Alert Error"
          buttonText="Tutup"
          onButtonClick={handleClosePopup}
          labelButton="Tutup"
        />
      )}
    </div>
  );
};

export default Login;
