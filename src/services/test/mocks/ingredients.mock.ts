import { IngredientInfo } from '@shared/interfaces/ingredient-info.interface';

export const mockMainIngredient: IngredientInfo = {
	_id: '12345',
	name: 'Котлета Пепперони',
	type: 'main',
	proteins: 25,
	fat: 18,
	carbohydrates: 7,
	calories: 320,
	price: 150,
	image: '/images/cotletta.png',
	image_mobile: '/mobile-images/cotletta-mobile.png',
	image_large: '/large-images/cotletta-large.png',
	count: 0,
	uuid: 'unique-id-for-test',
};

export const mockMainIngredient2: IngredientInfo = {
	...mockMainIngredient,
	_id: '341421',
};

export const mockBun: IngredientInfo = {
	...mockMainIngredient,
	_id: '12123',
	type: 'bun',
};

export const mockBun2: IngredientInfo = {
	...mockMainIngredient,
	_id: '121223',
	type: 'bun',
};
