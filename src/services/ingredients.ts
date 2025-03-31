import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IngredientInfo } from '@shared/interfaces/ingredient-info.interface';
import { request } from '@utils/request';

export interface IngredientsState {
	ingredientList: IngredientInfo[];
	ingredientModalInfo: IngredientInfo | null;
}

const initialState: IngredientsState = {
	ingredientList: [],
	ingredientModalInfo: null,
};

export const fetchIngredients = createAsyncThunk(
	'ingredients/fetchIngredients',
	async (): Promise<IngredientInfo[] | undefined> => {
		const response = await request('ingredients');
		return response.data;
	}
);

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<IngredientInfo>) => {
			state.ingredientModalInfo = action.payload;
		},

		closeModal: (state) => {
			state.ingredientModalInfo = null;
		},

		addIngredientCount: (state, action: PayloadAction<IngredientInfo>) => {
			if (action.payload.type === 'bun') {
				state.ingredientList.forEach((i) => {
					if (i.type === 'bun' && i._id !== action.payload._id) {
						i.count = 0;
					}
				});
			}
			const ingredient = state.ingredientList.find(
				(i) => i._id === action.payload._id
			);
			if (!ingredient) {
				return;
			}
			ingredient.count = (ingredient.count || 0) + 1;
		},

		removeIngredientCount: (state, action: PayloadAction<string>) => {
			const ingredient = state.ingredientList.find(
				(i) => i._id === action.payload
			);
			if (!ingredient || ingredient.type === 'bun' || !ingredient.count) {
				return;
			}
			ingredient.count = ingredient.count === 1 ? 0 : ingredient.count - 1;
		},

		resetCounter: (state) => {
			state.ingredientList = state.ingredientList.map((i) => ({
				...i,
				count: 0,
			}));
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchIngredients.fulfilled, (state, action) => {
			state.ingredientList = action.payload || [];
		});
		builder.addCase(fetchIngredients.rejected, (state) => {
			state.ingredientList = [];
		});
	},
});

export const {
	openModal,
	closeModal,
	addIngredientCount,
	removeIngredientCount,
	resetCounter,
} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
