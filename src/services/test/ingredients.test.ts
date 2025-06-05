import { configureStore } from '@reduxjs/toolkit';
import {
	fetchIngredients,
	ingredientsSlice,
	IngredientsState,
} from '@services/ingredients';
import {
	mockBun,
	mockBun2,
	mockMainIngredient,
} from '@services/test/mocks/ingredients.mock';
import { IngredientInfo } from '@shared/interfaces/ingredient-info.interface';

const preloadedState: IngredientsState = {
	ingredientList: [mockMainIngredient, mockBun, mockBun2],
	ingredientModalInfo: null,
};

describe('Ingredients Slice', () => {
	let store: ReturnType<typeof configureStore<IngredientsState>>;
	beforeEach(() => {
		store = configureStore({
			reducer: ingredientsSlice.reducer,
			preloadedState,
		});
	});

	describe('Open Modal', () => {
		it('should open modal with given payload', () => {
			const mockPayload: IngredientInfo = mockMainIngredient;
			store.dispatch(ingredientsSlice.actions.openModal(mockPayload));
			expect(store.getState().ingredientModalInfo).toEqual(mockPayload);
		});
	});

	describe('Close Modal', () => {
		it('should close the modal by setting to null', () => {
			store.dispatch(ingredientsSlice.actions.closeModal());
			expect(store.getState().ingredientModalInfo).toBeNull();
		});
	});

	describe('Add Ingredient Count', () => {
		it('should increment count for an existing ingredient', () => {
			store.dispatch(
				ingredientsSlice.actions.addIngredientCount(mockMainIngredient)
			);
			expect(
				store
					.getState()
					.ingredientList.find((i) => i._id === mockMainIngredient._id)?.count
			).toBe(1);
		});

		it('should reset other buns when adding a new bun', () => {
			store.dispatch(ingredientsSlice.actions.addIngredientCount(mockBun));
			expect(
				store.getState().ingredientList.find((i) => i._id === mockBun._id)
					?.count
			).toBe(1);

			store.dispatch(ingredientsSlice.actions.addIngredientCount(mockBun2));
			expect(
				store.getState().ingredientList.find((i) => i._id === mockBun._id)
					?.count
			).toBe(0);
			expect(
				store.getState().ingredientList.find((i) => i._id === mockBun2._id)
					?.count
			).toBe(1);
		});
	});

	describe('Remove Ingredient Count', () => {
		it('should decrement count if it is greater than one', () => {
			store.dispatch(
				ingredientsSlice.actions.addIngredientCount(mockMainIngredient)
			);
			store.dispatch(
				ingredientsSlice.actions.removeIngredientCount(mockMainIngredient._id)
			);
			expect(
				store
					.getState()
					.ingredientList.find((i) => i._id === mockMainIngredient._id)?.count
			).toBe(0);
		});

		it('should not remove bun or decrease below zero', () => {
			store.dispatch(
				ingredientsSlice.actions.addIngredientCount(mockMainIngredient)
			);
			store.dispatch(
				ingredientsSlice.actions.removeIngredientCount(mockMainIngredient._id)
			);
			store.dispatch(
				ingredientsSlice.actions.removeIngredientCount(mockMainIngredient._id)
			);
			expect(
				store
					.getState()
					.ingredientList.find((i) => i._id === mockMainIngredient._id)?.count
			).toBe(0);
		});
	});

	describe('Reset Counter', () => {
		it('should set all counts back to zero', () => {
			store.dispatch(
				ingredientsSlice.actions.addIngredientCount(mockMainIngredient)
			);
			store.dispatch(ingredientsSlice.actions.resetCounter());
			expect(store.getState().ingredientList.every((i) => i.count === 0)).toBe(
				true
			);
		});
	});

	describe('fetchIngredients fulfilled', () => {
		it('should update ingredientList after successful API call', async () => {
			store.dispatch(
				fetchIngredients.fulfilled(preloadedState.ingredientList, '')
			);
			expect(store.getState().ingredientList).toEqual(
				preloadedState.ingredientList
			);
		});
	});

	describe('fetchIngredients rejected', () => {
		it('should empty ingredientList after failed API call', async () => {
			store.dispatch(fetchIngredients.rejected(new Error(), ''));
			expect(store.getState().ingredientList).toEqual([]);
		});
	});
});
