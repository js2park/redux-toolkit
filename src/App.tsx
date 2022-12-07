import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Pages from './pages';

const App = () => {
	return (
		<>
			<BrowserRouter basename="movie">
				<Pages />
			</BrowserRouter>
		</>
	);
};

export default App;
