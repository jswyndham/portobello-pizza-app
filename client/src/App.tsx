import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import {
	Layout,
	Home,
	FoodMenu,
	DrinksMenu,
	Error,
	Admin,
	AddItemPage,
	Contact,
} from './pages';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <Error />,
		children: [
			{
				path: '/',
				index: true,
				element: <Home />,
			},
			{
				path: '/admin',
				element: <Admin />,
			},
			{
				path: '/addmenu',
				element: <AddItemPage />,
			},
			{
				path: '/foodmenu',
				element: <FoodMenu />,
			},
			{
				path: '/drinksmenu',
				element: <DrinksMenu />,
			},
			{
				path: '/contact',
				element: <Contact />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
