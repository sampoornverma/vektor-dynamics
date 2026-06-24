import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
	const cursorRef = useRef(null);
	const [isPointer, setIsPointer] = useState(false);
	const [isHidden, setIsHidden] = useState(false);
	const [isTouchDevice, setIsTouchDevice] = useState(false);

	useEffect(() => {
		// Detect touch devices (phones/tablets)
		if (window.matchMedia('(pointer: coarse)').matches) {
			setIsTouchDevice(true);
			return;
		}

		const updatePosition = (e) => {
			if (cursorRef.current) {
				cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
			}
		};

		const updatePointerState = (e) => {
			const target = document.elementFromPoint(e.clientX, e.clientY);
			if (target) {
				const isClickable = 
					window.getComputedStyle(target).cursor === 'pointer' ||
					target.tagName === 'A' ||
					target.tagName === 'BUTTON' ||
					target.closest('a') ||
					target.closest('button');
				setIsPointer(!!isClickable);
			}
		};

		const handleMouseLeave = () => setIsHidden(true);
		const handleMouseEnter = () => setIsHidden(false);

		const handleMouseMove = (e) => {
			updatePosition(e);
			updatePointerState(e);
		};

		window.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseleave', handleMouseLeave);
		document.addEventListener('mouseenter', handleMouseEnter);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseleave', handleMouseLeave);
			document.removeEventListener('mouseenter', handleMouseEnter);
		};
	}, []);

	if (isTouchDevice || isHidden) return null;

	return (
		<>
			<style>{`
				* {
					cursor: none !important;
				}
			`}</style>
			
			<div 
				ref={cursorRef}
				className="fixed top-0 left-0 pointer-events-none z-[9999]"
				style={{ 
					transform: `translate3d(-100px, -100px, 0)`,
				}}
			>
				{/* Hollow Delta / Tailless Pointer SVG */}
				<svg 
					xmlns="http://www.w3.org/2000/svg" 
					width="28" 
					height="28" 
					viewBox="0 0 24 24" 
					className={`absolute top-0 left-0 text-tech-accent-light transition-transform duration-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] origin-top-left ${isPointer ? 'scale-75 rotate-[40deg]' : 'scale-100 rotate-[25deg]'}`}
					style={{ 
						fill: isPointer ? 'currentColor' : 'transparent', 
						stroke: 'currentColor', 
						strokeWidth: '2px',
						strokeLinecap: 'round',
						strokeLinejoin: 'round'
					}}
				>
					{/* Sleek delta shape (resembles a mouse pointer but without the long tail) */}
					<path d="M3 3 L21 9 L12 12 L9 21 Z" />
				</svg>
			</div>
		</>
	);
}
