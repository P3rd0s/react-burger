import IngredientDetails from '@components/burger-ingredients/components/ingredient-section/components/ingredient-card/components/ingredient-details/ingredient-details';
import { FC } from 'react';

import s from './ingredient.module.scss';

const Ingredient: FC = () => {
	return (
		<div className={s.wrapper}>
			<IngredientDetails />
		</div>
	);
};

export default Ingredient;
