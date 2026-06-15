import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, className = '', direction = 'up', delay = 0 }) {
	const ref = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target); // Animate once
				}
			},
			{
				threshold: 0.05, // Trigger when 5% of the element is visible
				rootMargin: '0px 0px -50px 0px' // Offset trigger point slightly
			}
		);

		const currentRef = ref.current;
		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, []);

	const getDirectionClass = () => {
		switch (direction) {
			case 'up':
				return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12';
			case 'down':
				return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12';
			case 'left':
				return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16';
			case 'right':
				return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16';
			case 'fade':
				return isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95';
			default:
				return isVisible ? 'opacity-100' : 'opacity-0';
		}
	};

	return (
		<div
			ref={ref}
			className={`transition-all duration-1000 ease-out transform-gpu ${getDirectionClass()} ${className}`}
			style={{ transitionDelay: `${delay}ms` }}
		>
			{children}
		</div>
	);
}
