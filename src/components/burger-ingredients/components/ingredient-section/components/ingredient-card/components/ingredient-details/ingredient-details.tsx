import { useAppSelector } from '@services/hooks';
import { RootState } from '@services/index';
import { IngredientInfo } from '@shared/interfaces/ingredient-info.interface';
import React, { FC } from 'react';
import { shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';

import s from './ingredient-details.module.scss';

const IngredientDetails: FC = () => {
	const { id } = useParams();
	const ingredient = useAppSelector<RootState, IngredientInfo | undefined>(
		(state) =>
			state.ingredients.ingredientList.find(
				(i: IngredientInfo) => i._id === id
			),
		shallowEqual
	);

	return (
		<>
			{ingredient && (
				<>
					<img
						src={ingredient?.image}
						className='mb-4'
						alt='ingredient'
						height='280px'
					/>

					<h4 className='text text_type_main-medium mt-4 mb-8'>
						{ingredient.name}
					</h4>
					<ul className={`text_color_inactive ${s.info}`}>
						<li>
							<p className='text text_type_main-default'>Калории,ккал</p>
							<p className='text text_type_digits-default'>
								{ingredient.calories}
							</p>
						</li>
						<li>
							<p className='text text_type_main-default'>Белки, г</p>
							<p className='text text_type_digits-default'>
								{ingredient.proteins}
							</p>
						</li>
						<li>
							<p className='text text_type_main-default'>Жиры, г</p>
							<p className='text text_type_digits-default'>{ingredient.fat}</p>
						</li>
						<li>
							<p className='text text_type_main-default'>Углеводы, г</p>
							<p className='text text_type_digits-default'>
								{ingredient.carbohydrates}
							</p>
						</li>
					</ul>
				</>
			)}
		</>
	);
};

export default IngredientDetails;
