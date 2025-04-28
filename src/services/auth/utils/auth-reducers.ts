import { PayloadAction } from '@reduxjs/toolkit';
import { saveTokens } from '@utils/token-saver';

import {
	LoginResponse,
	UserResponse,
	UserState,
} from '../interfaces/auth.interface';

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
		state.isLoading = false;
	}
};
