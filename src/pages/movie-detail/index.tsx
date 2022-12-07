import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MovieSuggestions from '../../components/Suggestions';
import { useGetMovieByIdQuery } from '../../services/movie.service';

const MovieDetailPage = () => {
	const { movieId } = useParams();
	const navigate = useNavigate();

	console.log('현재 페이지 파라미터:', movieId);

	const {
		isError,
		isLoading,
		data: moviesData,
	} = useGetMovieByIdQuery(movieId, { skip: !movieId });

	if (isLoading) {
		return <div>기다려보소!</div>;
	}

	if (isError) {
		return <>데이터를 불러오지 못했다옹!! 난 냐옹이다옹!</>;
	}

	if (!moviesData?.data?.movie) {
		return (
			<div>
				<span>조회된 내용이 없어유!</span>
			</div>
		);
	}

	return (
		<div className="flex flex-col overflow-x-hidden">
			<div className="inline-flex shrink-0 items-center justify-center relative overflow-hidden h-[31.25rem]">
				<button
					type="button"
					className="inline-flex items-center justify-center py-1 px-2 absolute top-3 right-2"
					onClick={() => navigate('/')}
				>
					<span className="text-white">뒤로가기 버튼</span>
				</button>
				<img
					src={moviesData?.data?.movie.large_cover_image}
					alt={`${moviesData?.data?.movie.title} 포스터`}
					className="w-full max-w-[26.25rem]"
				/>
			</div>
			<div className="flex flex-col grow pt-3 pb-20 px-4">
				<h1
					className="font-bold text-[1.5rem]"
					style={{
						wordBreak: 'keep-all',
					}}
				>
					{moviesData?.data?.movie.title}
				</h1>
				<div className="flex items-center mt-1">
					<span className="text-[0.875rem]">
						{moviesData?.data?.movie.year}
					</span>
					<span className="ml-3 text-[0.875rem]">
						{Math.floor(moviesData?.data?.movie.runtime / 60)}시간{' '}
						{moviesData?.data?.movie.runtime % 60}분
					</span>
					<div className="shrink-0 ml-auto">
						<span className="font-bold">
							⭐ {moviesData?.data?.movie.rating}
						</span>
						<span className="text-[0.75rem] text-slate-500"> / 10</span>
					</div>
				</div>
				<ul className="flex flex-row gap-x-2 mt-2">
					{moviesData?.data?.movie.genres.map((item) => (
						<li
							key={item}
							className="inline-flex items-center justify-center py-1 px-2 border border-slate-200 bg-slate-200"
						>
							<span className="text-[0.75rem]">{item}</span>
						</li>
					))}
				</ul>
				<p className="mt-3">{moviesData?.data?.movie.description_full}</p>

				<MovieSuggestions movieId={movieId} className="mt-10" />
			</div>
		</div>
	);
};

export default MovieDetailPage;
