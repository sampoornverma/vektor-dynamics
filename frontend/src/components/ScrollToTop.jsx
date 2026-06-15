import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		// Prevent the browser from automatically restoring the previous scroll position on refresh
		if ('scrollRestoration' in window.history) {
			window.history.scrollRestoration = 'manual';
		}
		
		// Always jump instantly to the top of the page
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}
