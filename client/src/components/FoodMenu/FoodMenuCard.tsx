import React from 'react';

function FoodMenuCard() {
	return (
		<article className="w-80 h-96 border border-slate-400 rounded-lg">
			<img
				alt="food image"
				className="h-3/5 m-2 border border-slate-300"
			></img>
			<div className="flex flex-col justify-center items-center">
				<div className="p-3">
					<h2>Food Item</h2>
				</div>
				<div className="p-3">
					<p>ingredients</p>
				</div>
				<div>
					<p>price</p>
				</div>
			</div>
		</article>
	);
}

export default FoodMenuCard;
