import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

export default function InitialLoader() {
	const [show, setShow] = useState(true);
	const [fadeOut, setFadeOut] = useState(false);
	const [logs, setLogs] = useState([]);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const bootLogs = [
			'VektorOS v3.1.0 Initializing...',
			'Loading core modules: OK',
			'Mounting secure partitions: OK',
			'Connecting to Jatayu Fleet Network...',
			'Establishing 256-bit AES encryption link...',
			'Link established. Handshake verified.',
			'Loading WebGL rendering engines...',
			'Compiling shaders: OK',
			'Boot sequence complete. Welcome to Vektor Dynamics.'
		];

		let currentLogIndex = 0;
		const logInterval = setInterval(() => {
			if (currentLogIndex < bootLogs.length) {
				setLogs(prev => [...prev, bootLogs[currentLogIndex]]);
				currentLogIndex++;
			}
		}, 200);

		const progressInterval = setInterval(() => {
			setProgress(p => {
				if (p >= 100) {
					clearInterval(progressInterval);
					return 100;
				}
				return p + 5;
			});
		}, 100);

		// Hide loader after 2.5 seconds
		const fadeTimer = setTimeout(() => {
			setFadeOut(true);
			setTimeout(() => setShow(false), 500); // 500ms fade transition
		}, 2500);

		return () => {
			clearInterval(logInterval);
			clearInterval(progressInterval);
			clearTimeout(fadeTimer);
		};
	}, []);

	if (!show) return null;

	return (
		<div 
			className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05080e] transition-opacity duration-500 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
		>
			<div className="absolute inset-0 cyber-grid-overlay opacity-30 pointer-events-none"></div>
			
			<div className="w-full max-w-lg p-8 relative z-10 font-mono">
				<div className="flex items-center space-x-3 mb-6">
					<Terminal className="w-8 h-8 text-tech-accent-light" />
					<h1 className="text-2xl font-bold tracking-widest text-tech-text uppercase">
						Vektor<span className="text-tech-accent-light">OS</span>
					</h1>
				</div>

				<div className="h-40 overflow-y-hidden flex flex-col justify-end mb-6 text-xs text-tech-muted space-y-1.5">
					{logs.map((log, i) => (
						<div key={i} className="flex items-center space-x-2 animate-fade-in-up">
							<span className="text-tech-accent-light/50">{'>'}</span>
							<span className={i === logs.length - 1 ? 'text-tech-accent-light' : ''}>{log}</span>
						</div>
					))}
				</div>

				<div className="w-full h-1 bg-tech-surface rounded-full overflow-hidden">
					<div 
						className="h-full bg-tech-accent-light shadow-[0_0_10px_rgba(252,211,77,0.5)] transition-all duration-100 ease-out"
						style={{ width: `${progress}%` }}
					></div>
				</div>
				<div className="flex justify-between mt-2 text-[10px] text-tech-muted font-bold tracking-wider">
					<span>BOOT_SEQ</span>
					<span>{progress}%</span>
				</div>
			</div>
		</div>
	);
}
