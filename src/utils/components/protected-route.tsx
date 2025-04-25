import { useAppSelector } from '@services/hooks';
import { RootState } from '@services/index';
import { FC, PropsWithChildren } from 'react';
import { shallowEqual } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
	isAuthOnly?: boolean;
	isUnauthorizedOnly?: boolean;
	isForgotPassword?: boolean;
}

const ProtectedRoute: FC<PropsWithChildren<ProtectedRouteProps>> = ({
	children,
	isAuthOnly,
	isUnauthorizedOnly,
	isForgotPassword,
}) => {
	const { isAuth, isPasswordRecovery } = useAppSelector<
		RootState,
		{ isAuth: boolean; isPasswordRecovery: boolean }
	>(
		(state) => ({
			isAuth: !!state.auth.name,
			isPasswordRecovery: !!state.auth.isForgotCodeSent,
		}),
		shallowEqual
	);

	switch (true) {
		case isAuthOnly && !isAuth:
			return <Navigate to='/login' replace />;
		case isForgotPassword && isAuth:
		case isUnauthorizedOnly && isAuth:
		case isForgotPassword && !isPasswordRecovery:
			return <Navigate to='/' replace />;
		default:
			return children;
	}
};

export default ProtectedRoute;
