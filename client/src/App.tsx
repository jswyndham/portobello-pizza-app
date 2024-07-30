import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import {
	Layout,
	Home,
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
import PizzaMenu from './pages/PizzaMenu';
import PastaMenu from './pages/PastaMenu';
import CalzoneMenu from './pages/CalzoneMenu';
import StarterMenu from './pages/StartersMenu';
import MainMenu from './pages/MainMenu';
import SidesMenu from './pages/SidesMenu';
import SaladMenu from './pages/SaladMenu';
import DessertMenu from './pages/DessertMenu';

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
				path: 'pizzamenu',
				element: <PizzaMenu />,
			},
			{
				path: 'pastamenu',
				element: <PastaMenu />,
			},
			{
				path: 'calzonemenu',
				element: <CalzoneMenu />,
			},
			{
				path: 'startermenu',
				element: <StarterMenu />,
			},
			{
				path: 'mainsmenu',
				element: <MainMenu />,
			},
			{
				path: 'sidesmenu',
				element: <SidesMenu />,
			},
			{
				path: 'saladmenu',
				element: <SaladMenu />,
			},
			{
				path: 'dessertmenu',
				element: <DessertMenu />,
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
	return (
		<AuthProvider>
			<CacheProvider>
				<RouterProvider router={router} />
			</CacheProvider>
		</AuthProvider>
	);
}

export default App;
