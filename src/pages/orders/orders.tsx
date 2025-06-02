import OrderItem from '@components/order-item/order-item';
import { useAppSelector } from '@services/hooks';
import { RootState } from '@services/index';
import { useGetAllOrdersQuery } from '@services/orders';
import { EnrichedOrderInfo } from '@shared/interfaces/order-info.interface';
import { enrichOrders } from '@shared/utils/enrich-orders';
import { clsx } from 'clsx';
import { FC } from 'react';
import { shallowEqual } from 'react-redux';

import s from './orders.module.scss';

const Orders: FC = () => {
	const { data } = useGetAllOrdersQuery();

	const publicOrders = data?.public;

	const readyOrders = (publicOrders?.orders || [])
		.filter((order) => order.status === 'done')
		.map((order) => order.number);

	const pendingOrders = (publicOrders?.orders || [])
		.filter((order) => order.status === 'pending')
		.map((order) => order.number);

	const orders = useAppSelector<RootState, EnrichedOrderInfo[]>((state) => {
		return enrichOrders(
			publicOrders?.orders || [],
			state.ingredients.ingredientList
		);
	}, shallowEqual);

	return (
		<>
			<h1 className='text text_type_main-large mt-10 mb-6'>Лента заказов</h1>
			<div className={s.wrapper}>
				<div className={s.orderList}>
					{orders.map((order) => (
						<OrderItem order={order} key={order._id}></OrderItem>
					))}
				</div>

				<div className='ml-15'>
					<div className={s.ordersTables}>
						<div className='mr-9'>
							<h4 className='text text_type_main-medium mb-6'>Готовы:</h4>
							<div className={s.ordersTable}>
								{readyOrders.map((order) => (
									<div
										className={clsx(
											'text text_type_digits-default',
											s.readyOrder
										)}
										key={order}>
										{order}
									</div>
								))}
							</div>
						</div>

						<div className='mr-9'>
							<h4 className='text text_type_main-medium mb-6'>В работе:</h4>
							<div className={s.ordersTable}>
								{pendingOrders.map((order) => (
									<div className='text text_type_digits-default' key={order}>
										{order}
									</div>
								))}
							</div>
						</div>
					</div>

					<h3 className='text text_type_main-medium mt-15'>
						Выполнено за все время:
					</h3>
					<h1 className='text text_type_main-medium'>
						{publicOrders?.total || 0}
					</h1>
					<h3 className='text text_type_main-large mt-15'>
						Выполнено за сегодня:
					</h3>
					<h1 className='text text_type_main-large'>
						{publicOrders?.totalToday || 0}
					</h1>
				</div>
			</div>
		</>
	);
};

export default Orders;
