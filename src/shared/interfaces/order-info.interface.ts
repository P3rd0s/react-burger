import { IngredientInfo } from '@shared/interfaces/ingredient-info.interface';

export interface OrderInfo {
	_id: '';
	name?: string;
	owner?: string;
	ingredients: string[];
	status: 'done' | 'pending' | 'created';
	number: number;
	createdAt: string;
	updatedAt: string;
}

export type EnrichedOrderInfo = Omit<OrderInfo, 'ingredients' | 'createdAt'> & {
	ingredients: IngredientInfo[];
	createdAt: Date;
	totalPrice: number;
};

export interface OrdersInfo {
	success: boolean;
	orders: OrderInfo[];
	total: number;
	totalToday: number;
}
