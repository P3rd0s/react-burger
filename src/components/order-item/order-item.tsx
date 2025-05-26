import { EnrichedOrderInfo } from '@shared/interfaces/order-info.interface';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import s from './order-item.module.scss';

const OrderItem: FC<{ order?: EnrichedOrderInfo; showStatus?: boolean }> = ({
	order,
	showStatus,
}) => {
	const location = useLocation();

	return (
		<>
			{order && (
				<Link
					to={order.number.toString()}
					state={{ background: location }}
					className={clsx('mb-6', s.cardWrapper)}>
					<div className={clsx('p-6', s.card)}>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<div className='text text_type_digits-default'>
								#{order.number}
							</div>
							<FormattedDate
								className='text text_type_main-default text_color_inactive'
								date={
									new Date(
										order.createdAt.getFullYear(),
										order.createdAt.getMonth(),
										order.createdAt.getDate(),
										order.createdAt.getHours(),
										order.createdAt.getMinutes() - 1,
										0
									)
								}
							/>
						</div>

						<h4 className='text text_type_main-medium mt-6 mb-2'>Бургер</h4>

						{showStatus && (
							<p className='text text_type_main-default'>
								{order.status === 'created' && 'Создан'}
								{order.status === 'pending' && 'Готовится'}
								{order.status === 'done' && (
									<span style={{ color: '#00cccc' }}>Выполнен</span>
								)}
							</p>
						)}

						<div className={clsx('mt-6', s.ingredientsInfo)}>
							{order.ingredients.map(
								(ingredient, index) =>
									index < 6 && (
										<div className={s.icon} key={index}>
											<img
												src={ingredient.image}
												alt='ingredient'
												height='56'
											/>
											{index === 5 && (
												<div
													className={clsx(
														'text text_type_main-medium',
														s.iconOverlay
													)}>
													+{order.ingredients.length - 2}
												</div>
											)}
										</div>
									)
							)}

							<div
								className={clsx('text text_type_digits-default', s.orderPrice)}>
								{order.totalPrice}
								<CurrencyIcon type='primary' />
							</div>
						</div>
					</div>
				</Link>
			)}
		</>
	);
};

export default OrderItem;
