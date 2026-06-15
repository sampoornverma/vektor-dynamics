import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { Shield, Cpu, Target, Award, Users, HardDrive } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext.jsx';

export default function About() {
	const { theme } = useTheme();
	const isLight = theme === 'light';

	const team = [
		{
			name: 'Soumya Shekhar',
			role: 'Co-Founder & Chief Robotics Architect',
			bio: 'Lead architect of flight dynamics control loops. Specializes in embedded firmware engineering and carbon fiber chassis integration.',
			avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200'
		},
		{
			name: 'Sampoorn Verma',
			role: 'Co-Founder & Lead Systems Engineer',
			bio: 'Oversees AI model optimization on RDK X5 hardware and edge object detection software pipelines for disaster environments.',
			avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200'
		}
	];

	const techSpecs = [
		{ spec: 'Airframe Structure', details: 'Tarot 650 Iron Man Carbon Fiber (CF) - high-rigidity structural weave' },
		{ spec: 'Flight Processor', details: 'RDK X5 Quad-Core ARM Cortex + custom FPGA for sub-millisecond control output' },
		{ spec: 'Navigation Logic', details: 'Dual active RTK-GPS locks + inertial optical flow positioning under GPS-denied zones' },
		{ spec: 'Onboard Computer', details: 'Jatayu Edge-AI Compute Module (4 TOPS local deep-learning capacity)' },
		{ spec: 'Deployment Payload', details: 'Electromagnet quick-release cargo system with 7 kg payload rating' },
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
						System Origins
					</span>
					<h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight ${isLight ? 'text-gray-900' : 'text-tech-text'} font-display uppercase`}>
						DRIVE THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-accent-light to-tech-accent-dark glow-text">CHANGE</span>
					</h1>
					<p className={`mt-4 ${isLight ? 'text-gray-600' : 'text-tech-muted'} max-w-2xl mx-auto text-sm sm:text-base font-space`}>
						Designing and manufacturing 100% indigenous drone systems for rapid disaster response, public safety, and tactical recon.
					</p>
				</div>
			</section>

			{/* NARRATIVE SECTION */}
			<section className="py-16 relative z-20 font-space">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-6">
							<h2 className={`text-2xl sm:text-3xl font-bold ${isLight ? 'text-gray-900' : 'text-tech-text'} uppercase font-display`}>
								The Vektor <span className={`${isLight ? 'text-teal-600' : 'text-tech-accent-light'}`}>Philosophy</span>
							</h2>
							<p className={`${isLight ? 'text-gray-600' : 'text-tech-muted'} leading-relaxed text-sm sm:text-base`}>
								Vektor Dynamics was founded to address a critical security vulnerability: the reliance of public safety forces on imported commercial drone hardware. In times of national disaster or tactical crises, foreign proprietary software lockouts or supply chain constraints can paralyze critical rescue operations.
							</p>
							<p className={`${isLight ? 'text-gray-600' : 'text-tech-muted'} leading-relaxed text-sm sm:text-base`}>
								By designing and manufacturing both the hardware structures and the flight controls entirely in India, we deliver systems with absolute reliability, custom threat resistance, and zero third-party dependencies.
							</p>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
								<div className="flex items-start space-x-3">
									<div className="p-2 rounded bg-tech-accent-light/10 border border-tech-border/20 text-tech-accent-light">
										<Shield className="w-5 h-5" />
									</div>
									<div>
										<h4 className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-tech-text'} uppercase`}>Sovereign Hardware</h4>
										<p className="text-xs text-tech-muted mt-1">Complete design authority over PCBs and flight processors.</p>
									</div>
								</div>
								<div className="flex items-start space-x-3">
									<div className="p-2 rounded bg-tech-accent-dark/10 border border-tech-accent-dark/20 text-tech-accent-dark">
										<Target className="w-5 h-5" />
									</div>
									<div>
										<h4 className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-tech-text'} uppercase`}>Disaster Focused</h4>
										<p className="text-xs text-tech-muted mt-1">Optimized control loops specifically for extreme weather and fire plumes.</p>
									</div>
								</div>
							</div>
						</div>

						{/* Interactive HUD specifications block */}
						<div className={`border ${isLight ? 'border-gray-200' : 'border-tech-border/15'} ${isLight ? 'bg-white' : 'bg-tech-surface/40'} rounded-lg p-8 relative overflow-hidden`}>
							<div className="absolute top-0 right-0 p-3 font-mono text-[9px] text-tech-accent-light/40 uppercase tracking-widest">
								System Blueprint
							</div>
							<h3 className={`text-sm font-bold ${isLight ? 'text-gray-900' : 'text-tech-text'} uppercase tracking-wider mb-6 flex items-center space-x-2 font-mono`}>
								<HardDrive className="w-4 h-4 text-tech-accent-light" />
								<span>Jatayu Technical Architecture</span>
							</h3>
							
							<div className="space-y-4 font-mono text-xs">
								{techSpecs.map((item, index) => (
									<div key={index} className="border-b border-tech-border/5 pb-3 last:border-b-0 last:pb-0">
										<div className={`${isLight ? 'text-teal-600' : 'text-tech-accent-light'} uppercase text-[11px] mb-1 font-semibold`}>{item.spec}</div>
										<div className={`${isLight ? 'text-gray-600' : 'text-tech-muted'}`}>{item.details}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* TECHNICAL STACK COMPARISON */}
			<section className={`py-16 border-t ${isLight ? 'border-gray-200' : 'border-tech-border/10'} ${isLight ? 'bg-white' : 'bg-tech-bg/90'} relative z-20`}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-2xl mx-auto mb-12">
						<h2 className={`text-2xl sm:text-3xl font-bold ${isLight ? 'text-gray-900' : 'text-tech-text'} uppercase font-display`}>
							System <span className={`${isLight ? 'text-teal-600' : 'text-tech-accent-light'}`}>Comparison</span>
						</h2>
						<p className={`${isLight ? 'text-gray-600' : 'text-tech-muted'} mt-2 text-xs sm:text-sm font-space`}>
							Why indigenous custom systems outclass off-the-shelf imports.
						</p>
					</div>

					<div className={`overflow-x-auto border ${isLight ? 'border-gray-200' : 'border-tech-border/10'} rounded-lg ${isLight ? 'bg-white' : 'bg-tech-bg transition-colors duration-500'}`}>
						<table className="w-full text-left font-mono text-xs border-collapse">
							<thead>
								<tr className={`border-b ${isLight ? 'border-gray-200 bg-gray-50' : 'border-tech-border/20 bg-tech-surface/60'} ${isLight ? 'text-gray-900' : 'text-tech-text'} uppercase tracking-wider`}>
									<th className="p-4">Feature Segment</th>
									<th className="p-4">Imported Commercial UAVs</th>
									<th className="p-4 text-tech-accent-light">Vektor Dynamics (Jatayu)</th>
								</tr>
							</thead>
							<tbody className={`${isLight ? 'text-gray-600' : 'text-tech-muted'} divide-y ${isLight ? 'divide-gray-100' : 'divide-cyan-500/5'}`}>
								<tr>
									<td className="p-4 font-bold text-tech-text">Data Sovereignty</td>
									<td className="p-4">Sends data back to foreign cloud servers. Encryption vulnerabilities.</td>
									<td className="p-4 text-tech-accent-dark">100% localized air-gapped encryption. Telemetry strictly on-premise.</td>
								</tr>
								<tr>
									<td className="p-4 font-bold text-tech-text">GPS-Denied Flight</td>
									<td className="p-4">Fails or triggers automatic landing when GPS signal is jammed.</td>
									<td className="p-4 text-tech-accent-dark">Inertial flow navigation and local SLAM mapping keeps drone airborne.</td>
								</tr>
								<tr>
									<td className="p-4 font-bold text-tech-text">Chassis Structural</td>
									<td className="p-4">Heavy molded plastics. Vulnerable to structural cracking under heat.</td>
									<td className="p-4 text-tech-accent-dark">Tarot 650 Carbon Fiber. High rigidity, flame-retardant chassis weave.</td>
								</tr>
								<tr>
									<td className="p-4 font-bold text-tech-text">Edge intelligence</td>
									<td className="p-4">Minimal sensor feeds. Requires high-bandwidth video feed transmission.</td>
									<td className="p-4 text-tech-accent-dark">Onboard RDK X5 module running local object detection at 30 FPS.</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</section>

			{/* LEADERSHIP TEAM */}
			<section className="py-24 relative z-20 font-space">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-2xl mx-auto mb-16">
						<span className={`text-[11px] font-mono ${isLight ? 'text-teal-600' : 'text-tech-accent-light'} font-bold uppercase tracking-[0.3em] block mb-2`}>
							Command Hierarchy
						</span>
						<h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${isLight ? 'text-gray-900' : 'text-tech-text'} font-display uppercase`}>
							Core Founders
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
						{team.map((member, index) => (
							<div key={index} className={`flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 p-6 rounded-lg border ${isLight ? 'border-gray-200 bg-white' : 'border-tech-border/10 bg-tech-surface/40'} hover:border-tech-accent-light/20 transition-all`}>
								<img
									src={member.avatar}
									alt={member.name}
									className="w-24 h-24 rounded-lg object-cover border border-tech-border/20 glow-border"
								/>
								<div className="text-center sm:text-left space-y-2">
									<h3 className={`text-lg font-bold ${isLight ? 'text-gray-900' : 'text-tech-text'} uppercase tracking-wide`}>{member.name}</h3>
									<span className={`text-xs ${isLight ? 'text-teal-600' : 'text-tech-accent-light'} font-mono uppercase block`}>{member.role}</span>
									<p className={`text-sm ${isLight ? 'text-gray-600' : 'text-tech-muted'} leading-relaxed font-sans`}>{member.bio}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
