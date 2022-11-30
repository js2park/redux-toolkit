import React, { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

const Movies = lazy(() => import('./movies'));
const MovieDetailPage = lazy(() => import('./movie-detail'));

const ROUTES: RouteObject[] = [
	{
		path: '',
		element: (
			<Suspense
				fallback={
					<>
						<span>기다려</span>
					</>
				}
			>
				<Movies />
			</Suspense>
		),
	},
	{
		path: '/movie/:id',
		element: (
			<Suspense
				fallback={
					<>
						<span>기다려</span>
					</>
				}
			>
				<MovieDetailPage />
			</Suspense>
		),
	},
];

export default ROUTES;
