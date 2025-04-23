import {
	createAsyncThunk,
	createSlice,
	nanoid,
	PayloadAction,
} from '@reduxjs/toolkit';
import { IngredientInfo } from '@shared/interfaces/ingredient-info.interface';
import { request } from '@utils/request';

export interface BurgerConstructorState {
	ingredients: IngredientInfo[];
	totalPrice: number;
	orderModal: OrderResponse | null;
}

export interface OrderResponse {
	name: string;
	order: { number: number };
	success: boolean;
}

const initialState: BurgerConstructorState = {
	ingredients: [],
	totalPrice: 0,
	orderModal: null,
};

export const fetchOrder = createAsyncThunk(
	'burgerConstructor/fetchOrder',
	async (ingredients: string[]): Promise<OrderResponse | undefined | null> =>
		await request('orders', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ ingredients }),
		})
);

const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		closeModal: (state) => {
			state.orderModal = null;
		},

		addIngredient: {
			reducer: (state, action: PayloadAction<IngredientInfo>) => {
				if (action.payload.type === 'bun') {
					const prevPrice = state.ingredients.find(
						(i) => i.type === 'bun'
					)?.price;
					state.ingredients.shift();
					state.ingredients.unshift(action.payload);
					state.totalPrice += action.payload.price - (prevPrice || 0);
				} else {
					state.ingredients.push(action.payload);
					state.totalPrice += action.payload.price;
				}
			},
			prepare: (ingredient) => ({ payload: { ...ingredient, uuid: nanoid() } }),
		},

		removeIngredient: (
			state,
			action: PayloadAction<{ ingredient: IngredientInfo; index: number }>
		) => {
			const { ingredient, index } = action.payload;
			if (ingredient.type === 'bun') {
				return;
			}
			state.ingredients.splice(index, 1);
			state.totalPrice -= ingredient.price;
		},

		rearrangeIngredient: (
			state,
			action: PayloadAction<{ oldIndex: number; newIndex: number }>
		) => {
			const { oldIndex, newIndex } = action.payload;
			const ingredient = state.ingredients[oldIndex];
			state.ingredients.splice(oldIndex, 1);
			state.ingredients.splice(newIndex, 0, ingredient);
		},

		resetConstructor: (state) => {
			state.ingredients = [];
			state.totalPrice = 0;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchOrder.fulfilled, (state, action) => {
			state.orderModal = action.payload || null;
		});
		builder.addCase(fetchOrder.rejected, (state) => {
			state.orderModal = null;
		});
	},
});

export const {
	closeModal,
	addIngredient,
	removeIngredient,
	rearrangeIngredient,
	resetConstructor,
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
