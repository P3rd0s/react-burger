import React, { forwardRef, useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import { clsx } from 'clsx';
import { IngredientInfo } from '@shared/interfaces/ingredient-info.interface';
import { RootState } from '@services/index';
import IngredientCard from './components/ingredient-card/ingredient-card';
import s from './ingredient-section.module.scss';
import {useAppSelector} from "@services/hooks";

interface IngredientSectionProps {
	type: 'bun' | 'sauce' | 'main';
	title: string;
}

const IngredientSection = forwardRef<HTMLElement, IngredientSectionProps>(
	({ title, type }, ref) => {
		const ingredients = useAppSelector<RootState, IngredientInfo[]>(
			(state) =>
				state.ingredients.ingredientList.filter(
					(i: IngredientInfo) => i.type === type
				),
			shallowEqual
		);

		const ingredientCards = useMemo(
			() =>
				ingredients.map((ingredient) => (
					<IngredientCard key={ingredient._id} ingredientInfo={ingredient} />
				)),
			[ingredients]
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
