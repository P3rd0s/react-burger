import React, { FC } from 'react';
import s from './order-details.module.scss';
import checkIcon from '@assets/images/order-check.svg';
import { clsx } from 'clsx';

const OrderDetails: FC<{ orderNumber: number }> = ({ orderNumber }) => {
	return (
		<>
			<h1 className={clsx('text text_type_digits-large mt-30 mb-8', s.order)}>
				{orderNumber}
			</h1>
			<h4 className='text text_type_main-medium mb-15'>идентификатор заказа</h4>

			<img src={checkIcon} className='mb-15' alt='check icon' />

			<h5 className='text text_type_main-default mb-2'>
				Ваш заказ начали готовить
			</h5>
			<h5 className='text text_type_main-default text_color_inactive mb-30'>
				Дождитесь готовности на орбитальной станции
			</h5>
		</>
	);
};

export default OrderDetails;
