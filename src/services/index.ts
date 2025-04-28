import { configureStore } from '@reduxjs/toolkit';
import auth from '@services/auth/auth';
import burgerConstructor from '@services/burger-constructor';
import ingredients from '@services/ingredients';

export const store = configureStore({
	reducer: {
		auth,
		ingredients,
		burgerConstructor,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	devTools: process.env.NODE_ENV !== 'production',
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
