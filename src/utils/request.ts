const BASE_API_URL = 'https://norma.nomoreparties.space/api/';

export const request = async (endpoint: string, options?: RequestInit) => {
	try {
		const res = await fetch(`${BASE_API_URL}${endpoint}`, options);
		if (!res.ok) {
			throw Error(`Код ошибки - ${res.status}`);
		}
		const data = await res.json();
		if (data.success) {
			return data;
		}
	} catch (error) {
		console.error('Ошибка получения данных', error);
		return null;
	}
};
