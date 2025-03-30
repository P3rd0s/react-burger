import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import ConstructorDraggableElement from '@components/burger-constructor/components/constructor-draggable-element/constructor-draggable-element';
import OrderDetails from '@components/burger-constructor/components/order-details/order-details';
import Modal from '@shared/components/modal/modal';
import { RootState } from '@services/index';
import { IngredientInfo } from '@shared/interfaces/ingredient-info.interface';
import {
	addIngredient,
	closeModal,
	fetchOrder,
	OrderResponse,
} from '@services/burger-constructor';
import { addIngredientCount } from '@services/ingredients';
import s from './burger-constructor.module.scss';

const BurgerConstructor: FC = () => {
	const { bun, ingredients, totalPrice, orderModal } = useSelector<
		RootState,
		{
			bun?: IngredientInfo;
			ingredients: IngredientInfo[];
			totalPrice: number;
			orderModal: OrderResponse | null;
		}
	>(
		(state) => ({
			bun: state.burgerConstructor.ingredients.find(
				(i: IngredientInfo) => i.type === 'bun'
			),
			ingredients: state.burgerConstructor.ingredients.filter(
				(i: IngredientInfo) => i.type !== 'bun'
			),
			totalPrice: state.burgerConstructor.totalPrice,
			orderModal: state.burgerConstructor.orderModal,
		}),
		(a, b) => JSON.stringify(a) === JSON.stringify(b)
	);

	const dispatch = useDispatch<any>();

	const handleShowOrder = useCallback(() => {
		if (!bun) {
			return;
		}
		dispatch(fetchOrder([bun._id, ...ingredients.map((i) => i._id)]));
	}, [bun, dispatch, ingredients]);

	const handleCloseOrder = useCallback(() => {
		dispatch(closeModal());
	}, [dispatch]);

	const orderModalComponent = (
		<Modal onClose={handleCloseOrder} className={s.modal}>
			<OrderDetails />
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
							key={index}
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
						onClick={handleShowOrder}>
						Оформить заказ
					</Button>
				</div>
			</div>
		</>
	);
};

export default BurgerConstructor;
