import React from "react";
import Header from "../components/header";
import FormLogin from "../components/formlogin";
import Information from "../components/information";

const Login: React.FC = () => {
  return (
    <body className="bg-primary-dark-blue font-sans">
      <Header />
      <section className="container mx-auto mt-[60px] flex flex-col gap-[27px]">
        <div className="flex flex-row gap-[52px]">
          <FormLogin />
          <div>
            <div className="w-[400px]">
              <img src="/slidebar.png" alt="Gambar Slide" />
            </div>
          </div>
        </div>
        <Information />
      </section>
    </body>
  );
};

export default Login;
