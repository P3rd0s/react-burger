import React, { FC } from 'react';
import s from './main.module.scss';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '@components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '@components/burger-constructor/burger-constructor';

const Main: FC = () => {
	return (
		<main className={s.main}>
			<DndProvider backend={HTML5Backend}>
				<BurgerIngredients />
				<BurgerConstructor />
			</DndProvider>
		</main>
	);
};

export default Main;
