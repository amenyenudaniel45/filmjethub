import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="padding bg-black border-t border-gray">
      <h1 className="cursor-pointer text-red font-bold poppins sm:text-[2rem] text-[1.5rem]">
        FilmJetHub
      </h1>
      <Link href={"/contact"} className="">
        <p className="text-white sm:text-[17px] text-[15px] mont mt-[3rem] hover:underline">
          Contact Us
        </p>
      </Link>

      <p className="text-white mont mt-[10px] sm:text-[16px] text-[15px]">
        Follow us on{" "}
        <a
          href="https://www.linkedin.com/company/filmjethub/"
          target="_blank"
          className="underline"
        >
          Linkedin
        </a>{" "}
      </p>
    </footer>
  );
};

export default Footer;
