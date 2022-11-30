import React from 'react';
import { Link } from 'react-router-dom';
import { useGetMoviesListQuery } from '../../services/movie.service';

const MoviesPage = () => {
	const {
		isError,
		isLoading,
		data: moviesData,
	} = useGetMoviesListQuery('bulbasaur');

	console.log(moviesData?.data?.movies);

	const data = moviesData?.data?.movies || [];

	if (isError) {
		<div className="flex flex-col grow items-center justify-center">
			<span>데이터를 불러올 수 없어요</span>
		</div>;
	}

	return (
		<div className="flex flex-col grow">
			{isLoading ? (
				<div className="flex flex-col grow items-center justify-center">
					<span>잠시만요...</span>
				</div>
			) : (
				<>
					{data.map(
						({
							id,
							title,
							summary,
							genres,
							large_cover_image,
							year,
						}: {
							id: number;
							title: string;
							summary: string;
							genres: [];
							large_cover_image: string;
							year: number;
						}) => (
							<div
								key={id}
								className="flex flex-col gap-y-1 border-t border-gray-200 py-4 first-of-type:border-0"
							>
								<Link to={`/movie/${id}`}>
									<img
										src={large_cover_image}
										alt={`${title} 포스터`}
										className="max-w-[240px]"
									/>
								</Link>
								<div className="inline-flex items-center">
									<h2 className="font-bold text-[24px]">{title}</h2>
									<span className="ml-3">{year}</span>
								</div>
								<p>{summary}</p>
								<ul className="flex items-center gap-x-2">
									{genres.map((item, index) => (
										<li key={index} className="shrink-0 border py-1 px-2">
											<span>{item}</span>
										</li>
									))}
								</ul>
							</div>
						),
					)}
				</>
			)}
		</div>
	);
};

export default MoviesPage;
