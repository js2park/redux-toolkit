import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type MoviesResponse = {
	status?: string;
	status_message?: string;
	data: {
		limit: number;
		movie_count: number;
		movies?: [];
	};
};

type MoviesRequest = {
	id: number;
};

// Define a service using a base URL and expected endpoints
export const moviesApi = createApi({
	reducerPath: 'moviesApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://yts.mx/api/v2/' }),
	tagTypes: ['Movie'],
	endpoints: (builder) => ({
		getMoviesList: builder.query<MoviesResponse, unknown>({
			query: () => ({
				url: 'list_movies.json',
				method: 'GET',
			}),
			providesTags: [{ type: 'Movie', id: 'LIST' }],
		}),
		getMovieById: builder.query({
			query: (movieId) => `list_movies.json?movie_id=${movieId}`,
			providesTags: (result, error, movieId) => [
				{ type: 'Movie', id: movieId },
			],
		}),
		createMovieDetail: builder.mutation<MoviesResponse, MoviesRequest>({
			query: ({ id }) => ({
				url: `list_movies.json?movie_id=${id}`,
				method: 'POST',
				body: id,
			}),
			invalidatesTags: (result) =>
				result ? [{ type: 'Movie', id: 'LIST' }] : [],
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMoviesListQuery, useCreateMovieDetailMutation } =
	moviesApi;
