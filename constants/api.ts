import axios from "axios";

const options = {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
};

export const TrendingMovies = async () => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US&page=1",
      options
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const nowPlayingMovies = async () => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      options
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const MovieDetailsAPI = async (id: any) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      options
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const MovieTrailerAPI = async (id: any) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      options
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const MovieCastAPI = async (id: any) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits`,
      options
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const MovieSimilarAPI = async (id: any) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar`,
      options
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const RecommendedMovieAPI = async (id: any) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/recommendations`,
      options
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const MovieReviewsAPI = async (id: any) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/reviews`,
      options
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const allMoviesAPI = async (value: any) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?page=${value}`,
      options
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const nowPlayingTvShows = async () => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/tv/day",
      options
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const allSeriesAPI = async (value: any) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/day?page=${value}`,
      options
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Tv Shows

export const TvShowsDetailsAPI = async (id: any) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}`,
      options
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const TvShowsTrailerAPI = async (id: any) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/videos`,
      options
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const TvShowsCastAPI = async (id: any) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/credits`,
      options
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const TvShowsSimilarAPI = async (id: any) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/similar`,
      options
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const RecommendedTvShowsAPI = async (id: any) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/recommendations`,
      options
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const TvShowsReviewsAPI = async (id: any) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/reviews`,
      options
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const allSeasonAPI = async (id: any, season_number: any) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/season/${season_number}`,
      options
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const EpisodeDetailsAPI = async (
  id: any,
  season_number: any,
  episode_number: any
) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/season/${season_number}/episode/${episode_number}`,
      options
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const SearchMovie = async (searchTerm: any) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${searchTerm}`,
      options
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const SearchTvShows = async (searchTerm: any) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/tv?query=${searchTerm}`,
      options
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
