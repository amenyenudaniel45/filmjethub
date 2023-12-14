import Footer from "@/components/Footer";
import MovieDetails from "@/components/MovieDetails";
import Navbar from "@/components/Navbar";
import { NextPage } from "next";

const MovieDetailsPage: NextPage = () => {
  return (
    <section>
      <Navbar />
      <MovieDetails />
      <Footer />
    </section>
  );
};

export default MovieDetailsPage;
