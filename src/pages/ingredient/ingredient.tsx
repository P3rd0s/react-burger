import { FC } from 'react';
import s from './ingredient.module.scss';
import IngredientDetails from '@components/burger-ingredients/components/ingredient-section/components/ingredient-card/components/ingredient-details/ingredient-details';

const Ingredient: FC = () => {
	return (
		<div className={s.wrapper}>
			<IngredientDetails />
		</div>
	);
};

export default Ingredient;
