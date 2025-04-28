export interface UserState {
	email: string;
	name: string;
	isForgotCodeSent?: boolean;
	isLoading?: boolean;
}

export interface LoginResponse {
	success: boolean;
	accessToken: string;
	refreshToken: string;
	user: UserState;
}

export interface UserResponse {
	success: boolean;
	user: UserState;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface ResetPasswordRequest {
	token: string;
	password: string;
}

export type RegisterRequest = LoginRequest & { name: string };
