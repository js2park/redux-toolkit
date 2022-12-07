import React from 'react';
import { Link } from 'react-router-dom';
import { useGetMoviesListQuery } from '../../services/movie.service';

const MoviesPage = () => {
	const { isError, isLoading, data: moviesData } = useGetMoviesListQuery({});

	if (isError) {
		return (
			<div
				className="flex flex-col grow items-center justify-center h-screen"
				style={{
					minHeight: '-webkit-fill-available',
				}}
			>
				<span>데이터를 불러올 수 없어요</span>
			</div>
		);
	}

	return (
		<div className="flex flex-col grow">
			{isLoading ? (
				<div
					className="flex flex-col grow items-center justify-center h-screen"
					style={{
						minHeight: '-webkit-fill-available',
					}}
				>
					<span>잠시만요!</span>
				</div>
			) : (
				<>
					{(moviesData?.data?.movies || []).map(
						({ id, title, year, large_cover_image }) => (
							<div
								key={id}
								className="flex flex-col border-t border-gray-200 py-4 first-of-type:border-0 first-of-type:pt-0"
							>
								<Link to={`/${id}`}>
									<div className="flex overflow-hidden">
										<img
											src={large_cover_image}
											alt={`${title} 포스터`}
											className="shrink-0 w-auto h-full"
										/>
									</div>
								</Link>
								<div className="inline-flex items-center py-3 px-5">
									<h2 className="font-bold text-[24px]">{title}</h2>
									<span className="ml-3">{year}</span>
								</div>
							</div>
						),
					)}
				</>
			)}
		</div>
	);
};

export default MoviesPage;
