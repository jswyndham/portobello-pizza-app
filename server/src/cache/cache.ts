import NodeCache from 'node-cache';

const myCache = new NodeCache();

export const setCache = (key: string, data: any, ttl: number): void => {
	myCache.set(key, data, ttl);
};

export const getCache = (key: string): any => {
	return myCache.get(key);
};

export const clearCache = (key: string): void => {
	myCache.del(key);
};
