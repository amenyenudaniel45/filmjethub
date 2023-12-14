import { ReasonsData } from "@/constants";
import React from "react";

const Reasons = () => {
  return (
    <section className="padding bg-black">
      {" "}
      <h1 className="text-white poppins font-bold sm:text-[30px] text-[20px] mb-[3rem]">
        Why Sign Up
      </h1>
      <div className="flex flex-wrap gap-[2rem] justify-center items-center">
        {ReasonsData.map((item) => (
          <div
            className="card sm:w-[300px] w-[100%] sm:h-[230px] h-[100%] flex items-center justify-center p-[2rem] rounded-[30px] opacity-[0.8] hover:opacity-[1] transition"
            key={item.id}
          >
            <p className="mont text-white text-center font-bold sm:text-[22px] text-[17px] opacity-[1]">
              {item.reason}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reasons;
