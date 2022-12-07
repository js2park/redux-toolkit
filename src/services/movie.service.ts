import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type TTorrent = {
	url: string;
	hash: string;
	quality: string;
	type: string;
	seeds: number;
	peers: number;
	size: string;
	size_bytes: number;
	date_uploaded: string;
	date_uploaded_unix: number;
};

type TMovie = {
	id: number;
	url: string;
	imdb_code: string;
	title: string;
	title_english: string;
	title_long: string;
	slug: string;
	year: number;
	rating: number;
	runtime: number;
	genres: string[];
	download_count: number;
	like_count: number;
	description_intro: string;
	description_full: string;
	yt_trailer_code: string;
	language: string;
	mpa_rating: string;
	background_image: string;
	background_image_original: string;
	small_cover_image: string;
	medium_cover_image: string;
	large_cover_image: string;
	torrents: TTorrent[];
	date_uploaded: string;
	date_uploaded_unix: number;
};

type TMovieResponse = {
	status: string;
	status_message: string;
	data: {
		movie: TMovie | undefined;
	};
};

type TMoviesResponse = {
	status: string;
	status_message: string;
	data: {
		limit: number;
		movie_count: number;
		movies: (TMovie & { summary: string; synopsis: string })[];
	};
};

// 추천 영화
type TMovieSuggestions = {
	status: string;
	status_message: string;
	data: {
		movie_count: number;
		movies: TMovie[];
	};
};

// Define a service using a base URL and expected endpoints
export const moviesApi = createApi({
	reducerPath: 'moviesApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://yts.mx/api/v2/' }),
	tagTypes: ['Movie'],
	endpoints: (builder) => ({
		getMoviesList: builder.query<TMoviesResponse, unknown>({
			query: () => ({
				url: 'list_movies.json',
				method: 'GET',
			}),
			providesTags: [{ type: 'Movie', id: 'LIST' }],
		}),
		getMovieById: builder.query<TMovieResponse, string | undefined>({
			query: (movieId) => `movie_details.json?movie_id=${movieId}`,
			providesTags: (result, error, movieId) => [
				{ type: 'Movie', id: movieId },
			],
		}),
		getMovieSuggestions: builder.query<TMovieSuggestions, string | undefined>({
			query: (movieId) => ({
				url: `movie_suggestions.json?movie_id=${movieId}`,
				method: 'POST',
			}),
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetMoviesListQuery,
	useGetMovieByIdQuery,
	useGetMovieSuggestionsQuery,
} = moviesApi;
