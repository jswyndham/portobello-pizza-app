// DrinkMenu.tsx

import { HeadingOne } from '../components';
import CardHeadings from '../components/MenuCards/CardHeadings';
import DrinkMenuCard from '../components/MenuCards/DrinkMenuCard';
import beerBanner from '/images/beer-timothy-dykes.jpg';
import whiteWineBanner from '/images/wine-anastasiia-rozumna.jpg';
import redWineBanner from '/images/red-wine-banner.jpg';
import cocktailBanner from '/images/coctails-banner.jpg';
import nonAlcoholicBanner from '/images/non-alcoholi-aleksandr-slobodianyk.jpg';
import { Helmet } from 'react-helmet-async';
// import MenuJSONLD from '../components/seo/MenuJSONLD';

function DrinkMenu() {
	return (
		<section className="w-screen h-full bg-main-gradient">
			{/* Serverside SEO using react-helmet-async */}
			<Helmet>
				<title>
					Menu - Rock Bar ING Kyoto | Drinks, Snacks, and More
				</title>
				<meta
					name="description"
					content="Discover the drinks menu at Porto Bello, Koh Tao Thailand. List of drinks include local Thai beers, a list of red and white wines and original cocktails."
				/>
				<link
					rel="canonical"
					href="https://www.portobellokohtao.com/drinksmenu"
				/>
			</Helmet>
			{/* <MenuJSONLD menuItems={menuItems} /> */}
			<article className="w-full pt-12 px-2 lg:p-24 flex flex-col justify-center items-center">
				<HeadingOne headingOneText={'Drinks Menu'} />

				{/* WHITE WINE */}
				<article className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center">
						<CardHeadings
							CardHeading={'WHITE WINE'}
							backImage={whiteWineBanner}
							backImageAlt="white wine banner"
						/>
					</div>
					<div className="w-full xl:w-11/12 2xl:max-w-6xl mt-12">
						<DrinkMenuCard category="WHITE_WINE" />
					</div>
				</article>

				{/* RED WINE */}
				<article className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center">
						<CardHeadings
							CardHeading={'RED WINE'}
							backImage={redWineBanner}
							backImageAlt="red wine banner"
						/>
					</div>
					<div className="w-full xl:w-11/12 2xl:max-w-6xl mt-12">
						<DrinkMenuCard category="RED_WINE" />
					</div>
				</article>

				{/* BEER */}
				<article className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center">
						<CardHeadings
							CardHeading={'BEER'}
							backImage={beerBanner}
							backImageAlt="beer banner"
						/>
					</div>
					<div className="w-full xl:w-11/12 2xl:max-w-6xl mt-12">
						<DrinkMenuCard category="BEER" />
					</div>
				</article>

				{/* COCKTAIL */}
				<article className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center">
						<CardHeadings
							CardHeading={'COCKTAIL'}
							backImage={cocktailBanner}
							backImageAlt="cocktail banner"
						/>
					</div>
					<div className="w-full xl:w-11/12 2xl:max-w-6xl mt-12">
						<DrinkMenuCard category="COCKTAIL" />
					</div>
				</article>

				{/* NON-ALCOHOLIC */}
				<article className="w-full flex flex-col justify-center items-center">
					<div className="w-full flex justify-center items-center">
						<CardHeadings
							CardHeading={'NON-ALCOHOLIC'}
							backImage={nonAlcoholicBanner}
							backImageAlt="non-alcoholic banner"
						/>
					</div>
					<div className="w-full xl:w-11/12 2xl:max-w-6xl mt-12">
						<DrinkMenuCard category="NON_ALCOHOLIC" />
					</div>
				</article>
			</article>
		</section>
	);
}

export default DrinkMenu;
