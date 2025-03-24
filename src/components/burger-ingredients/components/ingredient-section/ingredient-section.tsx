import React, { forwardRef, useMemo } from 'react';
import s from './ingredient-section.module.scss';
import IngredientCard from './components/ingredient-card/ingredient-card';
import { IngredientInfo } from '@shared/interfaces/ingredient-info.interface';
import { clsx } from 'clsx';

interface IngredientSectionProps {
	ingredients: IngredientInfo[];
	selectedIngredients: IngredientInfo[];
	title: string;
	onIngredientSelected: (ingredient: IngredientInfo) => void;
}

const IngredientSection = forwardRef<HTMLElement, IngredientSectionProps>(
	({ ingredients, title, onIngredientSelected, selectedIngredients }, ref) => {
		const ingredientCards = useMemo(
			() =>
				ingredients.map((ingredient) => (
					<IngredientCard
						key={ingredient._id}
						ingredientInfo={ingredient}
						onIngredientSelected={onIngredientSelected}
						count={
							selectedIngredients.filter((i) => i._id === ingredient._id).length
						}
					/>
				)),
			[ingredients, onIngredientSelected, selectedIngredients]
		);

		return (
			<section ref={ref} className='mt-10'>
				<h3 className={clsx('mb-6 text text_type_main-medium', s.title)}>
					{title}
				</h3>
				<div className={s.container}>{ingredientCards}</div>
			</section>
		);
	}
);

IngredientSection.displayName = 'IngredientSection';

export default IngredientSection;
