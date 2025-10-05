import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  upcoming: [],
  // genres: [],
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

const movieSlice = createSlice({
  name: "tmdb",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder
    //   .addCase(getDetail.pending, (state) => {
    //     state.isLoading = true;
    //     state.isSuccess = false;
    //     state.isFailed = false;
    //     state.error = null;
    //   })
    //   .addCase(getDetail.fulfilled, (state, { payload }) => {
    //     state.detail = payload;
    //     state.isSuccess = true;
    //     state.isLoading = false;
    //   })
    //   .addCase(getDetail.rejected, (state, { payload, error }) => {
    //     state.error = { payload, error };
    //     state.isFailed = true;
    //     state.isLoading = false;
    //   })

    //   .addCase(getFilter.fulfilled, (state, { payload }) => {
    //     state.movies = payload;
    //     state.isSuccess = true;
    //     state.isLoading = false;
    //   })
    //   .addCase(getFilter.rejected, (state, { payload, error }) => {
    //     state.error = { payload, error };
    //     state.isFailed = true;
    //     state.isLoading = false;
    //   })

    //   .addCase(getUpcoming.pending, (state) => {
    //     state.isLoading = true;
    //     state.isSuccess = false;
    //     state.isFailed = false;
    //     state.error = null;
    //   })
    //   .addCase(getUpcoming.fulfilled, (state, { payload }) => {
    //     state.upcoming = payload;
    //     state.isSuccess = true;
    //     state.isLoading = false;
    //   })
    //   .addCase(getUpcoming.rejected, (state, { payload, error }) => {
    //     state.error = { payload, error };
    //     state.isFailed = true;
    //     state.isLoading = false;
    //   })

    //   .addCase(getDiscoverMovie.pending, (state) => {
    //     state.isLoading = true;
    //     state.isSuccess = false;
    //     state.isFailed = false;
    //     state.error = null;
    //   })
    //   .addCase(getDiscoverMovie.fulfilled, (state, { payload }) => {
    //     state.movies = payload;
    //     state.isSuccess = true;
    //     state.isLoading = false;
    //   })
    //   .addCase(getDiscoverMovie.rejected, (state, { payload, error }) => {
    //     state.error = { payload, error };
    //     state.isFailed = true;
    //     state.isLoading = false;
    //   })

      // .addCase(getGenres.pending, (state) => {
      //   state.isLoading = true;
      //   state.isSuccess = false;
      //   state.isFailed = false;
      //   state.error = null;
      // })
      // .addCase(getGenres.fulfilled, (state, { payload }) => {
      //   state.genres = payload;
      //   state.isSuccess = true;
      //   state.isLoading = false;
      // })
      // .addCase(getGenres.rejected, (state, { payload, error }) => {
      //   state.error = { payload, error };
      //   state.isFailed = true;
      //   state.isLoading = false;
      // })

      // .addCase(getMovie.pending, (state) => {
      //   state.isLoading = true;
      //   state.isSuccess = false;
      //   state.isFailed = false;
      //   state.error = null;
      // })
      // .addCase(getMovie.fulfilled, (state, { payload }) => {
      //   state.movies = payload;
      //   state.isSuccess = true;
      //   state.isLoading = false;
      // })
      // .addCase(getMovie.rejected, (state, { payload, error }) => {
      //   state.error = { payload, error };
      //   state.isFailed = true;
      //   state.isLoading = false;
      // })

      // .addCase(getSearch.pending, (state) => {
      //   state.isLoading = true;
      //   state.isSuccess = false;
      //   state.isFailed = false;
      //   state.error = null;
      // })
      // .addCase(getSearch.fulfilled, (state, { payload }) => {
      //   state.movies = payload;
      //   state.isSuccess = true;
      //   state.isLoading = false;
      // })
      // .addCase(getSearch.rejected, (state, { payload, error }) => {
      //   state.error = { payload, error };
      //   state.isFailed = true;
      //   state.isLoading = false;
      // })
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
