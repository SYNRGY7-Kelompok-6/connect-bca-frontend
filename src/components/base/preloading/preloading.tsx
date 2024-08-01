import React from "react";

const Preloading: React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-4 space-x-2 justify-center items-center bg-primary-dark-blue h-screen">
        <img src="/LogoBCA.png" alt="" />
        <div className="flex flex-row gap-2">
          <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    </>
  );
};

export default Preloading;
