"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import emailjs from "@emailjs/browser";

import { useRef, useState } from "react";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_9uvmkfq",
        "template_h1cz467",
        {
          from_name: form.name,
          to_name: "Daniel Amenyenu",
          from_email: form.email,
          to_email: "amenyenudaniel321@gmail.com",
          message: form.message,
        },
        "mx4EEn9eZal5w83lc"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };
  return (
    <div>
      <Navbar />
      <div
        className={` flex xl:flex-row flex-col-reverse gap-10 overflow-hidden justify-center bg-black padding `}
      >
        <div className="flex-[0.75] rounded-2xl">
          <p
            className={"text-center mont text-white sm:text-[25px] text-[20px]"}
          >
            Get in touch
          </p>
          <h3
            className={
              "poppins sm:text-[25px] text-[20px] mt-[1rem] text-white"
            }
          >
            Contact.
          </h3>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col gap-8"
          >
            <label className="flex flex-col mont">
              <span className="text-white font-medium mb-4">Your Name</span>
              <input
                required
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className="bg-transparent border border-red py-4 px-6  text-white rounded-lg outline-none  font-bold text-[16px]"
              />
            </label>
            <label className="flex flex-col text-white mont ">
              <span className="text-white font-medium mb-4">Your email</span>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className="bg-transparent border border-red py-4 px-6  text-white rounded-lg outline-none  font-bold text-[16px]"
              />
            </label>
            <label className="flex flex-col mont text-white">
              <span className="text-white font-medium mb-4">Your Message</span>
              <textarea
                required
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What you want to say?"
                className="bg-transparent border border-red py-4 px-6  text-white rounded-lg outline-none  font-bold text-[16px]"
              />
            </label>

            <button
              type="submit"
              className="outline-none mont border-none py-2 sm:px-4  mt-[2rem] w-fit  px-3 text-white bg-red mt-[2rem] sm:text-[22px] text-[18px] font-bold rounded-[5px] hover:bg-white hover:text-black  transition"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
