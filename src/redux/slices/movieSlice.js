import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { discoverMovieOptions, genreOptions, movieOptions, searchOptions } from "../../utils/movieOptions";

const initialState = {
  movies: [],
  upcoming: [],
  genres: [],
  detail: {},
  isLoading: false,
  isSuccess: false,
  isFailed: false,
  error: null,
};

export const getDetail = createAsyncThunk(
  "movies/get_detail",
  async (id, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_BASE_API_URL}/movies/${id}`;
      const resp = await fetch(url);

      if (!resp.ok) throw resp.statusText;
      const data = await resp.json();
      return data.result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)

export const getFilter = createAsyncThunk(
  "movies/get_filter",
  async ({page = 1, q = "", genre = ""}, { rejectWithValue }) => {
    try {
      let url = `${import.meta.env.VITE_BASE_API_URL}/movies?page=${page}`;
      if (q != "") {
        url += `&q=${q}`
      }
      if (genre != "") {
        url += `&genre=${genre}`
      }
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`Error ${resp.status}: ${resp.statusText}`);
      }

      const data = await resp.json();
      return data.result;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
)

export const getUpcoming = createAsyncThunk(
  "movies/get_upcoming",
  async (_, { rejectWithValue }) => {
    try {
      const url = `${import.meta.env.VITE_BASE_API_URL}/movies/upcoming`;
      const resp = await fetch(url);

      if (!resp.ok) {
        throw new Error(`Error ${resp.status}: ${resp.statusText}`);
      }

      const data = await resp.json();
      return data.result;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getMovie = createAsyncThunk(
  "movies/get_movie",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.request(movieOptions());
      const { results } = response.data;

      return results.map((e) => {
        const {
          title, poster_path, backdrop_path, genre_ids, release_date
        } = e;

        return {
          title, poster_path, backdrop_path, genre_ids, release_date
        };
      });
    } catch (err) { return rejectWithValue(err); }
  }
);

export const getDiscoverMovie = createAsyncThunk(
  "movies/get_discover",
  async ({ page, genre }, { rejectWithValue }) => {
    try {
      const response = await axios.request(discoverMovieOptions(page, genre));
      return response.data.results;
    } catch (err) { return rejectWithValue(err); }
  }
);

export const getGenres = createAsyncThunk(
  "movies/get_genres",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.request(genreOptions());
      return response.data.genres;
    } catch (err) { return rejectWithValue(err); }
  }
);

export const getSearch = createAsyncThunk(
  "movies/get_search",
  async ({ query, page }, { rejectWithValue }) => {
    try {
      const response = await axios.request(searchOptions(query, page));
      return response.data.results;
    } catch (err) { return rejectWithValue(err); }
  }
);

const movieSlice = createSlice({
  name: "tmdb",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDetail.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })
      .addCase(getDetail.fulfilled, (state, { payload }) => {
        state.detail = payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getDetail.rejected, (state, { payload, error }) => {
        state.error = { payload, error };
        state.isFailed = true;
        state.isLoading = false;
      })

      .addCase(getFilter.fulfilled, (state, { payload }) => {
        state.movies = payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getFilter.rejected, (state, { payload, error }) => {
        state.error = { payload, error };
        state.isFailed = true;
        state.isLoading = false;
      })

      .addCase(getUpcoming.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })
      .addCase(getUpcoming.fulfilled, (state, { payload }) => {
        state.upcoming = payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getUpcoming.rejected, (state, { payload, error }) => {
        state.error = { payload, error };
        state.isFailed = true;
        state.isLoading = false;
      })

      .addCase(getDiscoverMovie.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })
      .addCase(getDiscoverMovie.fulfilled, (state, { payload }) => {
        state.movies = payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getDiscoverMovie.rejected, (state, { payload, error }) => {
        state.error = { payload, error };
        state.isFailed = true;
        state.isLoading = false;
      })

      .addCase(getGenres.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })
      .addCase(getGenres.fulfilled, (state, { payload }) => {
        state.genres = payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getGenres.rejected, (state, { payload, error }) => {
        state.error = { payload, error };
        state.isFailed = true;
        state.isLoading = false;
      })

      .addCase(getMovie.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })
      .addCase(getMovie.fulfilled, (state, { payload }) => {
        state.movies = payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getMovie.rejected, (state, { payload, error }) => {
        state.error = { payload, error };
        state.isFailed = true;
        state.isLoading = false;
      })

      .addCase(getSearch.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isFailed = false;
        state.error = null;
      })
      .addCase(getSearch.fulfilled, (state, { payload }) => {
        state.movies = payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getSearch.rejected, (state, { payload, error }) => {
        state.error = { payload, error };
        state.isFailed = true;
        state.isLoading = false;
      })
  }
});

export default movieSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// export const fetchMovie = createAsyncThunk("fetchMovie",
//   async () => {
//     const apiToken = import.meta.env.VITE_API_TOKEN;
//     const urlMovies = import.meta.env.VITE_MOVIES_URL + "&page=1";
//     const urlGenres = import.meta.env.VITE_GENRES_URL;
//     const options = {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         Authorization: `Bearer ${apiToken}`
//       }
//     };

//     const promises = [fetch(urlMovies, options), fetch(urlGenres, options)];
//     const [movieResp, genreResp] = await Promise.all(promises);

//     if (!movieResp.ok || !genreResp.ok) {
//       if (!movieResp.ok) throw { status: movieResp.status };
//       if (!genreResp.ok) throw { status: genreResp.status };
//     }

//     const { results: movieResults } = await movieResp.json();
//     const { genres: genreList } = await genreResp.json();

//     const genreMap = new Map();
//     genreList.forEach((e) => {
//       genreMap.set(e.id, e.name);
//     });

//     const movies = await movieResults.map((e) => {
//       const {
//         id, title, release_date, genre_ids, poster_path, backdrop_path, runtime
//       } = e;
//       const result = {
//         id, title, release_date, poster_path, backdrop_path, runtime
//       };

//       const genres = genre_ids.map((e) => {
//         return genreMap.get(e);
//       });

//       Object.assign(result, { genres });
//       return result;
//     });

//     return { movies, genreList };
//   }
// );

// const movieSlice = createSlice({
//   name: "movies",
//   initialState: {
//     movies: [],
//     isLoading: false,
//     isSuccess: false,
//     isFailed: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchMovie.pending, (state) => {
//       state.isLoading = true
//     })
//     builder.addCase(fetchMovie.fulfilled, (state, action) => {
//       state.movies = action.payload;
//       state.isSuccess = true;
//       state.isLoading = false;
//     })
//     builder.addCase(fetchMovie.rejected, (state) => {
//       state.error = true;
//     })
//   }
// });

// export default movieSlice.reducer;
