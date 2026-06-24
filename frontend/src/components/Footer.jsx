import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Shield, Terminal } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext.jsx';

export default function Footer() {
	const { theme } = useTheme();

	return (
		<footer className="relative bg-tech-bg border-t border-tech-border text-tech-muted py-12 overflow-hidden transition-colors duration-500">
			{/* Grid overlay background */}
			<div className="absolute inset-0 cyber-grid-overlay pointer-events-none opacity-50"></div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Branding & Telemetry Log */}
					<div className="md:col-span-2 space-y-4">
						<Link to="/" className="flex items-center space-x-2">
							<img 
								src={`${import.meta.env.BASE_URL}logo.png`} 
								alt="Vektor Dynamics Logo" 
								className="h-14 md:h-16 w-auto object-contain transition-all duration-500 scale-[2.0] origin-left -ml-4"
								style={{ 
									filter: theme === 'light' ? 'none' : 'invert(1) brightness(1.5)'
								}}
							/>
						</Link>
						<p className="text-sm text-tech-muted max-w-sm">
							Pioneering autonomous UAV platforms and AI-driven disaster response systems to protect communities and save lives. Designed and manufactured entirely in India.
						</p>
					</div>

					{/* Navigation Links */}
					<div>
						<h3 className="text-xs font-semibold tracking-[0.2em] text-tech-text uppercase mb-4 transition-colors duration-500">
							Navigation
						</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link to="/" className="hover:text-tech-accent-light transition-colors duration-200">
									Home
								</Link>
							</li>
							<li>
								<Link to="/about" className="hover:text-tech-accent-light transition-colors duration-200">
									About Us
								</Link>
							</li>
							<li>
								<Link to="/services" className="hover:text-tech-accent-light transition-colors duration-200">
									Jatayu Platform
								</Link>
							</li>
							<li>
								<Link to="/careers" className="hover:text-tech-accent-light transition-colors duration-200">
									Careers
								</Link>
							</li>
							<li>
								<Link to="/contact" className="hover:text-tech-accent-light transition-colors duration-200">
									Contact
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Details */}
					<div>
						<h3 className="text-xs font-semibold tracking-[0.2em] text-tech-text uppercase mb-4 transition-colors duration-500">
							Headquarters
						</h3>
						<ul className="space-y-3 text-sm">
							<li className="flex items-start space-x-2">
								<MapPin className="w-4 h-4 text-tech-accent-light shrink-0 mt-0.5" />
								<span>Delhi-NCR, India</span>
							</li>
							<li className="flex items-center space-x-2">
								<Mail className="w-4 h-4 text-tech-accent-light shrink-0" />
								<a href="mailto:contact@vektor-dynamics.com" className="hover:text-tech-text transition-colors">
									contact@vektor-dynamics.com
								</a>
							</li>
							<li className="flex items-center space-x-2">
								<Phone className="w-4 h-4 text-tech-accent-light shrink-0" />
								<span>+91 11-4567-8910</span>
							</li>
							<li className="flex items-center space-x-2">
								<Shield className="w-4 h-4 text-tech-accent-dark shrink-0" />
								<span className="text-[11px] font-mono text-tech-accent-dark uppercase tracking-wider">
									100% Indigenous Technology
								</span>
							</li>
						</ul>
					</div>
				</div>

				<hr className="border-tech-border my-8 transition-colors duration-500" />

				<div className="flex flex-col sm:flex-row items-center justify-between text-xs text-tech-muted font-mono">
					<p>&copy; {new Date().getFullYear()} Vektor Dynamics Private Limited. All rights reserved.</p>
					<p className="mt-2 sm:mt-0 flex items-center space-x-4">
						<span className="hover:text-tech-text cursor-pointer transition-colors">Security Protocols</span>
						<span>|</span>
						<span className="hover:text-tech-text cursor-pointer transition-colors">ITAR Compliant</span>
					</p>
				</div>
			</div>
		</footer>
	);
}
