import { FC } from 'react';

export interface AccessJSONLDProps {
	name: string;
	address: {
		streetAddress: string;
		imagePath: string;
	};
	telephone: string;
	url: string;
	geoCoordinates: string;
}

const AccessJSONLD: : FC<AccessJSONLDProps> = ({ 
	name, address, telephone, url, geoCoordinates 
}) => {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Place',
		name: 'Rock Bar ING Kyoto',
		address: {
			'@type': 'PostalAddress',
			streetAddress:
				'京都府京都市中京区西木屋町通蛸薬師上る南車屋町京都ロイヤルビル２階',
			addressLocality: 'Kyoto',
			addressRegion: 'Kyoto',
			postalCode: '288-201',
			addressCountry: 'JP',
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: '35.0062951',
			longitude: '135.7673418',
		},
		telephone: '075-255-5087',
		url: url,
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	);
}

export default AccessJSONLD;
