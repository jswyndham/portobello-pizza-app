import { FC } from 'react';
import { AccessJSONLDProps } from '../../types/seoInterface';

const AccessJSONLD: FC<AccessJSONLDProps> = ({
	name,
	address,
	telephone,
	url,
	latitude,
	longitude,
}) => {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Place',
		name: name,
		address: {
			'@type': 'PostalAddress',
			streetAddress: address.streetAddress,
			addressLocality: 'Ban Koh Tao',
			addressRegion: 'Surat Thani',
			postalCode: '84360',
			addressCountry: 'TH',
		},
		geo: {
			'@type': 'GeoCoordinates',
			// !! Replace values
			latitude: latitude,
			longitude: longitude,
		},
		telephone: telephone,
		url: url,
		image: address.imagePath,
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	);
};

export default AccessJSONLD;
