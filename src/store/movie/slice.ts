import { createSlice } from '@reduxjs/toolkit';

export interface movieState {
	id?: number | null;
}

const initialState: movieState = {
	id: null,
};

export const movieSlice = createSlice({
	name: 'movie',
	initialState,
	reducers: {
		onChangeId: (draft, action) => {
			draft.id = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { onChangeId } = movieSlice.actions;

export default movieSlice.reducer;
