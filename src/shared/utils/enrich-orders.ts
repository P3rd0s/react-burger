import { IngredientInfo } from '@shared/interfaces/ingredient-info.interface';
import {
	EnrichedOrderInfo,
	OrderInfo,
} from '@shared/interfaces/order-info.interface';

export const enrichOrders = (
	orders: OrderInfo[],
	ingredients: IngredientInfo[]
): EnrichedOrderInfo[] => {
	const ingredientsCache = new Map<string, IngredientInfo>();
	const ingredientList = ingredients;

	if (!ingredients?.length || !orders?.length) {
		return [];
	}

	return orders.map((order) => {
		const ingredients: IngredientInfo[] = order.ingredients.map((id) => {
			if (ingredientsCache.has(id)) {
				return ingredientsCache.get(id);
			}
			const ingredient = ingredientList.find(
				(ingredient) => ingredient._id === id
			);
			if (ingredient) {
				ingredientsCache.set(id, ingredient);
			}
			return ingredient;
		}) as IngredientInfo[];

		const totalPrice = ingredients.reduce(
			(acc, ingredient) =>
				acc +
				(ingredient.type === 'bun' ? ingredient.price * 2 : ingredient.price),
			0
		);

		return {
			...order,
			ingredients,
			totalPrice,
			createdAt: new Date(order.createdAt),
		};
	});
};
