import React, { FC, useEffect } from 'react';

import AppHeader from '@components/app-header/app-header';
import { fetchIngredients } from '@services/ingredients';
import s from './app.module.scss';
import { useAppDispatch } from '@services/hooks';
import { Route, Routes, useLocation } from 'react-router-dom';
import Main from '@pages/main/main';
import Login from '@pages/login/login';
import Registration from '@pages/registration/registration';
import ResetPassword from '@pages/reset-password/reset-password';
import ForgotPassword from '@pages/forgot-password/forgot-password';
import Profile from '@pages/profile/profile';
import ProfileInfo from '@pages/profile/pages/profile-info/profile-info';
import Ingredient from '@pages/ingredient/ingredient';
import { fetchUser } from '@services/auth/requests/auth.requests';
import ProtectedRoute from '@utils/components/protected-route';
import { clsx } from 'clsx';
import IngredientDetails from '@components/burger-ingredients/components/ingredient-section/components/ingredient-card/components/ingredient-details/ingredient-details';
import Modal from '@shared/components/modal/modal';

export const App: FC = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchIngredients());
		dispatch(fetchUser());
	}, [dispatch]);

	return (
		<div className={s.app}>
			<AppHeader />
			<Routes location={location?.state?.background || location}>
				<Route path='/' element={<Main />} />

				<Route
					path='/login'
					element={
						<ProtectedRoute isUnauthorizedOnly>
							<Login />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/register'
					element={
						<ProtectedRoute isUnauthorizedOnly>
							<Registration />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/forgot-password'
					element={
						<ProtectedRoute isUnauthorizedOnly>
							<ForgotPassword />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/reset-password'
					element={
						<ProtectedRoute isForgotPassword>
							<ResetPassword />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/profile'
					element={
						<ProtectedRoute isAuthOnly>
							<Profile />
						</ProtectedRoute>
					}>
					<Route path='' element={<ProfileInfo />} />
				</Route>

				<Route path='/ingredients/:id' element={<Ingredient />} />

				<Route
					path='*'
					element={
						<h2 className='text text_type_main-medium'>
							404 - Страница не найдена
						</h2>
					}
				/>
			</Routes>

			{location?.state?.background && (
				<Routes>
					<Route
						path='/ingredients/:id'
						element={
							<Modal
								header='Детали ингредиента'
								className={clsx('pt-10 pl-10 pr-10 pb-15', s.modal)}>
								<IngredientDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
		</div>
	);
};
