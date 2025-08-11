import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchMovie = createAsyncThunk("fetchMovie",
  async () => {
    const apiToken = import.meta.env.VITE_API_TOKEN;
    const urlMovies = import.meta.env.VITE_MOVIES_URL + "&page=1";
    const urlGenres = import.meta.env.VITE_GENRES_URL;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiToken}`
      }
    };

    const promises = [fetch(urlMovies, options), fetch(urlGenres, options)];
    const [movieResp, genreResp] = await Promise.all(promises);

    if (!movieResp.ok || !genreResp.ok) {
      if (!movieResp.ok) throw { status: movieResp.status };
      if (!genreResp.ok) throw { status: genreResp.status };
    }

    const { results: movieResults } = await movieResp.json();
    const { genres: genreList } = await genreResp.json();

    const genreMap = new Map();
    genreList.forEach((e) => {
      genreMap.set(e.id, e.name);
    });

    const movies = await movieResults.map((e) => {
      const {
        id, title, release_date, genre_ids, poster_path, backdrop_path, runtime
      } = e;
      const result = {
        id, title, release_date, poster_path, backdrop_path, runtime
      };

      const genres = genre_ids.map((e) => {
        return genreMap.get(e);
      });

      Object.assign(result, { genres });
      return result;
    });

    return { movies, genreList };

    // const response = await fetch(urlMovies, options);
    // const { results } = await response.json();

    // const movies = results.map((e) => {
    //   const { id, title, release_date, genre_ids, poster_path } = e;
    //   const result = {
    //     id, title, release_date, genre_ids, poster_path
    //   };

    //   return result;
    // });

    // return movies;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    isLoading: false,
    isSuccess: false,
    isFailed: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovie.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchMovie.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
    })
    builder.addCase(fetchMovie.rejected, (state) => {
      state.error = true;
    })
  }
});

export default movieSlice.reducer;

// const initialState = {
//   movies: [],
//   isLoading: false,
//   isSuccess: false,
//   isFailed: false,
//   error: null,
// };

// const delay = (ms) => 
//   new Promise((resol) => {
//     setTimeout(() => resol(), ms);
//   });

// const getMoviesThunk = createAsyncThunk(
//   "movies/get_data",
//   async (_, { rejectWithValue }) => {
//     try {
//       const apiToken = import.meta.env.VITE_API_TOKEN;
//       const urlMovies = import.meta.env.VITE_MOVIES_URL + "&page=1";
//       const urlGenres = import.meta.env.VITE_GENRES_URL;
//       const options = {
//         method: 'GET',
//         headers: {
//           accept: 'application/json',
//           Authorization: `Bearer ${apiToken}`
//         }
//       };

//       const promises = [fetch(urlMovies, options), fetch(urlGenres, options)];
//       const [moviesResp, genresResp] = await Promise.all(promises);

//       if (!moviesResp.ok || !genresResp.ok) {
//         if (!moviesResp.ok) throw { status: moviesResp.status };
//         if (!genresResp.ok) throw { status: genresResp.status };
//       }

//       const { results: movieResults } = await moviesResp.json();
//       const { genres: genreList } = await genresResp.json();

//       const genreMap = new Map();
//       genreList.forEach((genre) => {
//         genreMap.set(genre.id, genre.name);
//       });

//       return await movieResults.map((movie) => {
//         const { id, title, release_date, genre_ids, poster_path } = movie;
//         const result = {
//           id, title, release_date, poster_path
//         };
//         const genres = genre_ids.map((genre_id) => {
//           return genreMap.get(genre_id);
//         });
//         Object.assign(result, { genres });
//         return result;
//       });

//     } catch (err) {
//       return rejectWithValue(err);
//     }
//   },
// );

// const movieSlice = createSlice({
//   initialState,
//   name: 'movie',
//   extraReducers: (builder) =>
//     builder
//       .addCase(getMoviesThunk.pending, (state) => {
//         state.isLoading = true;
//         state.isSuccess = false;
//         state.isFailed = false;
//         state.error = null;
//       })
//       .addCase(getMoviesThunk.fulfilled, (state, { payload }) => {
//         state.movies = payload;
//         state.isLoading = false;
//         state.isSuccess = true;
//       })
//       .addCase(getMoviesThunk.rejected, (state, { payload, error }) => {
//         state.error = { payload, error };
//         state.isLoading = false;
//         state.isFailed = true;
//       }),
// });

// export default movieSlice.reducer;

// export const movieActions = { ...movieSlice.actions, getMoviesThunk };
