export const movieOptions = (page = 1) => {
  return {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/top_rated',
    params: { language: 'en-US', page: page },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  };
};

export const discoverMovieOptions = (page = "1", ...genre) => {
  const BASE_URL = 'https://api.themoviedb.org/3/discover/movie';
  const BASE_PARAMS = {
    include_adult: 'false',
    include_video: 'false',
    language: 'en-US',
    page: page,
    sort_by: 'popularity.desc',
    with_genres: genre.join(',')
  };

  return {
    method: 'GET',
    url: BASE_URL,
    params: BASE_PARAMS,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  };
};

export const searchOptions = (query = "", page = 1) => {
  return {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/search/movie',
    params: {
      query: query, include_adult: 'false', language: 'en-US', page: page
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
    }
  };
};

export const genreOptions = () => {
  return {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/genre/movie/list',
    params: { language: 'en' },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  };
};

export const detailOptions = (id) => {
  return {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${id}`,
    params: { language: 'en-US' },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
    }
  }
};

export const creditOptions = (id) => {
  return {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${id}/credits`,
    params: { language: 'en-US' },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
    }
  }
};

