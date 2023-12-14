import Footer from "@/components/Footer";
import Movies from "@/components/Movies";
import Navbar from "@/components/Navbar";
import React from "react";

const HomePage = () => {
  return (
    <section>
      <Navbar />
      <Movies />
      <Footer />
    </section>
  );
};

export default HomePage;
