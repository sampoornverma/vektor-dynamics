import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

export default function InteractiveTerminal() {
	const [history, setHistory] = useState([
		{ type: 'system', text: 'VektorOS v2.1.0 initialized.' },
		{ type: 'system', text: 'Type "help" for a list of commands.' }
	]);
	const [input, setInput] = useState('');
	const bottomRef = useRef(null);

	const handleCommand = (e) => {
		if (e.key === 'Enter') {
			if (!input.trim()) return;
			const cmd = input.trim().toLowerCase();
			const newHistory = [...history, { type: 'user', text: `> ${cmd}` }];
			
			// Command Logic
			switch(cmd) {
				case 'help':
					newHistory.push({ type: 'system', text: 'Available commands: help, status, deploy, ping, clear' });
					break;
				case 'status':
					newHistory.push({ type: 'system', text: 'Jatayu Core: ONLINE | Battery: 98% | RF Link: STABLE' });
					break;
				case 'deploy':
					newHistory.push({ type: 'system', text: 'INITIATING DEPLOYMENT SEQUENCE...' });
					setTimeout(() => {
						setHistory(prev => [...prev, { type: 'alert', text: 'DEPLOYMENT COMPLETE. UAV IS AIRBORNE.' }]);
					}, 1500);
					break;
				case 'ping':
					newHistory.push({ type: 'system', text: 'Pong. Latency 14ms.' });
					break;
				case 'clear':
					setHistory([]);
					setInput('');
					return;
				default:
					newHistory.push({ type: 'error', text: `Command not recognized: ${cmd}` });
			}
			
			setHistory(newHistory);
			setInput('');
		}
	};

	const containerRef = useRef(null);

	// Auto scroll to bottom of the terminal ONLY
	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [history]);

	return (
		<div className="bg-tech-surface border-tech-border border rounded-md p-3 max-w-sm flex flex-col font-mono text-[11px] text-tech-accent-light transition-colors duration-500 h-40 overflow-hidden shadow-inner group">
			<div className="flex items-center space-x-2 border-b border-tech-border/30 pb-2 mb-2">
				<TerminalIcon className="w-4 h-4 text-tech-accent-light shrink-0 animate-pulse" />
				<span className="text-tech-muted font-bold tracking-wider">Interactive Terminal</span>
			</div>
			
			<div 
				ref={containerRef}
				className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-1"
			>
				{history.map((line, i) => (
					<div key={i} className={`
						${line.type === 'user' ? 'text-white' : ''}
						${line.type === 'error' ? 'text-red-500' : ''}
						${line.type === 'alert' ? 'text-tech-accent-dark font-bold' : ''}
						${line.type === 'system' ? 'text-tech-muted' : ''}
					`}>
						{line.text}
					</div>
				))}
				
				<div className="flex items-center mt-2 text-white">
					<span className="text-tech-accent-light mr-2">{'>'}</span>
					<input 
						type="text" 
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleCommand}
						className="bg-transparent border-none outline-none flex-1 text-white placeholder-tech-muted/50"
						placeholder="Enter command..."
						spellCheck="false"
					/>
				</div>
			</div>
		</div>
	);
}
