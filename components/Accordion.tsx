"use client";
import { AccordionItemProps } from "@/types";
import Link from "next/link";
import { useState } from "react";
import { useSpring, animated } from "react-spring";

const AccordionItem = ({ title, content }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { height, opacity } = useSpring({
    from: { height: 0, opacity: 0 },
    to: { height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 },
  });

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-black gray w-[100%]">
      <div
        className="flex items-center justify-between cursor-pointer p-4 hover:bg-gray transition"
        onClick={toggleAccordion}
      >
        <h3 className="sm:text-[22px] text-[16px] text-white poppins">
          {title}
        </h3>
        {isOpen ? (
          <p className="text-white text-[20px] font-bold mont">-</p>
        ) : (
          <p className="text-white text-[20px] font-bold mont">+</p>
        )}
      </div>
      <animated.div
        style={{ height, opacity }}
        className="overflow-hidden transition-all duration-300"
      >
        <p className="p-4 text-white mont sm:text-[20px] text-[15px]">
          {content}
        </p>
      </animated.div>
    </div>
  );
};

const Accordion = () => {
  return (
    <section className="padding bg-black">
      {" "}
      <h1 className="text-white poppins font-bold sm:text-[30px] text-[20px] mb-[2rem]">
        Frequently Asked Questions
      </h1>
      <div className="lg:w-[80%] w-[100%]  mt-8 gap-[0.5rem] flex flex-col">
        <AccordionItem
          title="What is FilmJetHub?"
          content="FilmJetHub is the go-to platform for an unparalleled entertainment experience. Dive into an extensive selection of movies, TV shows, and cartoons, all at your fingertips. Discover new releases, binge-watch your favorite series, and catch exclusive trailers. Your one-stop hub for cinematic adventures and thrilling previews"
        />
        <AccordionItem
          title="Is FilmJetHub completely free?"
          content="
          Yes, at FilmJetHub, your cinematic journey comes with a delightful perk—complete freedom. Enjoy unlimited access to our vast library of movies, TV shows, and trailers entirely for free. No subscription fees, no hidden costs—just pure entertainment at your fingertips. FilmJetHub believes in making the magic of movies accessible to all. Dive into the world of entertainment without breaking the bank."
        />
        <AccordionItem
          title="Is FilmJetHub good for kids?"
          content="Absolutely! FilmJetHub is a family-friendly haven, offering a diverse selection of content suitable for all ages. Our platform ensures a safe and enjoyable viewing experience for kids, featuring a wide array of cartoons, animated films, and educational shows. Parents can trust FilmJetHub to provide entertaining and enriching content that aligns with their family values. Join us in creating lasting memories as your little ones embark on exciting adventures through our curated collection"
        />
        <AccordionItem
          title="Is FilmJetHub available on multiple devices?"
          content="Absolutely! FilmJetHub provides a seamless streaming experience across various devices, including computers, tablets, and smart TVs."
        />

        <AccordionItem
          title="Can I watch movies offline on FilmJetHub?"
          content="Currently, FilmJetHub focuses on online streaming, and offline viewing is not supported."
        />
        <AccordionItem
          title="Does FilmJetHub offer subtitles for movies and shows?"
          content="Yes, FilmJetHub typically provides subtitles for a variety of languages, enhancing accessibility for a global audience."
        />
      </div>
      <p className="text-white mt-[3rem] sm:text-[20px] text-[17px] mont">
        What are you waiting for?{" "}
        <Link
          className="text-red  font-bold hover:underline"
          href={"/create-account"}
        >
          Sign Up{" "}
        </Link>
        now and get all movies and tv shows anytime ~ anywhere!
      </p>
    </section>
  );
};

export default Accordion;
