import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ErrorMessage, HeadingOne, HeadingTwo } from '../components';
import FoodMenuCard from '../components/MenuCards/FoodMenuCard';
import MenuJSONLD from '../components/seo/MenuJSONLD';
import { Helmet } from 'react-helmet-async';
import type { FoodMenu as FoodMenuModel } from '../../../server/src/models/FoodMenuModel';
import Loading from '../components/Loading';
import ItemNotFound from '../components/itemNotFound/ItemNotFound';
import { MenuSection } from '../types/seoInterface';

function FoodMenu() {
	const { hash } = useLocation();
	const [menuItems, setMenuItems] = useState<MenuSection[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (hash) {
			const element = document.querySelector(hash);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}
	}, [hash]);

	useEffect(() => {
		const fetchMenuItems = async () => {
			try {
				const response = await fetch(
					'http://localhost:5001/api/v1/foodMenu'
				);
				const data = await response.json();

				if (data.items && Array.isArray(data.items)) {
					const groupedItems = data.items.reduce(
						(sections: MenuSection[], item: FoodMenuModel) => {
							const section = sections.find(
								(s) => s.sectionName === item.menuCategory
							);
							if (section) {
								section.items.push({
									name: item.name,
									description: item.ingredients.join(', '),
									price: item.price,
									currency: 'THB',
									additionalType: item.pizzaType,
								});
							} else {
								sections.push({
									sectionName: item.menuCategory,
									items: [
										{
											name: item.name,
											description:
												item.ingredients.join(', '),
											price: item.price,
											currency: 'THB',
											additionalType: item.pizzaType,
										},
									],
								});
							}
							return sections;
						},
						[]
					);

					setMenuItems(groupedItems);
				} else {
					console.error('API response is not an array:', data);
					setError('Unexpected API response format.');
				}
			} catch (error) {
				console.error('Error fetching menu items:', error);
				setError('Error fetching menu items.');
			} finally {
				setIsLoading(false);
			}
		};

		fetchMenuItems();
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return <ErrorMessage errorMessage={error} />;
	}

	if (menuItems.length === 0) {
		return <ItemNotFound item="menu items" />;
	}

	return (
		<article className="w-screen h-full bg-main-gradient">
			{/* Serverside SEO using react-helmet-async */}
			<Helmet>
				<title>
					Porto Bello Food Menu | Pizza, Pasta, Calzone, and More
				</title>
				<meta
					name="description"
					content="Discover the best Italian cuisine on Koh Tao Island at Porto Bello. Enjoy Italian and Mediterranean dishes, including pizza, pasta, calzone, and a range of starters and mains."
				/>
				<link
					rel="canonical"
					href="http://www.portobello.com/foodmenu"
				/>
			</Helmet>
			<MenuJSONLD menuItems={menuItems} />
			<article className="pt-12 px-2 lg:p-24 flex flex-col justify-center items-center">
				<HeadingOne headingOneText={'Food Menu'} />

				{menuItems.map((section) => (
					<article
						key={section.sectionName}
						className="w-full flex flex-col justify-center items-center"
					>
						<div className="w-full flex justify-center items-center mt-12 lg:mt-20">
							<HeadingTwo
								headingTwoText={section.sectionName}
								id={section.sectionName.toLowerCase()}
							/>
						</div>
						<div className="w-full flex justify-center items-center">
							<FoodMenuCard category={section.sectionName} />
						</div>
					</article>
				))}
			</article>
		</article>
	);
}

export default FoodMenu;
