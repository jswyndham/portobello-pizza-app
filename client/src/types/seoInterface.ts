export interface HomeJSONLDProps {
	name: string;
	address: {
		streetAddress: string;
		imagePath: string;
	};
	telephone: string;
	url: string;
	openingHours: {
		'@type': string;
		dayOfWeek: string[];
		opens: string;
		closes: string;
	}[];
	priceRange: string;
	servesCuisine: string[];
}

export interface MenuItem {
	name: string;
	description: string;
	price: number;
	currency: string;
	additionalType?: string;
}

export interface MenuSection {
	sectionName: string;
	items: MenuItem[];
}

export interface AccessJSONLDProps {
	name: string;
	address: {
		streetAddress: string;
		imagePath: string;
	};
	telephone: string;
	url: string;
	latitude: string;
	longitude: string;
}
