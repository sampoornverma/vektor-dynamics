import { useEffect, useState } from 'react';

export default function CustomCursor() {
	const [position, setPosition] = useState({ x: -100, y: -100 });
	const [isPointer, setIsPointer] = useState(false);
	const [isHidden, setIsHidden] = useState(false);

	useEffect(() => {
		const updatePosition = (e) => {
			setPosition({ x: e.clientX, y: e.clientY });
		};

		const updatePointerState = () => {
			const target = document.elementFromPoint(position.x, position.y);
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

		window.addEventListener('mousemove', (e) => {
			updatePosition(e);
			// We delay pointer check slightly to ensure position is updated
			requestAnimationFrame(updatePointerState);
		});
		
		document.addEventListener('mouseleave', handleMouseLeave);
		document.addEventListener('mouseenter', handleMouseEnter);

		return () => {
			window.removeEventListener('mousemove', updatePosition);
			document.removeEventListener('mouseleave', handleMouseLeave);
			document.removeEventListener('mouseenter', handleMouseEnter);
		};
	}, [position.x, position.y]);

	if (isHidden) return null;

	return (
		<>
			<style>{`
				* {
					cursor: none !important;
				}
			`}</style>
			
			<div 
				className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out"
				style={{ 
					transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
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
