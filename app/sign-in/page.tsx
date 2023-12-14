"use client";
import { AuthContext } from "@/context";
import { AuthContextProps } from "@/types";
import Link from "next/link";
import { useContext } from "react";

const SignIn = () => {
  const { email, password, setEmail, setPassword, handleLogIn, googleSignUp } =
    useContext(AuthContext) as AuthContextProps;

  return (
    <section className="bg-black overflow-auto bg-hero">
      <nav className="paddingNav flex flex-row justify-between items-center pt-[1rem]">
        <Link href={"/"}>
          <h1 className="cursor-pointer text-red font-bold poppins sm:text-[2.5rem] text-[1.5rem]">
            FilmJetHub
          </h1>
        </Link>
      </nav>

      <form className="flex flex-col margin justify-center items-center padding">
        <h1 className="text-white mont font-bold sm:text-[32px] text-[21px] mb-[2rem]">
          Sign In
        </h1>
        <div className="flex flex-col gap-[2rem] md:w-[600px] w-full">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="outline-none border border-red w-full sm:h-[50px] h-[40px] bg-transparent sm:pl-[1.3rem] pl-[0.9rem] sm:text-[20px] text-[17px] mont font-bold text-white rounded-[7px]"
          />

          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            min={8}
            onChange={(e) => setPassword(e.target.value)}
            className="outline-none border border-red w-full sm:h-[50px] h-[40px] bg-transparent sm:pl-[1.3rem] pl-[0.9rem] sm:text-[20px] text-[17px] mont font-bold text-white rounded-[7px]"
          />
        </div>
        <button
          type="button"
          onClick={handleLogIn}
          className="outline-none mont border-none py-2 sm:px-4  mt-[2rem]  px-3 text-white bg-red mt-[2rem] sm:text-[22px] text-[18px] font-bold rounded-[5px] hover:bg-white hover:text-black  transition"
        >
          Sign In
        </button>

        <p className="text-white mont mt-[1rem] sm:text-[20px] text-[17px]">
          Don't have account?{" "}
          <Link
            className="text-red hover:underline poppins transition"
            href={"/create-account"}
          >
            Create Account
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignIn;
