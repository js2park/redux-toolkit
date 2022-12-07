import React from 'react';
import { Link } from 'react-router-dom';
import { useGetMovieSuggestionsQuery } from '../../services/movie.service';
import classNames from 'classnames';

export type MovieSuggestionsProps = {
	movieId: string | undefined;
	className?: string;
};

const MovieSuggestions = ({ movieId, className }: MovieSuggestionsProps) => {
	const { isLoading, data } = useGetMovieSuggestionsQuery(movieId);

	console.log(data);

	return (
		<>
			{isLoading ? (
				<div className="flex flex-col">
					<span>스켈레톤 UI</span>
				</div>
			) : (
				<div className={classNames('flex flex-col', className)}>
					<h2 className="font-bold text-[1.125rem]">비슷한 영화예요</h2>
					<ul className="flex flex-row items-stretch gap-x-2 mt-4">
						{data?.data.movies.map(({ id, title, medium_cover_image }) => (
							<li key={id} className="flex-1 inline-flex justify-center">
								<Link to={`/${id}`} className="flex flex-col grow">
									<div className="overflow-hidden h-[7.25rem] bg-slate-200">
										<img src={medium_cover_image} alt="" className="w-full" />
									</div>
									<span className="mt-2 text-[0.875rem] text-center">
										{title}
									</span>
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
};

export default MovieSuggestions;
