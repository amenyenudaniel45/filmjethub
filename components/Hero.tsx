import Link from "next/link";
import React from "react";
import Trending from "./Trending";

const Hero = () => {
  return (
    <header className="bg-hero">
      <nav className="paddingNav flex flex-row justify-between items-center pt-[1rem]">
        <Link href={"/"}>
          <h1 className="cursor-pointer text-red font-bold poppins sm:text-[2.5rem] text-[1.5rem]">
            FilmJetHub
          </h1>
        </Link>
        <Link href={"/sign-in"}>
          <button className="bg-red outline-none border-none py-1 sm:px-3 px-2 rounded-[5px] text-white sm:text-[17px] text-[15px] hover:bg-white hover:text-black font-medium transition">
            Sign In
          </button>
        </Link>
      </nav>

      <section className=" mt-[3rem] flex justify-center items-center flex-col">
        <p className="lg:w-[60%] sm:w-[80%] w-[100%] px-[1rem] sm:px-[0rem] text-white md:text-[50px] sm:text-[40px] text-[30px] poppins text-center font-bold">
          Watch & Download <span className="text-red">Free</span>{" "}
          <br className="hidden sm:flex" />
          Unlimited Movies and Tv Shows
        </p>
        <Link href={"/create-account"}>
          <button className="outline-none border-none py-2 sm:px-4  px-3 text-white  mont bg-red mt-[2rem] sm:text-[22px] text-[18px] font-bold rounded-[5px] hover:bg-white hover:text-black  transition">
            Get Started
          </button>
        </Link>
      </section>

      <Trending />
    </header>
  );
};

export default Hero;
