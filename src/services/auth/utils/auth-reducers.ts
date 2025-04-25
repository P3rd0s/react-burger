import { PayloadAction } from '@reduxjs/toolkit';
import {
	LoginResponse,
	UserResponse,
	UserState,
} from '../interfaces/auth.interface';
import { saveTokens } from '@utils/token-saver';

export const loginReducer = (
	state: UserState,
	action: PayloadAction<LoginResponse>
) => {
	state.name = action.payload.user.name;
	state.email = action.payload.user.email;

	saveTokens(action.payload.accessToken, action.payload.refreshToken);
};

export const userInfoReducer = (
	state: UserState,
	action: PayloadAction<UserResponse>
) => {
	if (action.payload?.success) {
		state.name = action.payload.user.name;
		state.email = action.payload.user.email;
	}
};
