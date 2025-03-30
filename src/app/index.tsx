import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import AppHeader from '@components/app-header/app-header';
import BurgerIngredients from '@components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '@components/burger-constructor/burger-constructor';
import { fetchIngredients } from '@services/ingredients';
import s from './app.module.scss';

export const App: FC = () => {
	const dispatch = useDispatch<any>();
	useEffect(() => {
		dispatch(fetchIngredients());
	}, [dispatch]);

	return (
		<div className={s.app}>
			<AppHeader />
			<main className={s.main}>
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients />
					<BurgerConstructor />
				</DndProvider>
			</main>
		</div>
	);
};
