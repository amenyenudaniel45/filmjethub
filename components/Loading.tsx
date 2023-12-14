import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="text-white flex flex-col items-center justify-center padding">
      <Image src={"/loading.svg"} alt="loader" width={200} height={200} />
    </div>
  );
};

export default Loading;
