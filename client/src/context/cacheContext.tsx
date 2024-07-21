import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from 'react';

interface CacheContextType {
	cache: { [key: string]: any };
	setCache: (key: string, value: any) => void;
}

const CacheContext = createContext<CacheContextType | undefined>(undefined);

export const CacheProvider = ({ children }: { children: ReactNode }) => {
	const [cache, setCacheState] = useState<{ [key: string]: any }>(() => {
		const savedCache = localStorage.getItem('cache');
		return savedCache ? JSON.parse(savedCache) : {};
	});

	// set cache in the browser storage
	const setCache = (key: string, value: any) => {
		setCacheState((prevCache) => {
			const newCache = { ...prevCache, [key]: value };
			localStorage.setItem('cache', JSON.stringify(newCache));
			return newCache;
		});
	};

	// get cache from browser storage
	useEffect(() => {
		const savedCache = localStorage.getItem('cache');
		if (savedCache) {
			setCacheState(JSON.parse(savedCache));
		}
	}, []);

	return (
		<CacheContext.Provider value={{ cache, setCache }}>
			{children}
		</CacheContext.Provider>
	);
};

export const useCache = () => {
	const context = useContext(CacheContext);
	if (!context) {
		throw new Error('useCache must be used within a CacheProvider');
	}
	return context;
};
