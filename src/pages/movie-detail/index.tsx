import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCreateMovieDetailMutation } from '../../services/movie.service';

type MoviesRequest = {
	id: number;
};

const MovieDetailPage = () => {
	const { id } = useParams();
	const [requestId, { isLoading, isSuccess, data: moviesData }] =
		useCreateMovieDetailMutation();
	console.log('id: ', id);
	console.log(moviesData?.data);

	const detailData = moviesData?.data?.movies;

	useEffect(() => {
		const payload: MoviesRequest = {
			id: Number(id),
		};

		console.log(id);

		if (id) {
			requestId(payload);
		}
	}, []);

	return (
		<>
			<div className="flex flex-col">
				<h1>Detail Page</h1>
			</div>
			{isLoading && !isSuccess ? (
				<div>
					<span>불러오고 있어요.</span>
				</div>
			) : (
				<div>
					{detailData?.map(({ id, title }: { id: number; title: string }) => (
						<div key={id}>
							<h2>{title}</h2>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default MovieDetailPage;
