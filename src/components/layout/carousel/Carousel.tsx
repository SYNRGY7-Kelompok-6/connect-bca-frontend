import React from "react";

const Carousel: React.FC = () => {
  return (
    <div className="lg:w-[451px] w-screen md:w-full relative order-1 lg:order-2 overflow-hidden md:rounded-lg lg:h-[378px] -ml-4 md:ml-0">
        <img src="./Pamflet-lg.png" alt="Pamflet Large" className="hidden lg:block w-full" />
        <img src="./Pamflet-md.png" alt="Pamflet Small" className="hidden md:block lg:hidden w-full" />
        <img src="./Pamflet-sm.png" alt="Pamflet Small" className="block md:hidden lg:hidden w-full" />
    </div>
  );
};

export default Carousel;
