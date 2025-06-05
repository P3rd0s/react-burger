import { configureStore } from '@reduxjs/toolkit';
import { ordersApi } from '@services/orders';
import { OrderInfo, OrdersInfo } from '@shared/interfaces/order-info.interface';
import { act } from '@testing-library/react';

const mockPersonalOrders = {
	success: true,
	orders: [
		{
			_id: '1',
			name: 'Fake Personal Order',
			ingredients: ['some-ingredient'],
			status: 'done',
			number: 123,
		},
	],
	total: 1,
	totalToday: 1,
};

const store = configureStore({
	reducer: {
		[ordersApi.reducerPath]: ordersApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(ordersApi.middleware),
});

describe('Orders API', () => {
	it('should handle public orders retrieval successfully', async () => {
		await act(async () => {
			store.dispatch(ordersApi.endpoints.getAllOrders.initiate(false));
		});

		await act(async () => {
			store.dispatch(
				ordersApi.util.updateQueryData(
					'getAllOrders',
					false,
					() => mockPersonalOrders as any
				)
			);
		});

		const state = store.getState()[ordersApi.reducerPath];
		const queryKey = 'getAllOrders(false)';
		const actualData: OrdersInfo = state.queries[queryKey]?.data as OrdersInfo;
		expect(actualData.orders).toHaveLength(1);
		expect(actualData).toMatchObject(mockPersonalOrders);
	});

	it('should handle personal orders retrieval successfully', async () => {
		await act(async () => {
			store.dispatch(ordersApi.endpoints.getAllOrders.initiate(true));
		});

		await act(async () => {
			store.dispatch(
				ordersApi.util.updateQueryData(
					'getAllOrders',
					true,
					() => mockPersonalOrders as any
				)
			);
		});

		const state = store.getState()[ordersApi.reducerPath];
		const queryKey = 'getAllOrders(true)';
		const actualData: OrdersInfo = state.queries[queryKey]?.data as OrdersInfo;
		expect(actualData.orders).toHaveLength(1);
		expect(actualData).toMatchObject(mockPersonalOrders);
	});

	it('should handle retrieval order by id successfully', async () => {
		const orderId = 123;
		await act(async () => {
			store.dispatch(ordersApi.endpoints?.getOrderById.initiate(orderId));
		});

		await act(async () => {
			store.dispatch(
				ordersApi.util.updateQueryData(
					'getOrderById',
					orderId,
					() => mockPersonalOrders.orders[0] as any
				)
			);
		});

		const state = store.getState()[ordersApi.reducerPath];
		const queryKey = `getOrderById(${orderId})`;
		const actualData = state.queries[queryKey]?.data as OrderInfo;
		expect(actualData).toMatchObject(mockPersonalOrders.orders[0]);
	});
});
