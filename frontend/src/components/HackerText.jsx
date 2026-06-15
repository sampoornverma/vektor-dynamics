import { useEffect, useState, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*X$&9@L!%';

export default function HackerText({ text, as: Component = 'span', className = '', speed = 30 }) {
	const [displayText, setDisplayText] = useState('');
	const [hasAnimated, setHasAnimated] = useState(false);
	const elementRef = useRef(null);

	// Initialize with scrambled text
	useEffect(() => {
		if (!hasAnimated) {
			setDisplayText(
				text.split('').map(c => c === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]).join('')
			);
		}
	}, [text, hasAnimated]);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && !hasAnimated) {
				setHasAnimated(true);
			}
		}, { threshold: 0.1 });

		if (elementRef.current) {
			observer.observe(elementRef.current);
		}
		
		return () => observer.disconnect();
	}, [hasAnimated]);

	useEffect(() => {
		if (!hasAnimated) return;

		let iteration = 0;
		const interval = setInterval(() => {
			setDisplayText((prev) => {
				return text
					.split('')
					.map((letter, index) => {
						if (letter === ' ') return ' ';
						// If the index is less than our iteration, lock in the correct character
						if (index < iteration) {
							return text[index];
						}
						// Otherwise, keep scrambling
						return CHARS[Math.floor(Math.random() * CHARS.length)];
					})
					.join('');
			});

			if (iteration >= text.length) {
				clearInterval(interval);
			}

			// Adjust speed of decryption: smaller number = slower decrypt
			iteration += 1 / 3; 
		}, speed);

		return () => clearInterval(interval);
	}, [hasAnimated, text, speed]);

	return (
		<Component ref={elementRef} className={className}>
			{displayText}
		</Component>
	);
}
