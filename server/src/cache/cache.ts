import NodeCache from 'node-cache';

const myCache = new NodeCache();

export const setCache = (key: string, data: any, ttl: number): void => {
	myCache.set(key, data, ttl);
};

export const getCache = (key: string): any => {
	const data = myCache.get(key);
	if (data) {
	}
	return data;
};

export const clearCache = (key: string): void => {
	myCache.del(key);
};

// Ensure the cache for all pages is cleared
export const clearAllCache = () => {
	myCache.flushAll();
};
