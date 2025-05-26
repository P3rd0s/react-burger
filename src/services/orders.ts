import { createSelector } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookie } from '@services/auth/utils/cookie-handler';
import { ACCESS_TOKEN } from '@shared/const/cookie-keys';
import { OrderInfo, OrdersInfo } from '@shared/interfaces/order-info.interface';
import { request } from '@utils/request';

export interface OrdersStore {
	personal: OrdersInfo;
	public: OrdersInfo;
}

export const ordersApi = createApi({
	reducerPath: 'orders',
	baseQuery: fetchBaseQuery({ baseUrl: '/' }),
	endpoints: (build) => ({
		getAllOrders: build.query<OrdersStore, boolean | void>({
			queryFn: () => ({ data: {} as OrdersStore }),
			keepUnusedDataFor: 0,
			async onCacheEntryAdded(
				isPersonalOrders = false,
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }
			) {
				const ws = new WebSocket(
					isPersonalOrders
						? `wss://norma.nomoreparties.space/orders?token=${getCookie(
								ACCESS_TOKEN
						  )}`
						: 'wss://norma.nomoreparties.space/orders/all'
				);
				try {
					await cacheDataLoaded;
					const listener = (event: MessageEvent) => {
						const data = JSON.parse(event.data);

						updateCachedData((draft) => {
							if (isPersonalOrders) {
								draft.personal = data;
							} else {
								draft.public = data;
							}
						});
					};

					ws.addEventListener('message', listener);
				} catch {
					console.error('Error websocket');
				}
				await cacheEntryRemoved;
				ws.close();
			},
		}),
		getOrderById: build.query<{ order: OrderInfo | null }, number>({
			queryFn: () => ({ data: { order: null } }),
			async onCacheEntryAdded(
				id,
				{ updateCachedData, cacheDataLoaded, cacheEntryRemoved }
			) {
				try {
					await cacheDataLoaded;

					const response = await request(`orders/${id}`, {
						method: 'GET',
						headers: new Headers({ 'Content-Type': 'application/json' }),
					});

					if (response.success) {
						const [order] = response.orders;
						updateCachedData((draft) => {
							draft.order = order;
						});
					}
				} catch {
					console.error('Error getting order');
				}
				await cacheEntryRemoved;
			},
		}),
	}),
});

export const { useGetAllOrdersQuery, useLazyGetOrderByIdQuery } = ordersApi;

// Что нужно сюда писать в дженерик?
export const selectOrderById = createSelector(
	ordersApi.endpoints.getAllOrders.select(),
	(_, id) => id,
	({ data }, id, isPersonal) =>
		(isPersonal ? data?.personal : data?.public)?.orders?.find(
			(order: OrderInfo) => order.number === +id
		)
);
