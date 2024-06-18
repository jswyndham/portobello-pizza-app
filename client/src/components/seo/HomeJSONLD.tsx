import React from 'react';

function HomeJSONLD({ name, address, telephone, url, openingHours }) {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'BarOrPub',
		name: name,
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
			'https://www.facebook.com/kyotoingbar/',
			'https://www.instagram.com/ingbarhacokatsuyuki/',
		],
		image: address.imagePath,
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	);
}

export default HomeJSONLD;
