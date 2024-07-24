import { FC } from 'react';
import { HomeJSONLDProps } from '../../types/seoInterface';

const HomeJSONLD: FC<HomeJSONLDProps> = ({
	name,
	address,
	telephone,
	url,
	openingHours,
	priceRange,
	servesCuisine,
}) => {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'BarOrPub',
		name: name,
		description: `${name} is a Koh Tao restaurant, which offers Italian cuisine and a selection of drinks including original cocktails. Located on Koh Tao Island Thailand.`,
		address: {
			'@type': 'PostalAddress',
			streetAddress: address.streetAddress,
			addressLocality: 'Ban Koh Tao',
			addressRegion: 'Surat Thani',
			postalCode: '288-201',
			addressCountry: 'TH',
		},
		telephone: telephone,
		url: url,
		openingHoursSpecification: openingHours,
		priceRange: priceRange,
		servesCuisine: servesCuisine,
		sameAs: [
			'https://www.facebook.com/portobellokohtao/',
			'https://www.instagram.com/portobellokohtao/',
		],
		image: address.imagePath,
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	);
};

export default HomeJSONLD;
