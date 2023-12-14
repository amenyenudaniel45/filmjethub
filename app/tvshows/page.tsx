"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { MovieProps } from "@/types";
import { allSeriesAPI, nowPlayingTvShows } from "@/constants/api";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TvShows = () => {
  const [tvShows, setTvShows] = useState<MovieProps[]>([]);
  const [allTvShows, setAllTvShows] = useState<any>([]);
  const [pages, setPages] = useState<number>(2);
  const [loading, setLoading] = useState(false);

  const fetchData = async (pageNumber: number) => {
    setLoading(true);
    try {
      const data = await allSeriesAPI(pageNumber);
      return data?.results || [];
    } catch (error) {
      console.error(error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Function to handle "Load More" button click
  const handleClick = async () => {
    const nextPage = pages + 4;

    const dataForPage = await fetchData(nextPage);

    setAllTvShows((prevMovies: any[]) => [
      ...(Array.isArray(prevMovies) ? prevMovies : []),
      ...dataForPage.map((movie: MovieProps) => ({ ...movie, page: nextPage })),
    ]);
    setPages(nextPage);
  };

  useEffect(() => {
    const fetchNowPlayingData = async () => {
      const data = await nowPlayingTvShows();
      setTvShows(data?.results || []);
    };

    fetchNowPlayingData();
  }, []);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const dataForPage1 = await fetchData(pages);
      const dataForPage2 = await fetchData(pages + 1);
      const dataForPage3 = await fetchData(pages + 2);
      setAllTvShows([
        ...dataForPage1.map((movie: MovieProps) => ({ ...movie, page: pages })),
        ...dataForPage2.map((movie: MovieProps) => ({
          ...movie,
          page: pages + 1,
        })),
        ...dataForPage3.map((movie: MovieProps) => ({
          ...movie,
          page: pages + 2,
        })),
      ]);
    };

    fetchPopularMovies();
  }, []);

  if (loading) {
    return <Loading />;
  }

  // JSX code for the component
  return (
    <>
      <Navbar />
      <div className="bg-black padding">
        <h1 className="text-center text-red poppins sm:text-[25px] text-[20px]">
          Tv Shows
        </h1>
        <h1 className="text-white mont mt-[1rem] font-bold sm:text-[30px] text-[20px] mb-[3rem]">
          Now Playing
        </h1>

        {/* Swiper component for "Now Playing" movies */}
        <Swiper
          spaceBetween={20}
          slidesPerView={5}
          autoplay={{ delay: 1800 }}
          loop
          breakpoints={{
            230: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1000: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
          modules={[Pagination, Autoplay]}
        >
          {tvShows?.map((tvShow: MovieProps) => (
            <SwiperSlide
              key={tvShow?.name}
              className="w-[100%] h-full hover:scale-[1.1] transition container__"
            >
              <Link href={`/tvshows/[id]`} as={`/tvshows/${tvShow?.id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                  alt="movie-poster"
                  width={200}
                  height={400}
                  className="image__container"
                />

                {tvShow?.name?.length > 13 ? (
                  <p className="text-white  md:text-[17px] text-[15px] mt-[0.5rem]">
                    {tvShow?.name.slice(0, 13)}..
                  </p>
                ) : (
                  <p className="text-white md:text-[17px] text-[15px] mt-[0.5rem]">
                    {tvShow?.name}
                  </p>
                )}
                <p className="text-white text-[17px] text-[15px] mont">
                  ⭐{tvShow?.vote_average.toFixed(1)}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* "Popular Movies" section */}
        <h1 className="text-white mont mt-[1rem] font-bold sm:text-[30px] text-[20px] mb-[3rem] mt-[5rem]">
          Popular Tv Shows
        </h1>

        <div className="flex flex-wrap gap-[1.5rem] sm:justify-start justify-center">
          {allTvShows?.map((tvShow: MovieProps) => (
            <div
              key={tvShow?.id}
              className="h-full hover:scale-[1.1] transition container__"
            >
              <Link href={`/tvshows/[id]`} as={`/tvshows/${tvShow?.id}`}>
                <div className="sm:w-[200px] sm:h-[full] w-[110px] h-auto">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${tvShow?.poster_path}`}
                    alt="movie-poster"
                    width={200}
                    height={400}
                    className="image__container transition"
                  />
                </div>

                {tvShow?.name.length > 13 ? (
                  <p className="text-white  md:text-[17px] text-[15px] mt-[0.5rem]">
                    {tvShow?.name.slice(0, 13)}..
                  </p>
                ) : (
                  <p className="text-white md:text-[17px] text-[15px] mt-[0.5rem]">
                    {tvShow?.name}
                  </p>
                )}

                <p className="text-white text-[17px] text-[15px] mont">
                  ⭐{tvShow?.vote_average.toFixed(1)}
                </p>
              </Link>
            </div>
          ))}
        </div>

        {/* "Load More" button */}
        <button
          className="outline-none border-none py-2 sm:px-4  px-3 text-white mont bg-red mt-[3rem] sm:text-[20px] text-[16px] font-bold rounded-[5px] hover:bg-white hover:text-black transition flex m-auto"
          onClick={handleClick}
        >
          Load More
        </button>
      </div>
      <Footer />
    </>
  );
};

export default TvShows;
