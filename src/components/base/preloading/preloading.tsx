import React from "react";

const Preloading: React.FC = () => {
  return (
    <>
      <div
        className="flex flex-col gap-6 justify-center items-center bg-fill0 w-full h-screen"
        role="status"
        aria-live="polite"
        aria-label="Loading, please wait"
      >
        <img src="/LogoBCA.svg" alt="BCA Logo" />
        <div className="flex flex-row gap-2 items-center">
          <div
            className="h-4 w-4 bg-primary-blue rounded-full animate-bounce [animation-delay:-0.3s]"
            aria-hidden="true"
          ></div>
          <div
            className="h-4 w-4 bg-primary-blue rounded-full animate-bounce [animation-delay:-0.15s]"
            aria-hidden="true"
          ></div>
          <div
            className="h-4 w-4 bg-primary-blue rounded-full animate-bounce"
            aria-hidden="true"
          ></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default Preloading;
