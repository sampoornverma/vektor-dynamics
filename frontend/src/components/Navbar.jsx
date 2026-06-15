import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cpu, Moon, Sun } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext.jsx';

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation();
	const { theme, toggleTheme } = useTheme();

	const navLinks = [
		{ name: 'Home', path: '/' },
		{ name: 'About', path: '/about' },
		{ name: 'Services', path: '/services' },
		{ name: 'Careers', path: '/careers' },
		{ name: 'Contact', path: '/contact' },
	];

	const isActive = (path) => location.pathname === path;

	return (
		<nav className="fixed top-0 left-0 w-full z-50 border-b border-tech-border bg-tech-bg/80 backdrop-blur-md transition-colors duration-500">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-20">
					{/* Logo */}
					<Link to="/" className="flex items-center group">
						<img 
							src="/logo.png" 
							alt="Vektor Dynamics Logo" 
							className="h-12 md:h-16 w-auto object-contain transition-all duration-500 scale-[2.0] origin-left -ml-4"
							style={{ 
								filter: theme === 'light' ? 'none' : 'invert(1) brightness(1.5)'
							}}
						/>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						{navLinks.map((link) => (
							<Link
								key={link.path}
								to={link.path}
								className={`relative text-sm font-medium tracking-wider transition-colors duration-300 uppercase py-1 ${
									isActive(link.path)
										? 'text-tech-text font-semibold'
										: 'text-tech-muted hover:text-tech-text'
								}`}
							>
								{link.name}
								{/* Neon indicator line */}
								{isActive(link.path) && (
									<span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-tech-accent-light to-tech-accent-dark glow-shadow rounded-full"></span>
								)}
							</Link>
						))}
					</div>

					{/* Actions (Theme + CTA) */}
					<div className="hidden md:flex items-center space-x-4">
						<button
							onClick={toggleTheme}
							className="p-2 rounded-full border border-tech-border text-tech-accent-light hover:bg-tech-accent-light/10 transition-colors"
							aria-label="Toggle theme"
						>
							{theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
						</button>
						<Link
							to="/contact"
							className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider text-white overflow-hidden group"
						>
							{/* Glowing background */}
							<span className="absolute inset-0 w-full h-full bg-gradient-to-r from-tech-accent-light to-tech-accent-dark transition-all duration-300 ease-out group-hover:scale-105 glow-shadow"></span>
							<span className="relative z-10">Get Started</span>
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<div className="md:hidden flex items-center">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="text-gray-400 hover:text-white focus:outline-none"
						>
							{isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			{isOpen && (
				<div className="md:hidden border-t border-tech-border bg-tech-bg px-2 pt-2 pb-6 space-y-1 transition-colors duration-500">
					{navLinks.map((link) => (
						<Link
							key={link.path}
							to={link.path}
							onClick={() => setIsOpen(false)}
							className={`block px-3 py-3 rounded-md text-base font-semibold tracking-widest uppercase transition-colors ${
								isActive(link.path)
									? 'bg-tech-accent-light/10 text-tech-accent-light'
									: 'text-tech-muted hover:bg-tech-surface hover:text-tech-text'
							}`}
						>
							{link.name}
						</Link>
					))}
					<div className="pt-4 px-3 flex items-center space-x-4">
						<button
							onClick={() => { toggleTheme(); setIsOpen(false); }}
							className="p-3 rounded-md border border-tech-border text-tech-accent-light hover:bg-tech-accent-light/10 transition-colors w-auto flex-shrink-0"
						>
							{theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
						</button>
						<Link
							to="/contact"
							onClick={() => setIsOpen(false)}
							className="block flex-1 text-center py-3 rounded-md text-sm font-bold uppercase tracking-widest text-white bg-gradient-to-r from-tech-accent-light to-tech-accent-dark"
						>
							Get Started
						</Link>
					</div>
				</div>
			)}
		</nav>
	);
}
