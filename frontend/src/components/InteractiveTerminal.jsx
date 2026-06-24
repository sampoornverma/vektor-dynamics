import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import api from '../api/interceptor.js';

export default function InteractiveTerminal() {
	const [history, setHistory] = useState([
		{ type: 'system', text: 'VektorOS v2.1.0 initialized.' },
		{ type: 'system', text: 'Type "help" for a list of commands.' }
	]);
	const [input, setInput] = useState('');
	const [isProcessing, setIsProcessing] = useState(false);
	const bottomRef = useRef(null);

	const handleCommand = async (e) => {
		if (e.key === 'Enter') {
			if (!input.trim() || isProcessing) return;
			const cmd = input.trim();
			
			if (cmd.toLowerCase() === 'clear') {
				setHistory([]);
				setInput('');
				return;
			}

			const newHistory = [...history, { type: 'user', text: `> ${cmd}` }];
			setHistory(newHistory);
			setInput('');
			setIsProcessing(true);
			
			try {
				const response = await api.post('/public/chat', { message: cmd });
				if (response.data && response.data.success) {
					setHistory(prev => [...prev, { type: 'system', text: response.data.reply }]);
				} else {
					setHistory(prev => [...prev, { type: 'error', text: 'Error: Invalid response format from AI Gateway.' }]);
				}
			} catch (error) {
				console.error(error);
				const errText = error.response?.data?.error || 'Connection to AI Gateway timed out or was refused.';
				setHistory(prev => [...prev, { type: 'error', text: errText }]);
			} finally {
				setIsProcessing(false);
			}
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
				<TerminalIcon className={`w-4 h-4 text-tech-accent-light shrink-0 ${isProcessing ? 'animate-spin' : 'animate-pulse'}`} />
				<span className="text-tech-muted font-bold tracking-wider">Secure Comms Terminal</span>
				{isProcessing && <span className="text-tech-accent-light/50 ml-auto animate-pulse">PROCESSING...</span>}
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
