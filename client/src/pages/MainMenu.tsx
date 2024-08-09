import { useEffect, useState } from 'react';
import { ErrorMessage, HeadingOne } from '../components';
import FoodMenuCard from '../components/MenuCards/FoodMenuCard';
import MenuJSONLD from '../components/seo/MenuJSONLD';
import { Helmet } from 'react-helmet-async';
import type { FoodMenu as FoodMenuModel } from '../../../server/src/models/FoodMenuModel';
import Loading from '../components/Loading';
import ItemNotFound from '../components/itemNotFound/ItemNotFound';
import { MenuSection } from '../types/seoInterface';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainMenu() {
	const [menuItems, setMenuItems] = useState<MenuSection[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchMenuItems = async () => {
			try {
				setIsLoading(true);

				const response = await fetch(
					`${
						import.meta.env.VITE_API_BASE_URL
					}/foodMenu?menuCategory=MAIN`
				);
				const data = await response.json();

				if (response.ok && data.items && Array.isArray(data.items)) {
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
					toast.error('API response is not an array:', data);
					setError('Unexpected API response format.');
				}
			} catch (error) {
				toast.error('Error fetching menu items');
				setError('Error fetching menu items.');
			} finally {
				setIsLoading(false);
			}
		};

		fetchMenuItems();
	}, []);

	// Loading Screen
	if (isLoading) {
		return <Loading />;
	}

	// Error screen
	if (error) {
		return <ErrorMessage errorMessage={error} />;
	}

	// 'Not found' screen
	if (menuItems.length === 0) {
		return <ItemNotFound item="mains menu items" />;
	}

	return (
		<>
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				className="toast-container"
				toastClassName="toast"
			/>
			<article className="w-screen h-full bg-main-gradient min-h-screen">
				<Helmet>
					<title>
						Porto Bello Mains Menu | Italian Food on Koh Tao Island
					</title>
					<meta
						name="description"
						content="Enjoy the best Italian mains on Koh Tao Island at Porto Bello, Koh Tao. Check out our variety of main dishes with fresh ingredients."
					/>
					<link
						rel="canonical"
						href="http://www.portobellokohtao.com/mains"
					/>
				</Helmet>
				<MenuJSONLD menuItems={menuItems} />
				<article className="h-full pt-12 px-2 xl:pt-24 flex flex-col justify-center items-center">
					<HeadingOne headingOneText={'Mains Menu'} />

					{menuItems.map((section) => (
						<article
							key={section.sectionName}
							className="w-full flex flex-col justify-center items-center"
						>
							<div className="w-full flex justify-center items-center">
								<FoodMenuCard category={section.sectionName} />
							</div>
						</article>
					))}
				</article>
			</article>
		</>
	);
}

export default MainMenu;
