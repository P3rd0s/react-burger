import OrderDetails from '@components/order-details/order-details';
import { FC } from 'react';

import s from './order-info.module.scss';

const OrderInfo: FC = () => {
	return (
		<div className={s.wrapper}>
			<OrderDetails></OrderDetails>
		</div>
	);
};

export default OrderInfo;
