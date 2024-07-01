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
	Login,
} from './pages';
import { AuthProvider, useAuth } from './context/AuthContext';

// takes an element as a prop and uses the useAuth hook to check if the user is authenticated
const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({
	element,
}) => {
	const { isLoggedIn } = useAuth();
	console.log('ProtectedRoute isLoggedIn:', isLoggedIn);
	return isLoggedIn ? element : <Login />;
};

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
				element: <ProtectedRoute element={<Admin />} />,
				children: [],
			},
			{
				path: '/addmenu',
				element: <ProtectedRoute element={<AddItemPage />} />,
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
			{
				path: '/login',
				element: <Login />,
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
