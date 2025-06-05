import { configureStore } from '@reduxjs/toolkit';
import auth from '@services/auth/auth';
import {
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	ResetPasswordRequest,
	UserResponse,
	UserState,
} from '@services/auth/interfaces/auth.interface';
import {
	fetchUser,
	login,
	logout,
	patchUser,
	refreshToken,
	register,
	resetPassword,
	sendCodeToEmail,
} from '@services/auth/requests/auth.requests';
import { resetTokens, saveTokens } from '@utils/token-saver';

jest.mock('@utils/token-saver', () => ({
	__esModule: true,
	saveTokens: jest.fn(),
	resetTokens: jest.fn(),
}));

const mockLoginResponse: LoginResponse = {
	success: true,
	accessToken: 'mockAccessToken',
	refreshToken: 'mockRefreshToken',
	user: {
		email: 'test@example.com',
		name: 'John Doe',
	},
};

const mockUserResponse: UserResponse = {
	success: true,
	user: {
		email: 'new_email@example.com',
		name: 'Jane Smith',
	},
};

describe('Auth Reducer Tests', () => {
	let store: ReturnType<typeof configureStore<{ auth: UserState }>>;

	beforeEach(() => {
		store = configureStore({
			reducer: { auth },
		});
	});

	it('should handle login and registration correctly', () => {
		const expectedState = {
			email: 'test@example.com',
			name: 'John Doe',
			isForgotCodeSent: false,
		};

		store.dispatch(login.fulfilled(mockLoginResponse, '', {} as LoginRequest));
		expect(store.getState().auth).toEqual(expectedState);

		store.dispatch(
			register.fulfilled(mockLoginResponse, '', {} as RegisterRequest)
		);
		expect(store.getState().auth).toEqual(expectedState);
	});

	it('should handle refreshing tokens correctly', () => {
		store.dispatch(refreshToken.fulfilled(mockLoginResponse, '', ''));
		expect(saveTokens).toHaveBeenCalled();
	});

	it('should handle logout correctly', () => {
		store.dispatch(login.fulfilled(mockLoginResponse, '', {} as LoginRequest));
		store.dispatch(logout.fulfilled({ success: true }, ''));
		expect(store.getState().auth.email).toBe('');
		expect(store.getState().auth.name).toBe('');
		expect(resetTokens).toHaveBeenCalled();
	});

	it('should handle password recovery flow correctly', () => {
		store.dispatch(sendCodeToEmail.fulfilled({ success: true }, '', ''));
		expect(store.getState().auth.isForgotCodeSent).toBe(true);

		store.dispatch(
			resetPassword.fulfilled({ success: true }, '', {} as ResetPasswordRequest)
		);
		expect(store.getState().auth.isForgotCodeSent).toBe(false);
	});

	it('should handle fetching and updating user info correctly', () => {
		store.dispatch(fetchUser.fulfilled(mockUserResponse, ''));
		expect(store.getState().auth.email).toBe('new_email@example.com');
		expect(store.getState().auth.name).toBe('Jane Smith');

		store.dispatch(
			patchUser.fulfilled(mockUserResponse, '', {} as RegisterRequest)
		);
		expect(store.getState().auth.email).toBe('new_email@example.com');
		expect(store.getState().auth.name).toBe('Jane Smith');
	});
});
