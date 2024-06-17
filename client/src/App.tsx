import {
	createBrowserRouter,
	RouterProvider,
	Route,
	Link,
} from 'react-router-dom';
import './App.css';
import { Layout, Home, Menu, Error } from '../pages';

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
				path: '/menu',
				element: <Menu />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
