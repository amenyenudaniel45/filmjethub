"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { SearchMovie, SearchTvShows } from "@/constants/api";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MovieProps } from "@/types";
import Loading from "@/components/Loading";

const SearchPage = () => {
  const [searchDetails, setSearchDetails] = useState([]);
  const [searchTVDetails, setSearchTVDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const { searchTerm } = useParams();

  useEffect(() => {
    setLoading(true);
    try {
      SearchMovie(`${searchTerm}`).then((data) => {
        setSearchDetails(data?.results);
      });

      SearchTvShows(`${searchTerm}`).then((data) => {
        console.log("SearchTerm", data);
        setSearchTVDetails(data?.results);
      });
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }, [searchTerm]);
  const decodedSearchTerm = decodeURIComponent(`${searchTerm}`);

  if (loading) {
    return <Loading />;
  }
  if (searchDetails.length == 0 && searchTVDetails.length == 0) {
    return (
      <div>
        <Navbar />
        <h1 className="padding bg-black text-white text-center mont sm:text-[25px] text-[16px]">
          Opps! No Results found for{" "}
          <span className="text-red">{decodedSearchTerm}</span>
        </h1>
        <Footer />
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <section className="padding bg-black">
        {searchDetails.length !== 0 && (
          <h1 className="text-white poppins sm:text-[25px] text-[20px] mb-[2rem]">
            Movies Results For{" "}
            <span className="mont text-red">
              {decodedSearchTerm.toLocaleUpperCase()}
            </span>{" "}
          </h1>
        )}
        <div className="flex flex-wrap gap-[1.5rem] sm:justify-start justify-center">
          {searchDetails?.map((movie: MovieProps) => (
            <div
              key={movie?.id}
              className="h-full hover:scale-[1.1] transition container__"
            >
              <Link href={`/home/[id]`} as={`/home/${movie?.id}`}>
                <div className="sm:w-[200px] sm:h-[full] w-[110px] h-auto">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                    alt="movie-poster"
                    width={200}
                    height={400}
                    className="image__container transition"
                  />
                </div>
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
            </div>
          ))}
        </div>
        {searchTVDetails.length !== 0 && (
          <h1 className="text-white poppins sm:text-[25px] text-[20px] mb-[2rem] mt-[3rem]">
            TV Shows Results For{" "}
            <span className="mont text-red">
              {decodedSearchTerm.toLocaleUpperCase()}
            </span>{" "}
          </h1>
        )}
        <div className="flex flex-wrap gap-[1.5rem] sm:justify-start justify-center">
          {searchTVDetails?.map((tvShow: MovieProps) => (
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
      </section>
      <Footer />
    </div>
  );
};

export default SearchPage;
