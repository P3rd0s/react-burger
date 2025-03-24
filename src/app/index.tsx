import { FC, useCallback, useEffect, useState } from 'react';
import s from './app.module.scss';
import AppHeader from '@components/app-header/app-header';
import { IngredientInfo } from '@shared/interfaces/ingredient-info.interface';
import BurgerIngredients from '@components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '@components/burger-constructor/burger-constructor';

const INGREDIENT_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const App: FC = () => {
	const [selectedIngredients, setSelectedIngredients] = useState<
		IngredientInfo[]
	>([]);

	const [ingredients, setIngredients] = useState<IngredientInfo[]>([]);

	useEffect(() => {
		// Почему-то вызывается 2 раза - не понял почему
		const getIngredients = async () => {
			try {
				const res = await fetch(INGREDIENT_URL);
				if (!res.ok) {
					throw Error(`Код ошибки - ${res.status}`);
				}
				const data = await res.json();
				if (data.success) {
					setIngredients(data.data);
				}
			} catch (error) {
				console.error('Ошибка получения данных', error);
			}
		};

		getIngredients();
	}, []);

	const addIngredient = useCallback(
		(ingredient: IngredientInfo) => {
			if (
				ingredient.type === 'bun' &&
				selectedIngredients.find((i) => i.type === 'bun')
			) {
				return;
			}
			setSelectedIngredients([...selectedIngredients, ingredient]);
		},
		[selectedIngredients]
	);

	const removeIngredient = useCallback(
		(id: string) => () => {
			if (!selectedIngredients.find((i) => i._id === id)) {
				return;
			}
			let isFound = false;
			setSelectedIngredients([
				...selectedIngredients.filter((i) => {
					if (i._id === id && !isFound) {
						isFound = true;
						return false;
					}
					return true;
				}),
			]);
		},
		[selectedIngredients]
	);

	return (
		<div className={s.app}>
			<AppHeader />
			<main className={s.main}>
				<BurgerIngredients
					ingredientList={ingredients}
					selectedIngredients={selectedIngredients}
					onIngredientSelected={addIngredient}
				/>
				<BurgerConstructor
					burgerIngredients={selectedIngredients}
					onIngredientDeleted={removeIngredient}
				/>
			</main>
		</div>
	);
};
