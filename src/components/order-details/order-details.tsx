import { useAppSelector } from '@services/hooks';
import { RootState } from '@services/index';
import { selectOrderById, useLazyGetOrderByIdQuery } from '@services/orders';
import { IngredientInfo } from '@shared/interfaces/ingredient-info.interface';
import {
	EnrichedOrderInfo,
	OrderInfo,
} from '@shared/interfaces/order-info.interface';
import { enrichOrders } from '@shared/utils/enrich-orders';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import React, { FC, useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import s from './order-details.module.scss';

interface IngredientsCounter {
	[id: string]: {
		ingredient: IngredientInfo;
		count: number;
	};
}

const OrderDetails: FC = () => {
	const { id } = useParams();

	const location = useLocation();
	const isPersonalOrder = location.pathname.includes('profile');

	const orderFromSocket = useAppSelector<RootState, OrderInfo | undefined>(
		(state) => selectOrderById(state, id, isPersonalOrder)
	);

	const [loadOrderById, { data: requestOrder }] = useLazyGetOrderByIdQuery();

	useEffect(() => {
		if (id && !orderFromSocket && !requestOrder) {
			loadOrderById(+id);
		}
	}, [id, requestOrder, loadOrderById, orderFromSocket]);

	const order = orderFromSocket || requestOrder?.order;

	const [enrichedOrder] = useAppSelector<RootState, EnrichedOrderInfo[]>(
		(state) =>
			enrichOrders(
				order ? [order] : [],
				state?.ingredients?.ingredientList || []
			),
		shallowEqual
	);

	const orderIngredients: IngredientsCounter | null =
		enrichedOrder?.ingredients?.reduce((acc, ingredient) => {
			if (acc[ingredient._id]) {
				acc[ingredient._id].count++;
			} else {
				acc[ingredient._id] = {
					ingredient,
					count: 1,
				};
			}
			return acc;
		}, {} as IngredientsCounter) || null;

	return (
		<>
			{enrichedOrder && (
				<div className={clsx('p-6', s.card)}>
					<div className='text text_type_digits-default'>
						#{enrichedOrder.number}
					</div>

					<h4 className='text text_type_main-medium mt-10 mb-3'>
						{enrichedOrder.name || 'Бургер'}
					</h4>

					{enrichedOrder.status && (
						<p className='text text_type_main-default'>
							{enrichedOrder.status === 'created' && 'Создан'}
							{enrichedOrder.status === 'pending' && 'Готовится'}
							{enrichedOrder.status === 'done' && (
								<span style={{ color: '#00cccc' }}>Выполнен</span>
							)}
						</p>
					)}

					<h3 className='text text_type_main-medium mt-15 mb-6'>Состав:</h3>

					<div className={clsx('mt-6', s.ingredientsInfo)}>
						{Object.values(orderIngredients)?.map(
							({ ingredient, count }, index) => (
								<div className={clsx('mb-8', s.ingredientRow)} key={index}>
									<div className={s.icon}>
										<img src={ingredient.image} alt='ingredient' height='56' />
									</div>

									<div
										className={clsx(
											'ml-4 text text_type_main-default',
											s.ingredientTitle
										)}>
										{ingredient.name}
									</div>

									<div
										className={clsx(
											'text text_type_digits-default',
											s.ingredientPrice
										)}>
										{count} x {ingredient.price}
										<CurrencyIcon type='primary' />
									</div>
								</div>
							)
						)}
					</div>

					<div className={clsx('mt-10', s.orderTotal)}>
						<FormattedDate
							className='text text_type_main-default text_color_inactive'
							date={
								new Date(
									enrichedOrder.createdAt.getFullYear(),
									enrichedOrder.createdAt.getMonth(),
									enrichedOrder.createdAt.getDate(),
									enrichedOrder.createdAt.getHours(),
									enrichedOrder.createdAt.getMinutes() - 1,
									0
								)
							}
						/>

						<div
							className={clsx('text text_type_digits-default', s.orderPrice)}>
							{enrichedOrder.totalPrice}
							<CurrencyIcon type='primary' />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default OrderDetails;
