import React, { FC, useCallback, useState } from 'react';
import s from './ingredient-card.module.scss';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientInfo } from '@shared/interfaces/ingredient-info.interface';
import { clsx } from 'clsx';
import IngredientDetails from './components/ingredient-details/ingredient-details';
import Modal from '@shared/components/modal/modal';

type IngredientCardProps = {
	count?: number;
	key: string;
	onIngredientSelected: (ingredient: IngredientInfo) => void;
	ingredientInfo: IngredientInfo;
};

const IngredientCard: FC<IngredientCardProps> = ({
	count,
	onIngredientSelected,
	ingredientInfo,
}) => {
	const [isModalOpened, setIsModalOpened] = useState(false);

	const handleCloseInfo = useCallback(() => {
		setIsModalOpened(false);
	}, [setIsModalOpened]);

	const handleCardClick = useCallback(() => {
		onIngredientSelected(ingredientInfo);
		setIsModalOpened(true);
	}, [onIngredientSelected, ingredientInfo]);

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
			<div role='contentinfo' className={s.card} onClick={handleCardClick}>
				{!!count && (
					<Counter count={count} size='default' extraClass={s.count} />
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
