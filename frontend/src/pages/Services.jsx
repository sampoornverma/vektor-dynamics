import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { Shield, Cpu, Activity, Zap, Eye, RefreshCw, Flame, Navigation } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext.jsx';

export default function Services() {
	const { theme } = useTheme();
	const isLight = theme === 'light';

	const services = [
		{
			title: 'Disaster Relief & SAR',
			icon: <Zap className="w-8 h-8 text-tech-accent-light" />,
			badge: 'Emergency Response',
			description: 'Deployable in seconds during floods, earthquakes, or avalanches. Our drones carry emergency payloads up to 7 kg (VHF radios, medicine, water, flotation devices) and map survivor locations under dense rubble.',
			specs: ['Response Speed: 70% faster', 'Payload Cargo: Up to 7 kg', 'Release Mechanism: Electromagnetic lock']
		},
		{
			title: 'Tactical Law Enforcement',
			icon: <Shield className="w-8 h-8 text-indigo-400" />,
			badge: 'Surveillance / Security',
			description: 'Supports search operations, tactical suspect tracking, and border patrol. Encrypted wireless video links stream visual and infrared intelligence directly to control rooms, avoiding exposure for ground teams.',
			specs: ['Encryption: AES-256 air-gapped', 'Zoom: 30x optical + digital IR', 'Uplink range: Up to 15 km']
		},
		{
			title: 'Forestry & Wildfire Monitoring',
			icon: <Flame className="w-8 h-8 text-orange-400" />,
			badge: 'Environmental Safety',
			description: 'Equipped with dual thermal sensors, Jatayu monitors fire perimeters, locates hot spots through dense smoke, and helps forest services direct water drops safely before ground crews enter critical areas.',
			specs: ['Sensor range: 0°C to 550°C', 'Perimeter modeling: Real-time 3D', 'smoke penetration: IR bandpass']
		},
		{
			title: 'Custom UAV Engineering',
			icon: <Cpu className="w-8 h-8 text-tech-accent-dark" />,
			badge: 'R&D / Payload integration',
			description: 'We collaborate with research institutions and government bodies to build custom sensor mounts, modified carbon fiber frames (hexacopters/octacopters), and custom flight controller control loops.',
			specs: ['Frame customization: Tarot CF series', 'Flight controller: Custom FPGA loops', 'Sensor mounts: Gimbal-stabilized']
		}
	];

	return (
		<div className={`min-h-screen ${isLight ? 'bg-gray-50' : 'bg-tech-bg transition-colors duration-500'} relative cyber-grid-overlay overflow-x-hidden font-sans`}>
			{/* Scan line simulation overlay */}
			<div className="absolute inset-0 scanline pointer-events-none z-10"></div>
			<div className={`absolute inset-0 ${isLight ? 'bg-transparent' : 'bg-tech-bg transition-colors duration-500/60'} pointer-events-none`}></div>

			<Navbar />

			{/* HERO HEADER */}
			<section className="relative pt-32 pb-16 bg-gradient-to-b from-[#0a0f1d]/50 to-transparent">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
					<span className={`text-[11px] font-mono ${isLight ? 'text-teal-600' : 'text-tech-accent-light'} font-bold uppercase tracking-[0.4em] block mb-2`}>
						Operational Capabilities
					</span>
					<h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight ${isLight ? 'text-gray-900' : 'text-tech-text'} font-display uppercase`}>
						JATAYU <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-accent-light to-tech-accent-dark glow-text">SERVICES</span>
					</h1>
					<p className={`mt-4 ${isLight ? 'text-gray-600' : 'text-tech-muted'} max-w-2xl mx-auto text-sm sm:text-base font-space`}>
						Deploying advanced drone capabilities and AI compute hardware across emergency services, forestry, and border security.
					</p>
				</div>
			</section>

			{/* SERVICES GRID */}
			<section className="py-16 relative z-20 font-space">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{services.map((svc, index) => (
							<div key={index} className={`${isLight ? 'bg-white' : 'bg-tech-surface/40'} border ${isLight ? 'border-gray-200' : 'border-tech-border/10'} hover:border-tech-accent-light/30 rounded-lg p-8 relative overflow-hidden group transition-all duration-300 flex flex-col justify-between`}>
								<div>
									{/* Top Header */}
									<div className="flex items-center justify-between mb-4">
										{svc.icon}
										<span className="font-mono text-[9px] text-tech-accent-light border border-tech-border/20 px-2 py-0.5 rounded uppercase tracking-wider bg-tech-accent-light/5">
											{svc.badge}
										</span>
									</div>
									{/* Content */}
									<h3 className={`text-lg font-bold ${isLight ? 'text-gray-900' : 'text-tech-text'} uppercase tracking-wider mb-3`}>{svc.title}</h3>
									<p className={`text-sm ${isLight ? 'text-gray-600' : 'text-tech-muted'} leading-relaxed font-sans mb-6`}>
										{svc.description}
									</p>
								</div>
								
								{/* Technical Specs Callout */}
								<div className={`border-t ${isLight ? 'border-gray-100' : 'border-tech-border/5'} pt-4 mt-4 ${isLight ? 'bg-gray-50' : 'bg-tech-bg transition-colors duration-500/50'} p-4 rounded-md font-mono text-xs text-tech-muted space-y-1`}>
									<span className="text-tech-accent-light/70 uppercase text-[10px] tracking-wider block mb-1">Operational Specs:</span>
									{svc.specs.map((spec, i) => (
										<div key={i} className="flex items-center space-x-2">
											<span className="w-1.5 h-1.5 rounded-full bg-tech-accent-light"></span>
											<span>{spec}</span>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CALL TO ACTION */}
			<section className={`py-20 border-t ${isLight ? 'border-gray-200' : 'border-tech-border/10'} ${isLight ? 'bg-white' : 'bg-tech-bg/90'} relative z-20 font-space`}>
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
					<h2 className={`text-2xl sm:text-3xl font-bold ${isLight ? 'text-gray-900' : 'text-tech-text'} uppercase font-display`}>
						Need custom UAV engineering?
					</h2>
					<p className={`${isLight ? 'text-gray-600' : 'text-tech-muted'} max-w-xl mx-auto text-sm sm:text-base leading-relaxed`}>
						We specialize in designing unique frame structures, payloads, and controller protocols for defense, public safety, and specialized surveying operations.
					</p>
					<div className="pt-2">
						<a
							href="/contact"
							className="inline-flex items-center justify-center px-8 py-3.5 rounded bg-tech-accent-light text-black font-bold uppercase tracking-wider text-xs hover:bg-tech-accent-light/90 transition-all hover:shadow-[0_0_15px_rgba(0,255,204,0.4)]"
						>
							Consult Our Engineering Team
						</a>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
