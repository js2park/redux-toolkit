import React from 'react';
import { useRoutes } from 'react-router-dom';

import ROUTES from './routes';

const MainRoutes = () => {
	const routes = useRoutes(ROUTES);
	return <>{routes}</>;
};

export default MainRoutes;
