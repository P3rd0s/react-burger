import { getCookie } from '@services/auth/utils/cookie-handler';
import { ACCESS_TOKEN } from '@shared/const/cookie-keys';
import { REFRESH_TOKEN } from '@shared/const/storage-keys.const';
import { saveTokens } from '@utils/token-saver';

const BASE_API_URL = 'https://norma.nomoreparties.space/api/';

export const request = async (endpoint: string, options?: RequestInit) => {
	let hasUnauthorizedError = false;

	try {
		const data = await innerRequest(endpoint, options);
		if (data.success) {
			return data;
		}
	} catch (error) {
		console.error('Ошибка получения данных', error);

		if ((error as any).message.includes('403')) {
			hasUnauthorizedError = true;
		}
	}

	if (!hasUnauthorizedError) {
		return null;
	}

	try {
		await refreshTokenRequest();

		if (!options?.headers) {
			return await innerRequest(endpoint, options);
		}

		options.headers = new Headers({
			...options?.headers,
			Authorization: 'Bearer ' + getCookie(ACCESS_TOKEN),
		});

		return await innerRequest(endpoint, options);
	} catch (error) {
		console.error('Ошибка получения данных', (error as any).message);
		return null;
	}
};

const innerRequest = async (endpoint: string, options?: RequestInit) => {
	const res = await fetch(`${BASE_API_URL}${endpoint}`, options);
	if (!res.ok) {
		throw Error(`Код ошибки - ${res.status}`);
	}
	const data = await res.json();
	return data;
};

const refreshTokenRequest = async () => {
	const token = localStorage.getItem(REFRESH_TOKEN);
	if (!token) {
		throw Error('Пользователь не авторизован в системе');
	}

	const options = {
		method: 'POST',
		headers: new Headers({ 'Content-Type': 'application/json' }),
		body: JSON.stringify({ token }),
	};

	const data = await innerRequest('auth/token', options);

	if (!data.success) {
		throw Error('Ошибка обновления токена');
	}

	saveTokens(data.accessToken, data.refreshToken);
};
