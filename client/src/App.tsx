import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import {
	Layout,
	Home,
	FoodMenu,
	DrinksMenu,
	Error,
	Members,
	AddItemPage,
	EditFoodPage,
	Contact,
	Login,
	Register,
} from './pages';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

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
				path: '/admin/addmenu',
				element: <ProtectedRoute element={<AddItemPage />} />,
			},
			{
				path: '/private/admin/members',
				element: <ProtectedRoute element={<Members />} />,
			},
			{
				path: '/editfoodmenu/:id',
				element: <ProtectedRoute element={<EditFoodPage />} />,
			},
			// {
			// 	path: '/editdrinkmenu/:id',
			// 	element: <ProtectedRoute element={<EditDrinkPage />} />,
			// },
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
			{
				path: '/private/admin/login',
				element: <Login />,
			},
			{
				path: '/private/admin/register',
				element: <Register />,
			},
		],
	},
]);

function App() {
	console.log('App rendering');
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
}

export default App;
