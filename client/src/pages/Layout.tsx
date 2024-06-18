import { useEffect, createContext, useMemo, useRef, useState } from 'react';
import { Navbar, SidebarMenu } from '../components/navbar';
import { Outlet } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

interface LayoutContextType {
	showSidebar: boolean;
	handleSidebar: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

function Layout() {
	// ************** useState
	const [showSidebar, setShowSidebar] = useState<boolean>(false);

	// ********* useRef
	const sidebarRef = useRef<HTMLDivElement | null>(null);

	// ****** Detect click outside the sidebar and close
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(e.target as Node)
			) {
				setShowSidebar(false);
			}
		};

		// Attach the listener
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			// Remove the listener on cleanup
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [showSidebar]);

	// ********** Handlers
	const handleSidebar = () => {
		setShowSidebar(!showSidebar);
	};

	const value = useMemo(
		() => ({
			showSidebar,
			handleSidebar,
		}),
		[showSidebar]
	);

	// helmetContext variable being passed as a prop
	const helmetContext = {};

	return (
		<HelmetProvider context={helmetContext}>
			<LayoutContext.Provider value={value}>
				<Navbar />
				<div ref={sidebarRef}>
					<SidebarMenu />
				</div>
				<section className="z-0 w-screen h-full bg-black text-white overflow-hidden">
					<Outlet />
				</section>
			</LayoutContext.Provider>
		</HelmetProvider>
	);
}

export default Layout;
