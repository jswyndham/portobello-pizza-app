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
	AuditLog,
	EditDrinksPage,
} from './pages';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { CacheProvider } from './context/cacheContext';

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
				path: 'admin',
				children: [
					{
						path: 'addmenu',
						element: <ProtectedRoute element={<AddItemPage />} />,
					},
					{
						path: 'members',
						element: <ProtectedRoute element={<Members />} />,
					},
					{
						path: 'auditlog/:id',
						element: <ProtectedRoute element={<AuditLog />} />,
					},
					{
						path: 'register',
						element: <ProtectedRoute element={<Register />} />,
					},
					{
						path: 'editfood/:id',
						element: <ProtectedRoute element={<EditFoodPage />} />,
					},
					{
						path: 'editdrink/:id',
						element: (
							<ProtectedRoute element={<EditDrinksPage />} />
						),
					},
					{
						path: 'login',
						element: <Login />,
					},
				],
			},
			{
				path: 'foodmenu',
				element: <FoodMenu />,
			},
			{
				path: 'drinksmenu',
				element: <DrinksMenu />,
			},
			{
				path: 'contact',
				element: <Contact />,
			},
		],
	},
]);

function App() {
	console.log('App rendering');
	return (
		<AuthProvider>
			<CacheProvider>
				<RouterProvider router={router} />
			</CacheProvider>
		</AuthProvider>
	);
}

export default App;
