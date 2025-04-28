import { useAppSelector } from '@services/hooks';
import { RootState } from '@services/index';
import React, { FC, PropsWithChildren } from 'react';
import { shallowEqual } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
	anonymous?: boolean;
}

const ProtectedRoute: FC<PropsWithChildren<ProtectedRouteProps>> = ({
	children,
	anonymous = false,
}) => {
	const { isLoggedIn, isPasswordRecovery, isLoading } = useAppSelector<
		RootState,
		{ isLoggedIn: boolean; isPasswordRecovery: boolean; isLoading: boolean }
	>(
		(state) => ({
			isLoggedIn: !!state.auth.name,
			isPasswordRecovery: !!state.auth.isForgotCodeSent,
			isLoading: !!state.auth.isLoading,
		}),
		shallowEqual
	);

	const location = useLocation();
	const from = location.state?.from || '/';
	const isForgotPassword = location.pathname.includes('reset-password');

	switch (true) {
		case anonymous && isLoggedIn:
		case isForgotPassword && !isPasswordRecovery:
			return <Navigate to={from} />;
		case !anonymous && isLoading:
			return <h2 className='text text_type_main-medium'>Загрузка...</h2>;
		case !anonymous && !isLoggedIn:
			return <Navigate to='/login' state={{ from: location }} />;
		default:
			return children;
	}
};

export default ProtectedRoute;
