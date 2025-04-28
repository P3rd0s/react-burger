import ConstructorDraggableElement from '@components/burger-constructor/components/constructor-draggable-element/constructor-draggable-element';
import OrderDetails from '@components/burger-constructor/components/order-details/order-details';
import {
	addIngredient,
	closeModal,
	fetchOrder,
	resetConstructor,
} from '@services/burger-constructor';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { addIngredientCount, resetCounter } from '@services/ingredients';
import Modal from '@shared/components/modal/modal';
import { IngredientInfo } from '@shared/interfaces/ingredient-info.interface';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import React, { FC, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';

import s from './burger-constructor.module.scss';

const BurgerConstructor: FC = () => {
	const { bun, ingredients, totalPrice, orderModal, isAuthorized } =
		useAppSelector(
			(state) => ({
				bun: state.burgerConstructor.ingredients.find(
					(i: IngredientInfo) => i.type === 'bun'
				),
				ingredients: state.burgerConstructor.ingredients.filter(
					(i: IngredientInfo) => i.type !== 'bun'
				),
				totalPrice: state.burgerConstructor.totalPrice,
				orderModal: state.burgerConstructor.orderModal,
				isAuthorized: !!state.auth.name,
			}),
			(a, b) => JSON.stringify(a) === JSON.stringify(b)
		);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleShowOrder = useCallback(async () => {
		if (!bun) {
			return;
		}
		if (!isAuthorized) {
			navigate('/login');
			return;
		}

		const resultAction = await dispatch(
			fetchOrder([bun._id, ...ingredients.map((i) => i._id)])
		);
		if (fetchOrder.fulfilled.match(resultAction)) {
			dispatch(resetConstructor());
			dispatch(resetCounter());
		}
	}, [bun, dispatch, ingredients, isAuthorized, navigate]);

	const handleCloseOrder = useCallback(() => {
		dispatch(closeModal());
	}, [dispatch]);

	const orderModalComponent = (
		<Modal onClose={handleCloseOrder} className={s.modal}>
			<OrderDetails orderNumber={orderModal?.order?.number || 0} />
		</Modal>
	);

	const dropHandler = useCallback(
		(data: IngredientInfo | { index: number }) => {
			if ('index' in data) {
				return;
			}
			dispatch(addIngredientCount(data));
			dispatch(addIngredient(data));
		},
		[dispatch]
	);

	const [, dropTarget] = useDrop({
		accept: 'ingredient',
		drop: dropHandler,
	});

	return (
		<>
			{orderModal && orderModalComponent}
			<div className={s.wrapper} ref={dropTarget}>
				{bun && (
					<ConstructorElement
						extraClass={clsx('mb-4 ml-8', s.bun)}
						type='top'
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				)}

				<ul className={s.list}>
					{ingredients.map((ingredient, index) => (
						<ConstructorDraggableElement
							index={index}
							key={ingredient.uuid || index}
							ingredient={ingredient}
						/>
					))}
				</ul>

				{bun && (
					<ConstructorElement
						extraClass={clsx('mt-4 ml-8', s.bun)}
						type='bottom'
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				)}
				<div className={clsx('text text_type_digits-medium mt-10', s.price)}>
					{totalPrice}
					<CurrencyIcon className={clsx(s.icon, 'mr-10 ml-2')} type='primary' />
					<Button
						htmlType='button'
						type='primary'
						size='medium'
						disabled={!totalPrice}
						onClick={handleShowOrder}>
						Оформить заказ
					</Button>
				</div>
			</div>
		</>
	);
};

export default BurgerConstructor;
