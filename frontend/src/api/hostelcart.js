import api from './interceptor';

export const getMyItems = async () => {
	const res = await api.get('/hostelcart/items');
	return res?.data?.items ?? [];
};

export const getOtherItems = async () => {
	const res = await api.get('/hostelcart/items/others');
	return res?.data?.items ?? [];
};

export const getPublicItems = async () => {
	const res = await api.get('/hostelcart/all-items');
	return res?.data?.items ?? [];
};

export const getCategories = async () => {
	const res = await api.get('/hostelcart/categories');
	return res?.data ?? { data: [], categoryIds: [] };
};

export const getItemsByCategory = async (categoryId) => {
	const res = await api.get('/hostelcart/items/by-category', { params: { categoryId } });
	return res?.data?.items ?? res?.data?.data ?? [];
};
