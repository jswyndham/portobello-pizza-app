import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const Error = () => {
	const error = useRouteError();
	if (error.status === 404) {
		return (
			<article className="relative overflow-hidden h-screen flex justify-center align-middle">
				<img
					src="/images/backgroundImages/ing-beer.jpg"
					alt="Error page background"
					className="w-full h-auto lg:hidden"
				/>
				<img
					src="/images/backgroundImages/ing-records.jpg"
					alt="Error page background"
					className="hidden w-auto h-auto lg:flex"
				/>
				<div className="absolute inset-0 bg-black opacity-60"></div>
				<div className="absolute inset-0  flex flex-col justify-center text-center items-center px-12">
					<img
						src="/images/logo-main.png"
						alt="Main Logo"
						className="absolute inset-0 mx-auto w-9/12 md:max-w-md py-2"
					/>
					<div className="md:px-20 lg:pt-32 max-w-5xl">
						<h1 className="text-2xl md:text-4xl 2xl:text-5xl font-bold text-white pt-64 pb-6 lg:pt-28">
							Sorry! Page not found
						</h1>
						<h2 className="text-5xl lg:text-5xl font-bold text-red-600">
							404 error
						</h2>

						<p className="text-xl lg:text-2xl 2xl:text-3xl py-12  text-white">
							We cannot find the page you are looking for. Confirm
							that you have entered the correct url address.
						</p>
						<p className="text-xl lg:text-2xl 2xl:text-3xl text-white">
							申し訳ありませんが、お探しのページが見つかりません。それを確認します
							正しい URL アドレスを入力しました。
						</p>
					</div>
					<Link
						to="/"
						className="text-xl lg:text-2xl 2xl:text-3xl text-yellow-400 py-10 underline underline-offset-8"
					>
						homepage / ホームページ
					</Link>
				</div>
			</article>
		);
	}
	return (
		<article className="relative overflow-hidden h-screen flex justify-center align-middle">
			<img
				src="./src/images/backgroundImages/ing-beer.jpg"
				alt="Error page background"
				className="w-full h-auto lg:hidden"
			/>
			<img
				src="/images/backgroundImages/ing-records.jpg"
				alt="Error page background"
				className="hidden w-auto h-auto lg:flex"
			/>
			<div className="absolute inset-0 bg-black opacity-60"></div>
			<div className="absolute inset-0  flex flex-col justify-center text-center items-center px-12">
				<img
					src="/images/logo-main.png"
					alt="Main Logo"
					className="absolute inset-0 mx-auto w-9/12 md:max-w-md py-2"
				/>
				<div className="md:px-20 lg:pt-32 max-w-5xl">
					<h1 className="text-3xl 2xl:text-4xl font-bold text-red-500 pt-64 lg:py-16">
						Webpage error!
					</h1>
					<p className="text-xl lg:text-2xl 2xl:text-3xl py-2 text-white">
						I am afraid that this website has experienced an error.
					</p>
					<p className="text-xl lg:text-2xl 2xl:text-3xl pb-6 text-white">
						申し訳ありませんが、このウェブサイトでエラーが発生しました。
					</p>
					<p className="text-xl lg:text-2xl 2xl:text-3xl text-white">
						We apologize for the inconvenience.
					</p>
					<p className="text-xl lg:text-2xl 2xl:text-3xl text-white">
						ご不便をおかけして申し訳ございません。
					</p>
				</div>
				<Link
					to="/"
					className="text-xl lg:text-2xl 2xl:text-3xl text-yellow-400 py-10 underline underline-offset-8"
				>
					homepage / ホームページ
				</Link>
			</div>
		</article>
	);
};

export default Error;
