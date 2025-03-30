import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { IngredientInfo } from '@shared/interfaces/ingredient-info.interface';
import Modal from '@shared/components/modal/modal';
import { closeModal, openModal } from '@services/ingredients';
import { RootState } from '@services/index';
import IngredientDetails from './components/ingredient-details/ingredient-details';
import s from './ingredient-card.module.scss';

type IngredientCardProps = {
	key: string;
	ingredientInfo: IngredientInfo;
};

const IngredientCard: FC<IngredientCardProps> = ({ ingredientInfo }) => {
	const dispatch = useDispatch();

	const isModalOpened = useSelector<RootState, boolean>(
		(state) => state.ingredients.ingredientModalInfo?._id === ingredientInfo._id
	);

	const handleCloseInfo = useCallback(() => {
		dispatch(closeModal());
	}, [dispatch]);

	const handleCardClick = useCallback(() => {
		dispatch(openModal(ingredientInfo));
	}, [dispatch, ingredientInfo]);

	const [, drag] = useDrag({
		type: 'ingredient',
		item: ingredientInfo,
	});

	const ingredientInfoModal = (
		<Modal
			onClose={handleCloseInfo}
			header='Детали ингредиента'
			className={clsx('pt-10 pl-10 pr-10 pb-15', s.modal)}>
			<IngredientDetails ingredient={ingredientInfo as IngredientInfo} />
		</Modal>
	);

	return (
		<>
			{isModalOpened && ingredientInfoModal}
			<div
				role='contentinfo'
				className={s.card}
				onClick={handleCardClick}
				ref={drag}>
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
		</>
	);
};

export default IngredientCard;
