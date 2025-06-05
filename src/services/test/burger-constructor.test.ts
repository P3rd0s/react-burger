import { configureStore } from '@reduxjs/toolkit';
import {
	burgerConstructorSlice,
	BurgerConstructorState,
	fetchOrder,
} from '@services/burger-constructor';
import {
	mockBun,
	mockBun2,
	mockMainIngredient,
	mockMainIngredient2,
} from '@services/test/mocks/ingredients.mock';

describe('Burger Constructor Slice', () => {
	let store: ReturnType<typeof configureStore<BurgerConstructorState>>;

	beforeEach(() => {
		store = configureStore({
			reducer: burgerConstructorSlice.reducer,
		});
	});

	describe('addIngredient', () => {
		it('adds main ingredient correctly', () => {
			store.dispatch(
				burgerConstructorSlice.actions.addIngredient(mockMainIngredient)
			);

			expect(store.getState().ingredients.length).toBe(1);
			expect(store.getState().totalPrice).toBe(mockMainIngredient.price);
		});

		it('handles bun addition properly', () => {
			store.dispatch(burgerConstructorSlice.actions.addIngredient(mockBun));

			expect(store.getState().ingredients.length).toBe(1);
			expect(store.getState().totalPrice).toBe(mockBun.price);
		});

		it('handles total price', () => {
			store.dispatch(burgerConstructorSlice.actions.addIngredient(mockBun));
			store.dispatch(
				burgerConstructorSlice.actions.addIngredient(mockMainIngredient)
			);

			expect(store.getState().ingredients.length).toBe(2);
			expect(store.getState().totalPrice).toBe(
				mockBun.price + mockMainIngredient.price
			);
		});

		it('handles total price with changed bun', () => {
			store.dispatch(burgerConstructorSlice.actions.addIngredient(mockBun));
			store.dispatch(burgerConstructorSlice.actions.addIngredient(mockBun2));
			store.dispatch(
				burgerConstructorSlice.actions.addIngredient(mockMainIngredient)
			);

			expect(store.getState().ingredients.length).toBe(2);
			expect(store.getState().totalPrice).toBe(
				mockBun2.price + mockMainIngredient.price
			);
		});
	});

	describe('removeIngredient', () => {
		it('removes ingredient correctly', () => {
			store.dispatch(
				burgerConstructorSlice.actions.addIngredient(mockMainIngredient)
			);

			expect(store.getState().ingredients.length).toBe(1);
			expect(store.getState().totalPrice).toBe(mockMainIngredient.price);

			store.dispatch(
				burgerConstructorSlice.actions.removeIngredient({
					ingredient: mockMainIngredient,
					index: 0,
				})
			);

			expect(store.getState().ingredients.length).toBe(0);
			expect(store.getState().totalPrice).toBe(0);
		});
	});

	describe('rearrangeIngredient', () => {
		it('rearranges ingredients correctly', () => {
			const mockIngredient1 = mockMainIngredient;

			const mockIngredient2 = mockMainIngredient2;

			store.dispatch(
				burgerConstructorSlice.actions.addIngredient(mockIngredient1)
			);
			store.dispatch(
				burgerConstructorSlice.actions.addIngredient(mockIngredient2)
			);

			store.dispatch(
				burgerConstructorSlice.actions.rearrangeIngredient({
					oldIndex: 0,
					newIndex: 1,
				})
			);

			expect(store.getState().ingredients[0]._id).toBe(mockIngredient2._id);
			expect(store.getState().ingredients[1]._id).toBe(mockIngredient1._id);
		});
	});

	describe('resetConstructor', () => {
		it('resets constructor data correctly', () => {
			store.dispatch(
				burgerConstructorSlice.actions.addIngredient(mockMainIngredient)
			);
			store.dispatch(burgerConstructorSlice.actions.resetConstructor());

			expect(store.getState().ingredients.length).toBe(0);
			expect(store.getState().totalPrice).toBe(0);
		});
	});

	describe('fetchOrder', () => {
		it('updates orderModal upon success', async () => {
			const mockOrderResponse = {
				name: 'Awesome Burger',
				order: { number: 1 },
				success: true,
			};

			store.dispatch(fetchOrder.fulfilled(mockOrderResponse, '', []));

			expect(store.getState().orderModal).toEqual(mockOrderResponse);
		});

		it('clears orderModal upon failure', async () => {
			store.dispatch(fetchOrder.rejected(new Error(), '', []));
			expect(store.getState().orderModal).toBeNull();
		});
	});
});
