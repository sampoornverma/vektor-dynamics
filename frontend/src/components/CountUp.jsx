import { useEffect, useState, useRef } from 'react';

export default function CountUp({ end, suffix = '', duration = 2000 }) {
	const [count, setCount] = useState(0);
	const countRef = useRef(null);
	const [hasTriggered, setHasTriggered] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (entry.isIntersecting && !hasTriggered) {
					setHasTriggered(true);
				}
			},
			{ threshold: 0.1 }
		);

		if (countRef.current) {
			observer.observe(countRef.current);
		}

		return () => observer.disconnect();
	}, [hasTriggered]);

	useEffect(() => {
		if (!hasTriggered) return;

		let start = 0;
		const endValue = parseInt(end, 10);
		if (isNaN(endValue)) {
			setCount(end); // fallback
			return;
		}

		const startTime = performance.now();

		const tick = (currentTime) => {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);
			
			// easeOutExpo for dramatic slowdown at the end
			const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
			
			const currentCount = Math.floor(easeOut * endValue);
			setCount(currentCount);

			if (progress < 1) {
				requestAnimationFrame(tick);
			} else {
				setCount(endValue);
			}
		};

		requestAnimationFrame(tick);
	}, [hasTriggered, end, duration]);

	return (
		<span ref={countRef}>
			{count}
			{suffix}
		</span>
	);
}
