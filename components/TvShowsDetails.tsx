"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  TvShowsCastAPI,
  TvShowsDetailsAPI,
  TvShowsSimilarAPI,
  TvShowsTrailerAPI,
  RecommendedTvShowsAPI,
  allSeasonAPI,
} from "@/constants/api";
import Image from "next/image";
import { MovieDetailsProps, MovieProps, MovieTrailerProps } from "@/types";
import Loading from "./Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import AccordionSeason from "./AccordionSeason";

const TvShowsDetails = () => {
  const [tvShowsDetails, setTvShowsDetails] = useState<MovieDetailsProps>();
  const [loading, setLoading] = useState(false);
  const [trailer, setTrailer] = useState([]);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [recommendedMovies, setRecommended] = useState([]);

  const [numberOfSeasons, setNumberOfSeasons] = useState(0);
  const [allSeasonsData, setAllSeasonsData] = useState([]);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const details = await TvShowsDetailsAPI(id);
        setTvShowsDetails(details);
        console.log("TvShowsDetails", details);

        const trailerData = await TvShowsTrailerAPI(id);
        setTrailer(trailerData?.results);

        const castData = await TvShowsCastAPI(id);
        setCast(castData?.cast);
        console.log(castData);

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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, numberOfSeasons]);

  function formatDate(date: any) {
    if (date instanceof Date && !isNaN(date.getTime())) {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } else {
      return "Invalid Date";
    }
  }

  if (loading) {
    return <Loading />;
  }

  const releaseDate = tvShowsDetails?.first_air_date
    ? new Date(tvShowsDetails?.first_air_date)
    : undefined;
  return (
    <section className="padding bg-black">
      <div className="flex flex-wrap gap-[1rem] md:flex-nowrap justify-center md:justify-start">
        <Image
          src={`https://image.tmdb.org/t/p/w500${tvShowsDetails?.poster_path}`}
          width={300}
          height={10}
          alt="movie__poster"
        />

        <div className="p-2">
          <h1 className="text-white text-[20px] sm:text-[23px] poppins">
            {tvShowsDetails?.name}
          </h1>
          <p className="text-white mont text-[16px] sm:text-[17px]">
            {tvShowsDetails?.tagline}
          </p>

          <div className="mt-[10px] flex items-center gap-[1rem] flex-wrap">
            {tvShowsDetails?.first_air_date !== "" && (
              <p className="text-[15px] text-white mont">
                {formatDate(releaseDate)}
              </p>
            )}

            <div className="flex gap-[1rem] items-center ">
              {tvShowsDetails?.production_countries?.map((country: any) => (
                <p
                  key={country?.name}
                  className="text-white text-[15px] mont border border-red px-3 py-1 rounded-[5px]"
                >
                  {country?.name}
                </p>
              ))}
            </div>
          </div>
          <p className="text-white poppins text-[18px] mt-[1rem]">Overview</p>
          <p className="text-white  mont text-[15px] sm:text-[17px] leading-7">
            {tvShowsDetails?.overview}
          </p>
          <p className="mt-[1rem] text-white mont text-[17px]">
            {" "}
            ⭐{tvShowsDetails?.vote_average.toFixed(1)}
          </p>
          <div className="mt-[1rem] flex gap-[1rem] items-center flex-wrap">
            {tvShowsDetails?.genres?.map((item: any) => (
              <p
                className="text-white mont text-[17px] border border-red px-3 py-1 rounded-[5px]"
                key={item?.id}
              >
                {item?.name}
              </p>
            ))}
          </div>
          <div className="mt-[1rem] flex items-center gap-[1rem]">
            <p className="text-white mont text-[17px] ">
              {tvShowsDetails?.number_of_seasons} Season(s) and{" "}
              {tvShowsDetails?.number_of_episodes} Episodes
            </p>
            <p className="text-white mont text-[17px] ">
              {tvShowsDetails?.status}
            </p>
            <p className="text-white mont text-[15px]">
              {tvShowsDetails?.vote_count} votes
            </p>
          </div>
          <p className="mt-[1rem] text-white poppins text-[18px]">Languages</p>
          <div className="flex gap-[1rem] flex-wrap">
            {tvShowsDetails?.spoken_languages?.map((language: any) => (
              <p
                className="text-white mont text-[17px] border border-red rounded-[5px] px-3 py-1 mt-[10px]"
                key={language?.name}
              >
                {language?.name}
              </p>
            ))}
          </div>
        </div>
      </div>
      <h2 className="text-white text-[19px] sm:text-[23px] mt-[2rem] poppins">
        Production Companies
      </h2>
      <div className="mt-[0.5rem] flex items-center gap-[1rem] flex-wrap">
        {tvShowsDetails?.production_companies?.map((company: any) => (
          <p
            className="text-white mont text-[18px] border border-red px-2 py-1 rounded-[5px]"
            key={company?.id}
          >
            {company?.name}
          </p>
        ))}
      </div>

      {trailer.length !== 0 && (
        <div className="mt-[4rem]">
          <h1 className="text-white poppins text-[20px] sm:text-[23px]">
            Watch Trailer
          </h1>

          <div className="flex gap-[3rem] items-center overflow-auto mt-[1rem] slide__bar pb-[2rem]">
            {trailer?.map((movieTrailer: MovieTrailerProps) => (
              <div key={movieTrailer?.id}>
                <iframe
                  className="sm:w-[400px] w-[300px] sm:h-[300px] h-[250px]"
                  src={`https://www.youtube.com/embed/${movieTrailer.key}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>

                <p className="text-white mont text-[15px] pl-3">
                  {movieTrailer?.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      {allSeasonsData.length !== 0 && (
        <h1 className="text-white poppins text-[20px] mt-[3rem] mb-[2rem] sm:text-[23px]">
          Watch Tv Show
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
      {cast.length !== 0 && (
        <p className="text-white text-[20px] sm:text-[25px] poppins mt-[5rem]">
          Cast
        </p>
      )}

      <div className="flex items-center sm:gap-[7rem] gap-[5rem]  flex-wrap mt-[1rem]">
        {cast?.slice(0, 20).map((person: any) => (
          <div key={person?.cast_id} className="flex items-center gap-[1rem]">
            {person?.profile_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${person?.profile_path}`}
                alt="cast--image"
                width={50}
                height={50}
              />
            ) : (
              <Image
                src={"/profile.webp"}
                alt="cast--image"
                width={50}
                height={50}
              />
            )}

            <div className="flex flex-col gap-[0.5rem]">
              <p className="text-white poppins text-[16px] ">
                {person?.original_name}
              </p>
              <p className="gray-cast mont font-bold text-[14px]">
                {person?.character}
              </p>
            </div>
          </div>
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
  );
};

export default TvShowsDetails;
