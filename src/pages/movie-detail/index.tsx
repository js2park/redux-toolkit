import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCreateMovieDetailMutation } from '../../services/movie.service';

type MoviesRequest = {
	id: number;
};

const MovieDetailPage = () => {
	const { id } = useParams();

	const movieId = id;

	console.log('현재 페이지 파라미터:', movieId);

	const [requestId, { isLoading, isSuccess, data: moviesData }] =
		useCreateMovieDetailMutation();

	const detailData = moviesData?.data?.movies || [];

	console.log(detailData);

	// const filterData = detailData?.filter(({ id }: { id: number }) =>
	// 	String(id).includes(String(id)),
	// );

	// const filterData = detailData?.filter(({ id }: { id: number }) =>
	// 	new RegExp(String(id), 'i').test(String(id)),
	// );

	const isFilter = (item: any) => {
		if (item.id == movieId) {
			return true;
		}
	};

	const filterData = detailData?.filter(isFilter);

	console.log(filterData);

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
			{isLoading && !isSuccess ? (
				<div>
					<span>불러오고 있어요.</span>
				</div>
			) : (
				<div>
					{filterData?.map(
						({
							id,
							title,
							year,
							runtime,
							rating,
							genres,
							summary,
							large_cover_image,
						}: {
							id: number;
							title: string;
							year: number;
							runtime: number;
							rating: number;
							genres: [];
							summary: string;
							large_cover_image: string;
						}) => (
							<div key={id} className="flex flex-col">
								<div className="inline-flex shrink-0 items-center overflow-hidden h-[31.25rem]">
									<img
										src={large_cover_image}
										alt={`${title} 포스터`}
										className="w-full"
									/>
								</div>
								<div className="flex flex-col grow py-3 px-4">
									<h1
										className="font-bold text-[1.5rem]"
										style={{
											wordBreak: 'keep-all',
										}}
									>
										{title}
									</h1>
									<div className="flex items-center mt-1">
										<span className="text-[0.875rem]">{year}</span>
										<span className="ml-3 text-[0.875rem]">
											{Math.floor(runtime / 60)}시간 {runtime % 60}분
										</span>
										<div className="shrink-0 ml-auto">
											<span className="font-bold">⭐ {rating}</span>
											<span className="text-[0.75rem] text-slate-500">
												{' '}
												/ 10
											</span>
										</div>
									</div>
									<ul className="flex flex-row gap-x-2 mt-2">
										{genres.map((item, index) => (
											<li
												key={index}
												className="inline-flex items-center justify-center py-1 px-2 border border-slate-200 bg-slate-200"
											>
												<span className="text-[0.75rem]">{item}</span>
											</li>
										))}
									</ul>
									<p className="mt-3">{summary}</p>
								</div>
							</div>
						),
					)}
				</div>
			)}
		</>
	);
};

export default MovieDetailPage;
