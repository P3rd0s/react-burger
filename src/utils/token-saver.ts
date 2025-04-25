import { setCookie } from '@services/auth/utils/cookie-handler';
import { ACCESS_TOKEN } from '@shared/const/cookie-keys';
import { REFRESH_TOKEN } from '@shared/const/storage-keys.const';

export const saveTokens = (accessToken: string, refreshToken: string) => {
	const [, authToken] = accessToken.split('Bearer ');
	setCookie(ACCESS_TOKEN, authToken);
	localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const resetTokens = () => {
	setCookie(ACCESS_TOKEN, '');
	localStorage.removeItem(REFRESH_TOKEN);
};
