import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	LoginRequest,
	LoginResponse,
	RegisterRequest,
	ResetPasswordRequest,
	UserResponse,
} from '../interfaces/auth.interface';
import { request } from '@utils/request';
import { REFRESH_TOKEN } from '@shared/const/storage-keys.const';
import { getCookie } from '../utils/cookie-handler';
import { ACCESS_TOKEN } from '@shared/const/cookie-keys';

export const login = createAsyncThunk(
	'auth/login',
	async (credentials: LoginRequest): Promise<LoginResponse> => {
		return await request('auth/login', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify(credentials),
		});
	}
);

export const refreshToken = createAsyncThunk(
	'auth/token',
	async (token: string): Promise<LoginResponse> => {
		return await request('auth/token', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ token }),
		});
	}
);

export const logout = createAsyncThunk(
	'auth/logout',
	async (): Promise<{ success: boolean } | null> => {
		const token = localStorage.getItem(REFRESH_TOKEN);
		if (!token) {
			return null;
		}
		return await request('auth/logout', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ token }),
		});
	}
);

export const register = createAsyncThunk(
	'auth/register',
	async (credentials: RegisterRequest): Promise<LoginResponse> => {
		return await request('auth/register', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify(credentials),
		});
	}
);

export const sendCodeToEmail = createAsyncThunk(
	'auth/forgotPassword',
	async (email: string): Promise<{ success: boolean }> => {
		return await request('password-reset', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify({ email }),
		});
	}
);

export const resetPassword = createAsyncThunk(
	'auth/resetPassword',
	async (data: ResetPasswordRequest): Promise<{ success: boolean }> => {
		return await request('password-reset/reset', {
			method: 'POST',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify(data),
		});
	}
);

export const fetchUser = createAsyncThunk(
	'auth/getUser',
	async (): Promise<UserResponse> => {
		return await request('auth/user', {
			method: 'GET',
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + getCookie(ACCESS_TOKEN),
			}),
		});
	}
);

export const patchUser = createAsyncThunk(
	'auth/patchUser',
	async (credentials: RegisterRequest): Promise<UserResponse> => {
		return await request('auth/user', {
			method: 'PATCH',
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + getCookie(ACCESS_TOKEN),
			}),
			body: JSON.stringify(credentials),
		});
	}
);
