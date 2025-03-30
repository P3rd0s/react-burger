import { IngredientsState } from '@services/ingredients';
import { BurgerConstructorState } from '@services/burger-constructor';

export interface RootState {
	ingredients: IngredientsState;
	burgerConstructor: BurgerConstructorState;
}
