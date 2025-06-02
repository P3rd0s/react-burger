import OrderItem from '@components/order-item/order-item';
import { useAppSelector } from '@services/hooks';
import { RootState } from '@services/index';
import { useGetAllOrdersQuery } from '@services/orders';
import { EnrichedOrderInfo } from '@shared/interfaces/order-info.interface';
import { enrichOrders } from '@shared/utils/enrich-orders';
import { FC } from 'react';
import { shallowEqual } from 'react-redux';

import s from './personal-orders.module.scss';

const PersonalOrders: FC = () => {
	const { data } = useGetAllOrdersQuery(true);

	const personalOrders = data?.personal;

	const orders = useAppSelector<RootState, EnrichedOrderInfo[]>((state) => {
		return enrichOrders(
			personalOrders?.orders || [],
			state.ingredients.ingredientList
		);
	}, shallowEqual);

	return (
		<>
			<div className={s.orderList}>
				{orders.map((order) => (
					<OrderItem
						order={order}
						key={order._id}
						showStatus={true}></OrderItem>
				))}
			</div>
		</>
	);
};

export default PersonalOrders;
