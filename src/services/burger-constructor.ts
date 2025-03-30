import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IngredientInfo } from '@shared/interfaces/ingredient-info.interface';

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

const ORDER_URL = 'https://norma.nomoreparties.space/api/orders';

export const fetchOrder = createAsyncThunk(
	'burgerConstructor/fetchOrder',
	async (ingredients: string[]): Promise<OrderResponse | undefined | null> => {
		try {
			const res = await fetch(ORDER_URL, {
				method: 'POST',
				body: JSON.stringify({ ingredients }),
			});
			if (!res.ok) {
				throw Error(`Код ошибки - ${res.status}`);
			}
			const data = await res.json();
			if (data.success) {
				return data.data;
			}
		} catch (error) {
			console.error('Ошибка получения данных', error);
			return null;
		}
	}
);

const burgerConstructorSlice = createSlice({
	name: 'burgerConstructor',
	initialState,
	reducers: {
		closeModal: (state) => {
			state.orderModal = null;
		},

		addIngredient: (state, action: PayloadAction<IngredientInfo>) => {
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
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
