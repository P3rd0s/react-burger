import { createSlice } from '@reduxjs/toolkit';
import { resetTokens, saveTokens } from '@utils/token-saver';

import { UserState } from './interfaces/auth.interface';
import {
	fetchUser,
	login,
	logout,
	patchUser,
	refreshToken,
	register,
	resetPassword,
	sendCodeToEmail,
} from './requests/auth.requests';
import { loginReducer, userInfoReducer } from './utils/auth-reducers';

const initialState: UserState = {
	email: '',
	name: '',
	isForgotCodeSent: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, loginReducer);
		builder.addCase(register.fulfilled, loginReducer);

		builder.addCase(refreshToken.fulfilled, (state, action) => {
			saveTokens(action.payload.accessToken, action.payload.refreshToken);
		});
		builder.addCase(logout.fulfilled, (state, action) => {
			if (action.payload?.success) {
				state.name = '';
				state.email = '';
				resetTokens();
			}
		});

		builder.addCase(sendCodeToEmail.fulfilled, (state, action) => {
			if (action.payload?.success) {
				state.isForgotCodeSent = true;
			}
		});
		builder.addCase(resetPassword.fulfilled, (state, action) => {
			if (action.payload?.success) {
				state.isForgotCodeSent = false;
			}
		});

		builder.addCase(fetchUser.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchUser.fulfilled, userInfoReducer);
		builder.addCase(patchUser.fulfilled, userInfoReducer);
	},
});

export default authSlice.reducer;
