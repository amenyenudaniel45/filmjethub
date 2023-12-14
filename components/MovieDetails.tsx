"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  MovieCastAPI,
  MovieDetailsAPI,
  MovieReviewsAPI,
  MovieSimilarAPI,
  MovieTrailerAPI,
  RecommendedMovieAPI,
} from "@/constants/api";
import Image from "next/image";
import { MovieDetailsProps, MovieProps, MovieTrailerProps } from "@/types";
import Loading from "./Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";

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

function formatRuntime(runtime: number) {
  if (typeof runtime === "number" && runtime > 0) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  } else {
    return "N/A";
  }
}
const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState<MovieDetailsProps>();
  const [loading, setLoading] = useState(false);
  const [trailer, setTrailer] = useState([]);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [recommendedMovies, setRecommended] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [more, setMore] = useState(false);
  const [more1, setMore1] = useState(false);
  const [more2, setMore2] = useState(false);
  const [more3, setMore3] = useState(false);
  const [more4, setMore4] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    try {
      MovieDetailsAPI(id).then((data) => {
        setMovieDetails(data);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    try {
      MovieTrailerAPI(id).then((data) => {
        setTrailer(data?.results);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    try {
      MovieCastAPI(id).then((data) => {
        setCast(data?.cast);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    try {
      MovieSimilarAPI(id).then((data) => {
        setSimilarMovies(data.results);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    try {
      RecommendedMovieAPI(id).then((data) => {
        setRecommended(data?.results);
        console.log(data?.results);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    try {
      MovieReviewsAPI(id).then((data) => {
        setReviews(data?.results);
        console.log(data?.results);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const releaseDate = movieDetails?.release_date
    ? new Date(movieDetails.release_date)
    : undefined;

  console.log(id);
  if (loading) {
    return <Loading />;
  }
  return (
    <section className="padding bg-black">
      <div className="flex flex-wrap gap-[1rem] md:flex-nowrap justify-center md:justify-start">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}
          width={300}
          height={10}
          alt="movie__poster"
        />

        <div className="p-2">
          <h1 className="text-white text-[20px] sm:text-[23px] poppins">
            {movieDetails?.title}
          </h1>
          <p className="text-white mont text-[16px] sm:text-[17px]">
            {movieDetails?.tagline}
          </p>

          <div className="mt-[10px] flex items-center gap-[1rem] flex-wrap">
            <p className="text-[15px] text-white mont">
              {formatDate(releaseDate)}
            </p>

            <p className="text-[15px] text-white mont">
              {formatRuntime(movieDetails?.runtime || 0)}
            </p>
            <div className="flex gap-[1rem] items-center ">
              {movieDetails?.production_countries?.map((country: any) => (
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
            {movieDetails?.overview}
          </p>
          <p className="mt-[1rem] text-white mont text-[17px]">
            {" "}
            ⭐{movieDetails?.vote_average.toFixed(1)}
          </p>
          <div className="mt-[1rem] flex gap-[1rem] items-center flex-wrap">
            {movieDetails?.genres?.map((item: any) => (
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
              {movieDetails?.status}
            </p>
            <p className="text-white mont text-[15px]">
              {movieDetails?.vote_count} votes
            </p>
          </div>
          <p className="mt-[1rem] text-white poppins text-[18px]">Languages</p>
          <div className="flex gap-[1rem] flex-wrap">
            {movieDetails?.spoken_languages?.map((language: any) => (
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
        {movieDetails?.production_companies?.map((company: any) => (
          <p
            className="text-white mont text-[18px] border border-red px-2 py-1 rounded-[5px]"
            key={company?.id}
          >
            {company?.name}
          </p>
        ))}
      </div>

      {trailer && (
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

      <div className="text-white text-[20px] sm:text-[25px] poppins mt-[3rem]">
        Watch Full Movie Now
        <iframe
          src={`https://vidsrc.to/embed/movie/${id}`}
          title="Movie"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="border border-red mt-[1rem] w-[100%] lg:h-[800px] sm:h-[500px] h-[300px]"
        ></iframe>
      </div>
      {/* Credits */}
      <p className="text-white text-[20px] sm:text-[25px] poppins mt-[5rem]">
        Cast
      </p>

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
          Similar Movies
        </p>
      )}
      <Swiper
        spaceBetween={20}
        slidesPerView={5}
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
      >
        {similarMovies?.map((movie: MovieProps) => (
          <>
            {movie?.poster_path && (
              <SwiperSlide
                key={movie?.id}
                className="w-[100%] h-full hover:scale-[1.1] transition container__"
              >
                <Link href={`/home/[id]`} as={`/home/${movie?.id}`}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="movie-poster"
                    width={200}
                    height={400}
                    className="image__container transition"
                  />
                  {movie?.title.length > 13 ? (
                    <p className="text-white  md:text-[17px] text-[15px] mt-[0.5rem]">
                      {movie?.title.slice(0, 13)}..
                    </p>
                  ) : (
                    <p className="text-white md:text-[17px] text-[15px] mt-[0.5rem]">
                      {movie?.title}
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
      {recommendedMovies.length !== 0 && (
        <p className="text-white text-[20px] sm:text-[25px] poppins mb-[1rem] mt-[5rem]">
          Recommended Movies
        </p>
      )}

      <Swiper
        spaceBetween={20}
        slidesPerView={5}
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
      >
        {recommendedMovies?.map((movie: MovieProps) => (
          <>
            {movie?.poster_path && (
              <SwiperSlide
                key={movie?.id}
                className="w-[100%] h-full hover:scale-[1.1] transition container__"
              >
                <Link href={`/home/[id]`} as={`/home/${movie?.id}`}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="movie-poster"
                    width={200}
                    height={400}
                    className="image__container transition"
                  />
                  {movie?.title.length > 13 ? (
                    <p className="text-white  md:text-[17px] text-[15px] mt-[0.5rem]">
                      {movie?.title.slice(0, 13)}..
                    </p>
                  ) : (
                    <p className="text-white md:text-[17px] text-[15px] mt-[0.5rem]">
                      {movie?.title}
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

      {reviews.length !== 0 && (
        <p className="text-white poppins text-[20px] sm:text-[25px] mt-[5rem]">
          Reviews
        </p>
      )}
      <div className="flex slide__bar overflow-auto gap-[2rem] mt-[2rem] pb-[3rem]">
        <div>
          {reviews?.slice(0, 1)?.map((review: any) => (
            <div className="flex flex-col reviews sm:w-[500px] w-[250px] p-3 rounded-[2rem]">
              <div className="flex items-center gap-[1rem] flex-wrap">
                <Image
                  src={
                    review?.author_details?.avatar_path
                      ? `https://image.tmdb.org/t/p/w500${review?.author_details?.avatar_path}`
                      : "/profile.webp"
                  }
                  alt="movie-poster"
                  width={100}
                  height={100}
                  className="rounded-[1rem] mt-[0.5rem] mb-[1rem]"
                />
                <div>
                  <p className="text-white text-[17px] mont">
                    {review?.author}
                  </p>
                  <p className="text-white mont text-[17px]">
                    ⭐{review?.author_details?.rating}
                  </p>
                </div>
              </div>
              {review?.content.length > 115 ? (
                <div>
                  <div
                    style={more ? { height: "100%" } : { height: "50px" }}
                    className="h-[50px] overflow-hidden"
                  >
                    <p className="text-white mont p-2 text-[16px]">
                      {review?.content}
                    </p>
                  </div>
                  <p
                    className="gray-cast font-bold mont p-4 hover:text-red transition text-[17px] cursor-pointer"
                    onClick={() => setMore(!more)}
                  >
                    {!more ? "Read More" : "Close"}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-white mont p-2 text-[16px]">
                    {review?.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div>
          {reviews.length >= 2 && (
            <div className="flex flex-wrap gap-[2rem]">
              {reviews?.slice(1, 2)?.map((review: any) => (
                <div className="flex flex-col reviews sm:w-[500px] w-[250px] p-3 rounded-[2rem]">
                  <div className="flex items-center gap-[1rem]">
                    <Image
                      src={
                        review?.author_details?.avatar_path
                          ? `https://image.tmdb.org/t/p/w500${review?.author_details?.avatar_path}`
                          : "/profile.webp"
                      }
                      alt="movie-poster"
                      width={100}
                      height={100}
                      className="rounded-[1rem] mt-[0.5rem] mb-[1rem]"
                    />
                    <div>
                      <p className="text-white text-[17px] mont">
                        {review?.author}
                      </p>
                      <p className="text-white mont text-[17px]">
                        ⭐{review?.author_details?.rating}
                      </p>
                    </div>
                  </div>
                  {review?.content.length > 115 ? (
                    <div>
                      <div
                        style={more1 ? { height: "100%" } : { height: "50px" }}
                        className="h-[50px] overflow-hidden"
                      >
                        <p className="text-white mont p-2 text-[16px]">
                          {review?.content}
                        </p>
                      </div>
                      <p
                        className="gray-cast font-bold mont p-4 hover:text-red transition text-[17px] cursor-pointer"
                        onClick={() => setMore1(!more1)}
                      >
                        {!more1 ? "Read More" : "Close"}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-white mont p-2 text-[16px]">
                        {review?.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          {reviews.length >= 3 && (
            <div className="flex flex-wrap gap-[2rem] ">
              {reviews?.slice(2, 3)?.map((review: any) => (
                <div className="flex flex-col reviews sm:w-[500px] w-[250px] p-3 rounded-[2rem]">
                  <div className="flex items-center gap-[1rem]">
                    <Image
                      src={
                        review?.author_details?.avatar_path
                          ? `https://image.tmdb.org/t/p/w500${review?.author_details?.avatar_path}`
                          : "/profile.webp"
                      }
                      alt="movie-poster"
                      width={100}
                      height={100}
                      className="rounded-[1rem] mt-[0.5rem] mb-[1rem]"
                    />
                    <div>
                      <p className="text-white text-[17px] mont">
                        {review?.author}
                      </p>
                      <p className="text-white mont text-[17px]">
                        ⭐{review?.author_details?.rating}
                      </p>
                    </div>
                  </div>
                  {review?.content.length > 115 ? (
                    <div>
                      <div
                        style={more2 ? { height: "100%" } : { height: "50px" }}
                        className="h-[50px] overflow-hidden"
                      >
                        <p className="text-white mont p-2 text-[16px]">
                          {review?.content}
                        </p>
                      </div>
                      <p
                        className="gray-cast font-bold mont p-4 hover:text-red transition text-[17px] cursor-pointer"
                        onClick={() => setMore2(!more2)}
                      >
                        {!more2 ? "Read More" : "Close"}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-white mont p-2 text-[16px]">
                        {review?.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          {reviews.length >= 4 && (
            <div className="flex flex-wrap gap-[2rem] ">
              {reviews?.slice(3, 4)?.map((review: any) => (
                <div className="flex flex-col reviews sm:w-[500px] w-[250px] p-3 rounded-[2rem]">
                  <div className="flex items-center gap-[1rem]">
                    <Image
                      src={
                        review?.author_details?.avatar_path
                          ? `https://image.tmdb.org/t/p/w500${review?.author_details?.avatar_path}`
                          : "/profile.webp"
                      }
                      alt="movie-poster"
                      width={100}
                      height={100}
                      className="rounded-[1rem] mt-[0.5rem] mb-[1rem]"
                    />
                    <div>
                      <p className="text-white text-[17px] mont">
                        {review?.author}
                      </p>
                      <p className="text-white mont text-[17px]">
                        ⭐{review?.author_details?.rating}
                      </p>
                    </div>
                  </div>
                  {review?.content.length > 115 ? (
                    <div>
                      <div
                        style={more3 ? { height: "100%" } : { height: "50px" }}
                        className="h-[50px] overflow-hidden"
                      >
                        <p className="text-white mont p-2 text-[16px]">
                          {review?.content}
                        </p>
                      </div>
                      <p
                        className="gray-cast font-bold mont p-4 hover:text-red transition text-[17px] cursor-pointer"
                        onClick={() => setMore3(!more3)}
                      >
                        {!more3 ? "Read More" : "Close"}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-white mont p-2 text-[16px]">
                        {review?.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          {reviews.length >= 4 && (
            <div className="flex flex-wrap gap-[2rem] ">
              {reviews?.slice(4, 5)?.map((review: any) => (
                <div className="flex flex-col reviews sm:w-[500px] w-[250px] p-3 rounded-[2rem]">
                  <div className="flex items-center gap-[1rem]">
                    <Image
                      src={
                        review?.author_details?.avatar_path
                          ? `https://image.tmdb.org/t/p/w500${review?.author_details?.avatar_path}`
                          : "/profile.webp"
                      }
                      alt="movie-poster"
                      width={100}
                      height={100}
                      className="rounded-[1rem] mt-[0.5rem] mb-[1rem]"
                    />
                    <div>
                      <p className="text-white text-[17px] mont">
                        {review?.author}
                      </p>
                      <p className="text-white mont text-[17px]">
                        ⭐{review?.author_details?.rating}
                      </p>
                    </div>
                  </div>
                  {review?.content.length > 115 ? (
                    <div>
                      <div
                        style={more4 ? { height: "100%" } : { height: "50px" }}
                        className="h-[50px] overflow-hidden"
                      >
                        <p className="text-white mont p-2 text-[16px]">
                          {review?.content}
                        </p>
                      </div>
                      <p
                        className="gray-cast font-bold mont p-4 hover:text-red transition text-[17px] cursor-pointer"
                        onClick={() => setMore4(!more4)}
                      >
                        {!more4 ? "Read More" : "Close"}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-white mont p-2 text-[16px]">
                        {review?.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MovieDetails;
