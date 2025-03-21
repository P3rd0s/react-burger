import React, { FC } from 'react';
import Modal from '@shared/components/modal/modal';
import s from './ingredient-details.module.scss';
import { clsx } from 'clsx';
import { IngredientInfo } from '@shared/interfaces/ingredient-info.interface';

const IngredientDetails: FC<{
	onModalClose: () => void;
	ingredient: IngredientInfo;
}> = ({ onModalClose, ingredient }) => {
	return (
		<Modal
			onClose={onModalClose}
			header='Детали ингредиента'
			className={clsx('pt-10 pl-10 pr-10 pb-15', s.modal)}>
			<img
				src={ingredient.image}
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
					<p className='text text_type_digits-default'>{ingredient.calories}</p>
				</li>
				<li>
					<p className='text text_type_main-default'>Белки, г</p>
					<p className='text text_type_digits-default'>{ingredient.proteins}</p>
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
		</Modal>
	);
};

export default IngredientDetails;
