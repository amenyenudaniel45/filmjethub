"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { trendingMoviesProps } from "@/types";
import Image from "next/image";
import { TrendingMovies } from "@/constants/api";
import Link from "next/link";
import Loading from "./Loading";

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      TrendingMovies()
        .then((data) => {
          console.log(data?.results);
          setTrendingMovies(data?.results);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <section className="padding">
      <h1 className="text-white poppins font-bold sm:text-[30px] text-[20px] mb-[3rem]">
        Trending Now
      </h1>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 1500 }}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          480: {
            slidesPerView: 3,
            spaceBetween: 10,
          },

          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },

          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },

          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >
        {trendingMovies?.map((movie: trendingMoviesProps) => (
          <SwiperSlide key={movie?.id} className="w-[100%] h-[100%]">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="movie-poster"
              width={200}
              height={400}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <p className="mont sm:text-[22px] text-[19px] text-white mt-[2rem]  font-medium">
        Not a member yet?{" "}
        <Link
          className="text-red hover:underline poppins"
          href={"/create-account"}
        >
          Join Us
        </Link>{" "}
        for free and join the movie-loving community.
      </p>
    </section>
  );
};

export default Trending;
