import React, { FC, useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientInfo } from '@shared/interfaces/ingredient-info.interface';
import {
	rearrangeIngredient,
	removeIngredient,
} from '@services/burger-constructor';
import { removeIngredientCount } from '@services/ingredients';
import s from './constructor-draggable-element.module.scss'

const ConstructorDraggableElement: FC<{
	ingredient: IngredientInfo;
	key: number;
	index: number;
}> = ({ index, ingredient }) => {
	const dispatch = useDispatch();

	const ref = useRef<HTMLLIElement>(null);

	const reorderHandler = useCallback(
		(item: IngredientInfo | { index: number }) => {
			if (!ref.current || !('index' in item)) {
				return;
			}
			const oldIndex = (item as any).index + 1;
			const newIndex = index + 1;
			if (oldIndex === newIndex) {
				return;
			}
			dispatch(rearrangeIngredient({ oldIndex, newIndex }));
		},
		[dispatch, index]
	);

	const [, drag] = useDrag({
		type: 'ingredient',
		item: { index },
	});

	const [{ handlerId }, drop] = useDrop({
		accept: 'ingredient',
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		drop: reorderHandler,
	});

	const handleRemoveIngredient = useCallback(
		(ingredient: IngredientInfo, index: number) => () => {
			dispatch(removeIngredient({ ingredient, index }));
			dispatch(removeIngredientCount(ingredient._id));
		},
		[dispatch]
	);

	drag(drop(ref));

	return (
		<li className={s.listItem} ref={ref} data-handler-id={handlerId}>
			<DragIcon type='primary' className={s.dragIcon} />
			<ConstructorElement
				key={ingredient._id + index}
				text={ingredient.name}
				price={ingredient.price}
				thumbnail={ingredient.image}
				handleClose={handleRemoveIngredient(ingredient, index + 1)}
			/>
		</li>
	);
};

export default ConstructorDraggableElement;
