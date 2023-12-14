"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  EpisodeDetailsAPI,
  RecommendedTvShowsAPI,
  TvShowsDetailsAPI,
  TvShowsSimilarAPI,
  allSeasonAPI,
} from "@/constants/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AccordionSeason from "@/components/AccordionSeason";
import { loadBindings } from "next/dist/build/swc";
import { MovieProps } from "@/types";
import Link from "next/link";
import Loading from "@/components/Loading";

function formatRuntime(runtime: number) {
  if (typeof runtime === "number" && runtime > 0) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  } else {
    return "N/A";
  }
}
const EpisodePage = () => {
  const { id, season_number, episode_number } = useParams();

  const [episodeDetails, setEpisodeDetails] = useState<any>([]);
  const [details, setDetails] = useState<any>([]);
  const [numberOfSeasons, setNumberOfSeasons] = useState(0);
  const [allSeasonsData, setAllSeasonsData] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [recommendedMovies, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      const fetchData = async () => {
        const similarData = await TvShowsSimilarAPI(id);
        setSimilarMovies(similarData.results);

        const recommendedData = await RecommendedTvShowsAPI(id);
        setRecommended(recommendedData?.results);
        console.log(recommendedData?.results);

        const seriesDetails = await TvShowsDetailsAPI(id);
        setNumberOfSeasons(seriesDetails?.number_of_seasons || 0);

        const allSeasons: any = [];
        for (
          let seasonNumber = 1;
          seasonNumber <= numberOfSeasons;
          seasonNumber++
        ) {
          try {
            const seasonData = await allSeasonAPI(id, seasonNumber);
            allSeasons.push(seasonData);
          } catch (error) {
            console.error("Error fetching season data:", error);
          } finally {
          }
        }
        setAllSeasonsData(allSeasons);
        console.log(allSeasons);
      };

      fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id, numberOfSeasons]);
  useEffect(() => {
    TvShowsDetailsAPI(id).then((data) => {
      console.log("hi am new", data);
      setDetails(data);
    });
  }, []);
  useEffect(() => {
    setLoading(true);
    try {
      EpisodeDetailsAPI(id, season_number, episode_number).then((data) => {
        setEpisodeDetails(data);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);
  const formattedDate = (dateString: any) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(Date.parse(dateString));
    const options: any = { year: "numeric", month: "long", day: "numeric" };

    return date.toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Navbar />
      <section className="padding bg-black">
        <div>
          <h1 className="text-white poppins text-[24px]  mb-[1rem]">
            {details?.name}
          </h1>
        </div>
        <div className="flex items-center flex-col sm:flex-row gap-[2rem]">
          <Image
            src={`https://image.tmdb.org/t/p/w500${episodeDetails?.still_path}`}
            alt="episode-image"
            width={150}
            height={70}
          />
          <p className="text-white mont text-[19px]">{episodeDetails?.name}</p>

          <p className="text-red mont text-[19px]">
            Season{episodeDetails?.season_number} Episode
            {episodeDetails?.episode_number}
          </p>
        </div>

        <p className="text-white mont mt-[0.5rem] text-[17px] sm:w-[70%] w-[100%]">
          {episodeDetails?.overview}
        </p>

        <div className="flex items-center flex-wrap gap-[2rem]">
          <p className="text-white mt-[0.3rem] text-[19px] mont">
            ⭐{episodeDetails?.vote_average?.toFixed(1)}
          </p>
          <p className="text-white mont">
            {formatRuntime(episodeDetails?.runtime)}
          </p>
          <p className="text-red text-[17px] mont">
            {formattedDate(episodeDetails?.air_date)}
          </p>
        </div>

        <div>
          <p className="text-white poppins text-[25px] mt-[2rem]">Watch Now</p>

          <iframe
            src={`https://vidsrc.to/embed/tv/${id}/${season_number}/${episode_number}`}
            title="Tv Show"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="border border-red mt-[1rem] w-[100%] lg:h-[800px] sm:h-[500px] h-[300px]"
          ></iframe>
        </div>

        {allSeasonsData.length !== 0 && (
          <h1 className="text-white poppins text-[20px] mt-[3rem] mb-[2rem] sm:text-[23px]">
            {details?.name} Seasons and Episodes
          </h1>
        )}
        <div>
          {allSeasonsData?.map((item: any) => (
            <AccordionSeason
              key={item?.id}
              s_air_date={item?.air_date}
              season_number={item?.season_number}
              name={item?.name}
              episodes={item?.episodes}
            />
          ))}
        </div>

        {similarMovies.length !== 0 && (
          <p className="text-white text-[20px] sm:text-[25px] poppins mb-[1rem] mt-[5rem]">
            Similar Tv Shows
          </p>
        )}
        <Swiper
          spaceBetween={20}
          slidesPerView={5}
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
        >
          {similarMovies?.map((movie: MovieProps) => (
            <>
              {movie?.poster_path && (
                <SwiperSlide
                  key={movie?.id}
                  className="w-[100%] h-full hover:scale-[1.1] transition container__"
                >
                  <Link href={`/tvshows/[id]`} as={`/tvshows/${movie?.id}`}>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt="movie-poster"
                      width={200}
                      height={400}
                      className="image__container transition"
                    />
                    {movie?.name?.length > 13 ? (
                      <p className="text-white  md:text-[17px] text-[15px] mt-[0.5rem]">
                        {movie?.name.slice(0, 13)}..
                      </p>
                    ) : (
                      <p className="text-white md:text-[17px] text-[15px] mt-[0.5rem]">
                        {movie?.name}
                      </p>
                    )}
                    <p className="text-white text-[17px] text-[15px] mont">
                      ⭐{movie?.vote_average.toFixed(1)}
                    </p>
                  </Link>
                </SwiperSlide>
              )}
            </>
          ))}
        </Swiper>
        {recommendedMovies?.length !== 0 && (
          <p className="text-white text-[20px] sm:text-[25px] poppins mb-[1rem] mt-[5rem]">
            Recommended Tv Shows
          </p>
        )}

        <Swiper
          spaceBetween={20}
          slidesPerView={5}
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
        >
          {recommendedMovies?.map((movie: MovieProps) => (
            <>
              {movie?.poster_path && (
                <SwiperSlide
                  key={movie?.id}
                  className="w-[100%] h-full hover:scale-[1.1] transition container__"
                >
                  <Link href={`/tvshows/[id]`} as={`/tvshows/${movie?.id}`}>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt="movie-poster"
                      width={200}
                      height={400}
                      className="image__container transition"
                    />
                    {movie?.name.length > 13 ? (
                      <p className="text-white  md:text-[17px] text-[15px] mt-[0.5rem]">
                        {movie?.name?.slice(0, 13)}..
                      </p>
                    ) : (
                      <p className="text-white md:text-[17px] text-[15px] mt-[0.5rem]">
                        {movie?.name}
                      </p>
                    )}
                    <p className="text-white text-[17px] text-[15px] mont">
                      ⭐{movie?.vote_average.toFixed(1)}
                    </p>
                  </Link>
                </SwiperSlide>
              )}
            </>
          ))}
        </Swiper>
      </section>
      <Footer />
    </div>
  );
};

export default EpisodePage;
