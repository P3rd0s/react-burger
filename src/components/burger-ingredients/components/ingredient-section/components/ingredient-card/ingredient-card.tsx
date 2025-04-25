import React, { FC, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { IngredientInfo } from '@shared/interfaces/ingredient-info.interface';
import s from './ingredient-card.module.scss';
import { Link, useLocation } from 'react-router-dom';

type IngredientCardProps = {
	key: string;
	ingredientInfo: IngredientInfo;
};

const IngredientCard: FC<IngredientCardProps> = ({ ingredientInfo }) => {
	const location = useLocation();

	const [, drag] = useDrag({
		type: 'ingredient',
		item: ingredientInfo,
	});

	return (
		<Link
			to={`ingredients/${ingredientInfo._id}`}
			state={{ background: location }}
			style={{ color: 'white' }}>
			<div role='contentinfo' className={s.card} ref={drag}>
				{!!ingredientInfo.count && (
					<Counter
						count={ingredientInfo.count}
						size='default'
						extraClass={s.count}
					/>
				)}
				<div className={clsx(s.info, 'pl-4 pr-4 mb-4')}>
					<img src={ingredientInfo.image} alt='ingredient' />
					<div className={clsx(s.price, 'text text_type_digits-default')}>
						{ingredientInfo.price}
						<CurrencyIcon type='primary' />
					</div>
				</div>
				<h4 className={clsx(s.title, 'text text_type_main-medium')}>
					{ingredientInfo.name}
				</h4>
			</div>
		</Link>
	);
};

export default IngredientCard;
