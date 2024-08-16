import React from "react";
import Header from "../components/layout/header";
import FormLogin from "../components/layout/formlogin";
import Carousel from "../components/layout/carousel";
import Information from "../components/layout/information";

const Login: React.FC = () => {
  return (
    <body className="bg-fill0 font-jakartasans">
      <Header />
      <div className="container mx-auto lg:mt-14 md:mt-5 flex flex-col gap-5 px-4">
        <div className="flex lg:flex-row flex-col lg:gap-[52px] gap-10">
          <FormLogin />
          <Carousel />
        </div>
        <Information />
      </div>
    </body>
  );
};

export default Login;
