import React, { FC, useCallback, useMemo, useState } from 'react';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import s from './burger-constructor.module.scss';
import { IngredientInfo } from '@shared/interfaces/ingredient-info.interface';
import { clsx } from 'clsx';
import OrderDetails from '@components/burger-constructor/components/order-details/order-details';

interface BurgerConstructorProps {
	burgerIngredients: IngredientInfo[];
	onIngredientDeleted: (id: string) => () => void;
}

const BurgerConstructor: FC<BurgerConstructorProps> = ({
	burgerIngredients,
	onIngredientDeleted,
}) => {
	const bun = useMemo(
		() => burgerIngredients.find((i) => i.type === 'bun'),
		[burgerIngredients]
	);
	const ingredients = useMemo(
		() => burgerIngredients.filter((i) => i.type !== 'bun'),
		[burgerIngredients]
	);

	const price = useMemo(
		() =>
			(bun?.price || 0) +
			ingredients.reduce((total, cur) => total + cur.price, 0),
		[bun?.price, ingredients]
	);

	const [isOrderShown, setIsOrderShown] = useState(false);

	const handleShowOrder = useCallback(() => {
		setIsOrderShown(true);
	}, [setIsOrderShown]);

	const handleCloseOrder = useCallback(() => {
		setIsOrderShown(false);
	}, [setIsOrderShown]);

	const orderModal = <OrderDetails onModalClose={handleCloseOrder} />;

	return (
		<>
			{isOrderShown && orderModal}
			<div className={s.wrapper}>
				{bun && (
					<ConstructorElement
						extraClass='mb-4'
						type='top'
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image}
						handleClose={onIngredientDeleted(bun._id)}
						// onClick={handleShowInfo(bun)}
					/>
				)}

				<ul className={s.list}>
					{ingredients.map((ingredient, index) => (
						<li key={index}>
							<ConstructorElement
								extraClass='mb-4'
								key={ingredient._id + index}
								text={ingredient.name}
								price={ingredient.price}
								thumbnail={ingredient.image}
								handleClose={onIngredientDeleted(ingredient._id)}
								// onClick={handleShowInfo(ingredient)}
							/>
						</li>
					))}
				</ul>

				{bun && (
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
						handleClose={onIngredientDeleted(bun._id)}
						// onClick={handleShowInfo(bun)}
					/>
				)}
				<div className={clsx('text text_type_digits-medium mt-10', s.price)}>
					{price}
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
