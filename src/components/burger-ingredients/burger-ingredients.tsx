import React, { FC, useEffect, useMemo, useRef } from 'react';
import s from './burger-ingredients.module.scss';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientSection from './components/ingredient-section/ingredient-section';
import { IngredientInfo } from '@shared/interfaces/ingredient-info.interface';
import { clsx } from 'clsx';
import useOnScreen from '@utils/hooks/on-screen';

interface IngredientsProps {
	ingredientList: IngredientInfo[];
	selectedIngredients: IngredientInfo[];
	onIngredientSelected: (ingredient: IngredientInfo) => void;
}

enum TabName {
	buns = 'buns',
	sauces = 'sauces',
	fillings = 'fillings',
}

const BurgerIngredients: FC<IngredientsProps> = ({
	ingredientList,
	onIngredientSelected,
	selectedIngredients,
}) => {
	const [currentTab, setCurrentTab] = React.useState<TabName | string>(
		TabName.buns
	);
	const [currentClickedTab, setCurrentClickedTab] = React.useState<
		TabName | string
	>(TabName.buns);

	useEffect(() => {
		switch (currentClickedTab) {
			case TabName.buns:
				bunsRef.current?.scrollIntoView({ behavior: 'smooth' });
				break;
			case TabName.sauces:
				saucesRef.current?.scrollIntoView({ behavior: 'smooth' });
				break;
			case TabName.fillings:
				fillingsRef.current?.scrollIntoView({ behavior: 'smooth' });
				break;
		}
	}, [currentClickedTab]);

	const buns = useMemo(
		() => ingredientList.filter((i) => i.type === 'bun'),
		[ingredientList]
	);

	const sauces = useMemo(
		() => ingredientList.filter((i) => i.type === 'sauce'),
		[ingredientList]
	);

	const main = useMemo(
		() => ingredientList.filter((i) => i.type === 'main'),
		[ingredientList]
	);

	const bunsRef = useRef<HTMLElement>(null);
	const saucesRef = useRef<HTMLElement>(null);
	const fillingsRef = useRef<HTMLElement>(null);

	const isBunsSectionVisible = useOnScreen(bunsRef);
	const isSaucesSectionVisible = useOnScreen(saucesRef);
	const isFillingsSectionVisible = useOnScreen(fillingsRef);

	useEffect(() => {
		switch (true) {
			case isBunsSectionVisible:
				setCurrentTab(TabName.buns);
				break;
			case isSaucesSectionVisible:
				setCurrentTab(TabName.sauces);
				break;
			case isFillingsSectionVisible:
				setCurrentTab(TabName.fillings);
				break;
		}
	}, [isBunsSectionVisible, isFillingsSectionVisible, isSaucesSectionVisible]);

	return (
		<div className={clsx(s.ingredients, 'pt-10')}>
			<h1 className={clsx('text text_type_main-large mb-5', s.title)}>
				Соберите бургер
			</h1>

			<div className={s.tabs}>
				<Tab
					value={TabName.buns}
					active={currentTab === TabName.buns}
					onClick={setCurrentClickedTab}>
					Булки
				</Tab>
				<Tab
					value={TabName.sauces}
					active={currentTab === TabName.sauces}
					onClick={setCurrentClickedTab}>
					Соусы
				</Tab>
				<Tab
					value={TabName.fillings}
					active={currentTab === TabName.fillings}
					onClick={setCurrentClickedTab}>
					Начинки
				</Tab>
			</div>

			<div className={s.sections}>
				<IngredientSection
					ref={bunsRef}
					ingredients={buns}
					selectedIngredients={selectedIngredients}
					onIngredientSelected={onIngredientSelected}
					title='Булки'
				/>
				<IngredientSection
					ref={saucesRef}
					ingredients={sauces}
					selectedIngredients={selectedIngredients}
					onIngredientSelected={onIngredientSelected}
					title='Соусы'
				/>
				<IngredientSection
					ref={fillingsRef}
					ingredients={main}
					selectedIngredients={selectedIngredients}
					onIngredientSelected={onIngredientSelected}
					title='Начинки'
				/>
			</div>
		</div>
	);
};

export default BurgerIngredients;
