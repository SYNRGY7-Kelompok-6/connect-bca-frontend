import React from "react";
import Header from "../components/layout/header";
import FormLogin from "../components/layout/formlogin";
import Carousel from "../components/layout/carousel";
import Information from "../components/layout/information";

const Login: React.FC = () => {
  return (
    <body className="bg-primary-dark-blue font-sans">
      <Header />
      <section className="container mx-auto mt-[60px] flex flex-col gap-[27px]">
        <div className="flex flex-row gap-[52px]">
          <FormLogin />
          <Carousel />
        </div>
        <Information />
      </section>
    </body>
  );
};

export default Login;
