// !! Must add SEO data!!

export interface HomeJSONLDProps {
	name: string;
	address: {
		streetAddress: string;
		imagePath: string;
	};
	telephone: string;
	url: string;
	openingHours: string;
}

const HomeJSONLD: React.FC<HomeJSONLDProps> = ({
	name,
	address,
	telephone,
	url,
	openingHours,
}) => {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'BarOrPub',
		name: 'Porto Bello',
		description: `${name} in Kyoto offers an exciting rock music experience and a great selection of drinks in a vibrant atmosphere.`,
		address: {
			'@type': 'PostalAddress',
			streetAddress: address.streetAddress,
			addressLocality: 'Kyoto',
			addressRegion: 'Kyoto',
			postalCode: '288-201',
			addressCountry: 'Japan',
		},
		telephone: telephone,
		url: url,
		openingHoursSpecification: openingHours,
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
