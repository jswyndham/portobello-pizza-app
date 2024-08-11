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
	PizzaMenu,
	PastaMenu,
	CalzoneMenu,
	StarterMenu,
	MainMenu,
	SidesMenu,
	SaladMenu,
	DessertMenu,
} from './pages';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { CacheProvider } from './context/cacheContext';
import ScrollToTop from './components/ScrollToTop';

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
				path: 'pizza',
				element: <PizzaMenu />,
			},
			{
				path: 'pasta',
				element: <PastaMenu />,
			},
			{
				path: 'calzone',
				element: <CalzoneMenu />,
			},
			{
				path: 'starter',
				element: <StarterMenu />,
			},
			{
				path: 'mains',
				element: <MainMenu />,
			},
			{
				path: 'sides',
				element: <SidesMenu />,
			},
			{
				path: 'salad',
				element: <SaladMenu />,
			},
			{
				path: 'dessert',
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
				<ScrollToTop />
			</CacheProvider>
		</AuthProvider>
	);
}

export default App;
