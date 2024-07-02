import { useEffect, useRef, useState } from 'react';

interface MapProps {
	src: string;
}

const Map: React.FC<MapProps> = ({ src }) => {
	const iframeRef = useRef<HTMLIFrameElement | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const iframe = iframeRef.current;
		if (!iframe) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setIsLoaded(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);

		observer.observe(iframe);

		return () => {
			if (iframe) observer.unobserve(iframe);
		};
	}, []);

	return (
		<div className="w-11/12 flex justify-center">
			<figure className="p-4 bg-black rounded-xl overflow-hidden">
				<iframe
					width="900px"
					height="600px"
					className="map-iframe"
					allowFullScreen
					aria-hidden="false"
					tabIndex={0}
					referrerPolicy="no-referrer-when-downgrade"
					src={isLoaded ? src : ''}
					ref={iframeRef}
					title="Map"
				></iframe>
			</figure>
		</div>
	);
};

export default Map;
