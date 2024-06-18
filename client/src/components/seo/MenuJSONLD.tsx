import React from 'react';

function MenuJSONLD({ menuItems }) {
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Menu',
		name: 'Menu at Rock Bar ING Kyoto',
		description:
			'Explore our diverse menu featuring cocktails, whiskies, wines, and non-alcoholic drinks.',
		hasMenuSection: menuItems
			.filter(
				(section) => section.length > 0 && section[0].items.length > 0
			)
			.map((section) => ({
				'@type': 'MenuSection',
				name: section[0].engTitle,
				hasMenuItem: section[0].items.map((item) => {
					const menuItem = {
						'@type': 'MenuItem',
						name: item.engName,
						description: item.description,
						additionalType: item.jpnName, // Japanese name included as additionalType
						offers: {
							'@type': 'Offer',
							price: item.price,
							priceCurrency: 'JPY',
						},
					};

					return menuItem;
				}),
			})),
	};

	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
		/>
	);
}

export default MenuJSONLD;
