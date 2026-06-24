import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import ScrollReveal from '../components/ScrollReveal.jsx';
import CountUp from '../components/CountUp.jsx';
import HackerText from '../components/HackerText.jsx';
import { Shield, Cpu, Activity, ArrowDown, CheckCircle, Zap, Play, Terminal } from 'lucide-react';
import ThreeDDroneCanvas from '../components/ThreeDDroneCanvas.jsx';

export default function Home() {
	// Interactive asset switcher
	const [activeAsset, setActiveAsset] = useState(1);

	// Simulated launch console modal
	const [isLaunching, setIsLaunching] = useState(false);
	const [launchStep, setLaunchStep] = useState(0);
	const [launchLogs, setLaunchLogs] = useState([]);

	const assetDetails = {
		1: {
			title: 'UAV Platform CF-650',
			frame: 'CF-650 Carbon Fiber',
			stability: 'Grade-A Active PID',
			payload: '7 kg Max Capacity',
			range: '15 km Telemetry Range',
			description: 'The structural foundation of the Jatayu drone fleet. Designed using military-grade weaves, it offers zero flex under heavy thrust and survives direct impacts in extreme conditions.'
		},
		2: {
			title: 'AI Edge Compute Module',
			frame: 'RDK X5 Quad-Core',
			stability: 'Sub-ms latency inference',
			payload: 'Dual camera interface',
			range: 'Local edge processing (no cloud)',
			description: 'The intelligent brain of our drone. Runs local YOLO models to locate survivors, map fire zones, and path-plan autonomously, completely independent of GPS or network availability.'
		}
	};

	// Launch simulator logic
	useEffect(() => {
		if (!isLaunching) return;

		const steps = [
			{ log: '⚡ INITIALIZING LAUNCH SEQUENCE...', delay: 600 },
			{ log: '📡 UPLINK: Calibrating telemetry link to 2.4GHz FHSS...', delay: 800 },
			{ log: '🔋 BATTERY CHECK: 25.2V (6S LiHV) - Nominal.', delay: 700 },
			{ log: '🧠 COMPUTE: Booting RDK X5 flight processor & AI engine...', delay: 900 },
			{ log: '🌀 PROPULSION: Spooling motors to 10%... RPM verified.', delay: 900 },
			{ log: '🛰️ GPS: RTK Precision lock obtained. Error margin 1.8cm.', delay: 800 },
			{ log: '🛡️ PROTOCOL: "Jatayu-Emergency-Alpha" selected.', delay: 600 },
			{ log: '🚀 ENGAGING AUTO-TAKE OFF... PROP THRUST 100%!', delay: 1000 },
			{ log: '🛸 STATUS: AIRBORNE. Entering autonomous hover at alt: 3.0m.', delay: 500 },
		];

		setLaunchStep(0);
		setLaunchLogs([steps[0].log]);

		let currentStep = 0;
		const runNextStep = () => {
			if (currentStep < steps.length - 1) {
				currentStep++;
				setLaunchStep(currentStep);
				setLaunchLogs((prev) => [...prev, steps[currentStep].log]);
				setTimeout(runNextStep, steps[currentStep].delay);
			}
		};

		const timer = setTimeout(runNextStep, steps[0].delay);
		return () => clearTimeout(timer);
	}, [isLaunching]);

	return (
		<div className="min-h-screen bg-tech-bg transition-colors duration-500 relative cyber-grid-overlay overflow-x-hidden font-sans">
			{/* Scan line simulation overlay */}
			<div className="absolute inset-0 scanline pointer-events-none z-10"></div>
			<div className="absolute inset-0 bg-tech-bg transition-colors duration-500/60 pointer-events-none"></div>

			<Navbar />

			{/* HERO SECTION */}
			<section className="relative pt-28 pb-16 min-h-screen flex items-center">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
						
						{/* Left Column: HUD Typography */}
						<div className="lg:col-span-7 space-y-6">
							{/* Badge Row */}
							<ScrollReveal direction="up">
								<div className="flex flex-wrap gap-3 items-center">
									<span className="flex items-center space-x-1.5 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-[10px] font-bold tracking-widest uppercase font-mono animate-pulse">
										<Activity className="w-3.5 h-3.5" />
										<span>Emergency Protocol Active</span>
									</span>
									<span className="px-3 py-1 rounded-full border border-tech-border/30 bg-tech-accent-light/10 text-tech-accent-light text-[10px] font-bold tracking-widest uppercase font-mono">
										Multi-Domain Response
									</span>
								</div>
							</ScrollReveal>

							{/* Main Heading */}
							<ScrollReveal direction="up" delay={100}>
								<div className="space-y-1">
									<span className="text-[12px] font-mono text-tech-accent-light font-bold uppercase tracking-[0.4em] block">
										Our Flagship Platform
									</span>
									<h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-tech-text font-display uppercase leading-tight">
										UAV<br />
									<HackerText 
										as="span" 
										text="Jatayu Series" 
										className="block text-tech-accent-light glow-text" 
									/>
								</h1>
								</div>
							</ScrollReveal>

							{/* Actions */}
							<ScrollReveal direction="up" delay={400}>
								<div className="flex flex-wrap gap-4 pt-2">
									<button
										onClick={() => setIsLaunching(true)}
										className="relative flex items-center space-x-2 px-8 py-4 rounded-md bg-gradient-to-r from-tech-accent-light to-tech-accent-dark text-black font-bold uppercase tracking-wider text-xs overflow-hidden group transition-all duration-300"
									>
										<Play className="w-4 h-4 fill-black text-black" />
										<span>Deploy Protocol</span>
									</button>
									<a
										href="#details"
										className="flex items-center space-x-2 px-8 py-4 rounded-md border border-tech-border/20 bg-tech-accent-light/5 hover:bg-tech-accent-light/10 text-tech-accent-light hover:text-tech-text font-bold uppercase tracking-wider text-xs font-mono transition-all duration-300"
									>
										<span>Mission Specs</span>
									</a>
								</div>
							</ScrollReveal>

							{/* Interactive Asset Details Panel */}
							<div className="pt-6 max-w-xl">
								<div className="bg-tech-surface/90 border border-tech-border/10 rounded-lg p-5 relative overflow-hidden">
									<div className="absolute top-0 right-0 p-2 text-[9px] font-mono text-tech-accent-light/50 uppercase tracking-widest">
										Asset Spec Grid
									</div>
									<h4 className="text-xs font-semibold text-tech-muted uppercase tracking-[0.2em] font-mono mb-3">
										Interactive Sub-Systems
									</h4>
									
									<div className="grid grid-cols-2 gap-3 mb-4">
										<button
											onClick={() => setActiveAsset(1)}
											className={`flex items-center justify-center p-3 rounded border font-mono text-xs uppercase tracking-wider transition-all ${
												activeAsset === 1
													? 'border-tech-accent-light/40 bg-tech-accent-light/10 text-tech-text shadow-[0_0_10px_rgba(252,211,77,0.15)]'
													: 'border-tech-border/10 bg-transparent text-tech-muted hover:text-gray-300'
											}`}
										>
											Asset 01: UAV
										</button>
										<button
											onClick={() => setActiveAsset(2)}
											className={`flex items-center justify-center p-3 rounded border font-mono text-xs uppercase tracking-wider transition-all ${
												activeAsset === 2
													? 'border-tech-accent-light/40 bg-tech-accent-light/10 text-tech-text shadow-[0_0_10px_rgba(252,211,77,0.15)]'
													: 'border-tech-border/10 bg-transparent text-tech-muted hover:text-gray-300'
											}`}
										>
											Asset 02: Compute
										</button>
									</div>

									{/* Swapped specifications view */}
									<div className="space-y-2 font-mono text-xs border-t border-tech-border/5 pt-4 transition-opacity duration-300">
										<h5 className="font-bold text-tech-accent-light uppercase text-[13px]">{assetDetails[activeAsset].title}</h5>
										<p className="text-tech-muted leading-relaxed font-sans mt-1">{assetDetails[activeAsset].description}</p>
										<div className="grid grid-cols-2 gap-y-2 pt-2 text-[11px] text-tech-muted">
											<div><span className="text-tech-accent-light/70">Structural:</span> {assetDetails[activeAsset].frame}</div>
											<div><span className="text-tech-accent-light/70">Payload Spec:</span> {assetDetails[activeAsset].payload}</div>
											<div><span className="text-tech-accent-light/70">Damping Loop:</span> {assetDetails[activeAsset].stability}</div>
											<div><span className="text-tech-accent-light/70">Range Scope:</span> {assetDetails[activeAsset].range}</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Right Column: 3D Drone Canvas viewport */}
						<div className="lg:col-span-5 h-[500px] w-full relative mt-12 lg:mt-0">
							{/* HUD Corner Accents */}
							<div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-tech-accent-light/40 pointer-events-none"></div>
							<div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-tech-accent-light/40 pointer-events-none"></div>
							<div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-tech-accent-light/40 pointer-events-none"></div>
							<div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-tech-accent-light/40 pointer-events-none"></div>
							
							{/* Radar circular lines background */}
							<div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
								<div className="w-80 h-80 rounded-full border border-tech-border/20 animate-pulse"></div>
								<div className="absolute w-56 h-56 rounded-full border border-tech-border/10"></div>
							</div>

							<div className="w-full h-full border border-tech-border/10 bg-tech-surface/40 rounded-lg relative overflow-hidden">
								<div className="absolute top-3 left-4 flex items-center space-x-2 font-mono text-[10px] text-tech-accent-light/60 z-20">
									<span className="w-2 h-2 rounded-full bg-tech-accent-dark animate-ping"></span>
									<span>LIVE TELEMETRY VIEWPORT: CF-650</span>
								</div>
								{/* Drone in hero box */}
								<div className="absolute inset-0 w-full h-full z-10 cursor-grab active:cursor-grabbing">
									<ThreeDDroneCanvas scrollReact={false} />
								</div>
							</div>
						</div>

					</div>
				</div>
				
				{/* Prompt Scroll Down */}
				<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-[10px] text-tech-muted font-mono tracking-[0.2em] uppercase animate-bounce pointer-events-none z-30">
					<span>Initialize Recon</span>
					<ArrowDown className="w-3.5 h-3.5 mt-1 text-tech-accent-light" />
				</div>
			</section>

			{/* REDEFINING DISASTER RESPONSE SECTION */}
			<section className="py-24 border-t border-tech-border/10 bg-tech-bg/90 relative z-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
						
						{/* Left: Text copy and Info grid */}
						<div className="lg:col-span-7 space-y-6">
							<ScrollReveal direction="left">
								<div className="space-y-1">
									<span className="text-[11px] font-mono text-tech-accent-light font-bold uppercase tracking-[0.3em] block">
										Vektor Dynamics Ecosystem
									</span>
									<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-tech-text font-display uppercase">
										Redefining<br />
										<span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-accent-light to-tech-accent-dark glow-text">
											Disaster Response
										</span>
									</h2>
								</div>
							</ScrollReveal>

							<ScrollReveal direction="left" delay={150}>
								<p className="text-tech-muted leading-relaxed font-space text-base">
									Jatayu is our flagship product—a high-performance autonomous drone system engineered for smart disaster response. Built on a robust indigenous foundation, it operates within the broader Vektor Dynamics ecosystem, which includes our full lineup of tactical hardware and an advanced AI intelligence service for existing enterprise platforms.
								</p>
							</ScrollReveal>

							<ScrollReveal direction="left" delay={200}>
								<ul className="space-y-4">
									<li className="flex items-start space-x-3">
										<CheckCircle className="w-5 h-5 text-tech-accent-light mt-0.5 shrink-0" />
										<span className="text-tech-muted">Command center dashboards mapping fleet health globally</span>
									</li>
									<li className="flex items-start space-x-3">
										<CheckCircle className="w-5 h-5 text-tech-accent-light mt-0.5 shrink-0" />
										<span className="text-tech-muted">End-to-end encrypted video streaming with military protocols</span>
									</li>
								</ul>
							</ScrollReveal>

							{/* Features Grid */}
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 font-space">
								<ScrollReveal direction="up" delay={200} className="h-full">
									<div className="p-4 rounded-md border border-tech-border/5 bg-tech-surface/40 hover:border-tech-border/10 transition-colors h-full">
										<Shield className="w-6 h-6 text-tech-accent-dark mb-2" />
										<h4 className="text-sm font-semibold text-tech-text uppercase tracking-wider">Indigenous Innovation</h4>
										<p className="text-xs text-tech-muted mt-1">Designed, developed, and manufactured entirely in India. Zero dependency on foreign systems.</p>
									</div>
								</ScrollReveal>
								<ScrollReveal direction="up" delay={350} className="h-full">
									<div className="p-4 rounded-md border border-tech-border/5 bg-tech-surface/40 hover:border-tech-border/10 transition-colors h-full">
										<Activity className="w-6 h-6 text-tech-accent-light mb-2" />
										<h4 className="text-sm font-semibold text-tech-text uppercase tracking-wider">Mission Critical</h4>
										<p className="text-xs text-tech-muted mt-1">Built for the harshest conditions. From floods to earthquakes, engineered for reliability.</p>
									</div>
								</ScrollReveal>
								<ScrollReveal direction="up" delay={500} className="h-full">
									<div className="p-4 rounded-md border border-tech-border/5 bg-tech-surface/40 hover:border-tech-border/10 transition-colors h-full">
										<Cpu className="w-6 h-6 text-tech-accent-light mb-2" />
										<h4 className="text-sm font-semibold text-tech-text uppercase tracking-wider">AI-First Approach</h4>
										<p className="text-xs text-tech-muted mt-1">Every action powered by local edge algorithms. Autonomous mapping & victim detection.</p>
									</div>
								</ScrollReveal>
							</div>
						</div>
						<div className="lg:col-span-5 h-[400px] relative">
							<ScrollReveal direction="right" delay={200} className="w-full h-full">
								<div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
									<div className="w-72 h-72 rounded-full bg-tech-accent-light/10 filter blur-3xl"></div>
								</div>
								<div className="w-full h-full rounded-lg relative overflow-hidden bg-gradient-to-b from-[#090f1d]/20 to-transparent flex items-center justify-center p-8">
									<div className="absolute top-4 left-4 font-mono text-[10px] text-tech-accent-light/50 uppercase tracking-widest pointer-events-none">
										2D Telemetry Overview
									</div>
									{/* Lightweight 2D SVG Map */}
									<svg viewBox="0 0 1000 500" className="w-full h-full opacity-60 drop-shadow-[0_0_10px_rgba(252,211,77,0.3)] text-tech-accent-light">
										<path fill="currentColor" opacity="0.3" d="M120.3 75.8c-2.4 1.2-4.1 3-5.2 5.5-1 2.3-1.2 5.1-.5 7.8 1.4 5.3 6.1 8.8 11.6 8.8 2.2 0 4.3-.6 6.1-1.8 1.5-1 2.8-2.4 3.6-4.1 1.2-2.4 1.4-5.3.6-7.8-1.4-4.5-5.3-7.8-10-8.5-2.2-.3-4.4 0-6.2.1zM280.4 60.1c-1.5.8-2.8 2.1-3.6 3.6-.8 1.5-1.2 3.3-1.2 5.1s.4 3.6 1.2 5.1c.8 1.5 2.1 2.8 3.6 3.6 1.5.8 3.3 1.2 5.1 1.2s3.6-.4 5.1-1.2c1.5-.8 2.8-2.1 3.6-3.6.8-1.5 1.2-3.3 1.2-5.1s-.4-3.6-1.2-5.1c-.8-1.5-2.1-2.8-3.6-3.6-1.5-.8-3.3-1.2-5.1-1.2s-3.6.4-5.1 1.2zM80.2 140.5c-2.1 1.1-3.8 2.8-4.9 4.9-1.1 2.1-1.7 4.5-1.7 6.9s.6 4.8 1.7 6.9c1.1 2.1 2.8 3.8 4.9 4.9 2.1 1.1 4.5 1.7 6.9 1.7s4.8-.6 6.9-1.7c2.1-1.1 3.8-2.8 4.9-4.9 1.1-2.1 1.7-4.5 1.7-6.9s-.6-4.8-1.7-6.9c-1.1-2.1-2.8-3.8-4.9-4.9-2.1-1.1-4.5-1.7-6.9-1.7s-4.8.6-6.9 1.7zM150.3 220.1c-1.8.9-3.3 2.4-4.2 4.2-.9 1.8-1.4 3.9-1.4 6 s.5 4.2 1.4 6c.9 1.8 2.4 3.3 4.2 4.2 1.8.9 3.9 1.4 6 1.4s4.2-.5 6-1.4c1.8-.9 3.3-2.4 4.2-4.2.9-1.8 1.4-3.9 1.4-6s-.5-4.2-1.4-6c-.9-1.8-2.4-3.3-4.2-4.2-1.8-.9-3.9-1.4-6-1.4s-4.2.5-6 1.4z" />
										<path fill="currentColor" opacity="0.6" d="M720.5 80.2c-3.1 1.6-5.6 4.1-7.2 7.2-1.6 3.1-2.4 6.6-2.4 10.1s.8 7 2.4 10.1c1.6 3.1 4.1 5.6 7.2 7.2 3.1 1.6 6.6 2.4 10.1 2.4s7-.8 10.1-2.4c3.1-1.6 5.6-4.1 7.2-7.2 1.6-3.1 2.4-6.6 2.4-10.1s-.8-7-2.4-10.1c-1.6-3.1-4.1-5.6-7.2-7.2-3.1-1.6-6.6-2.4-10.1-2.4s-7 .8-10.1 2.4zM850.1 180.4c-2.5 1.3-4.6 3.4-5.9 5.9-1.3 2.5-2 5.4-2 8.3s.7 5.8 2 8.3c1.3 2.5 3.4 4.6 5.9 5.9 2.5 1.3 5.4 2 8.3 2s5.8-.7 8.3-2c2.5-1.3 4.6-3.4 5.9-5.9 1.3-2.5 2-5.4 2-8.3s-.7-5.8-2-8.3c-1.3-2.5-3.4-4.6-5.9-5.9-2.5-1.3-5.4-2-8.3-2s-5.8.7-8.3 2z" />
										{/* India highlight node */}
										<circle cx="730.5" cy="190.2" r="12" fill="currentColor" className="animate-pulse" />
										<circle cx="730.5" cy="190.2" r="30" fill="transparent" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-[spin_4s_linear_infinite]" />
										<path fill="currentColor" opacity="0.3" d="M600.2 250.6c-2.8 1.4-5.1 3.7-6.5 6.5-1.4 2.8-2.1 6-2.1 9.2s.7 6.4 2.1 9.2c1.4 2.8 3.7 5.1 6.5 6.5 2.8 1.4 6 2.1 9.2 2.1s6.4-.7 9.2-2.1c2.8-1.4 5.1-3.7 6.5-6.5 1.4-2.8 2.1-6 2.1-9.2s-.7-6.4-2.1-9.2c-1.4-2.8-3.7-5.1-6.5-6.5-2.8-1.4-6-2.1-9.2-2.1s-6.4.7-9.2 2.1zM500.4 120.3c-1.9 1-3.5 2.6-4.5 4.5-1 1.9-1.5 4.1-1.5 6.3s.5 4.4 1.5 6.3c1 1.9 2.6 3.5 4.5 4.5 1.9 1 4.1 1.5 6.3 1.5s4.4-.5 6.3-1.5c1.9-1 3.5-2.6 4.5-4.5 1-1.9 1.5-4.1 1.5-6.3s-.5-4.4-1.5-6.3c-1-1.9-2.6-3.5-4.5-4.5-1.9-1-4.1-1.5-6.3-1.5s-4.4.5-6.3 1.5z" />
										{/* Connection lines */}
										<path d="M730.5 190.2 Q 660 120 720.5 90.3" fill="transparent" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.5" />
										<path d="M730.5 190.2 Q 800 250 858.4 194.6" fill="transparent" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.5" />
										<path d="M730.5 190.2 Q 650 240 609.4 266.3" fill="transparent" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.5" />
									</svg>
								</div>
							</ScrollReveal>
						</div>
					</div>
				</div>
			</section>

			{/* THE JATAYU PLATFORM CAPABILITIES SECTION */}
			<section id="details" className="py-24 border-t border-tech-border/10 bg-tech-bg transition-colors duration-500 relative z-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-3xl mx-auto mb-16">
						<ScrollReveal direction="up">
							<span className="text-[11px] font-mono text-tech-accent-light font-bold uppercase tracking-[0.3em] block mb-2">
								Capabilities
							</span>
							<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-tech-text font-display uppercase">
								The <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-accent-light to-tech-accent-dark">Jatayu Platform</span>
							</h2>
							<p className="text-tech-muted mt-4 font-space text-sm sm:text-base">
								Four core capabilities that redefine law enforcement, emergency response, and disaster management
							</p>
						</ScrollReveal>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-space">
						
						{/* Card 1: AI Detection */}
						<ScrollReveal direction="up" delay={100} className="h-full">
							<div className="bg-tech-surface/40 border border-tech-border/10 rounded-lg p-8 relative overflow-hidden group hover:border-tech-accent-light/30 transition-all duration-300 h-full">
								<div className="absolute top-0 right-0 w-24 h-24 bg-tech-accent-light/5 rounded-bl-full pointer-events-none group-hover:bg-tech-accent-light/10 transition-colors"></div>
								<Cpu className="w-8 h-8 text-tech-accent-light mb-4" />
								<h3 className="text-lg font-bold text-tech-text uppercase tracking-wider mb-2">AI Detection (Compute Module)</h3>
								<p className="text-sm text-tech-muted leading-relaxed">
									With a high-performance onboard Compute Module, our drones identify survivors, vehicle profiles, and environmental threats in real-time with sub-millisecond edge processing for law enforcement, fire services, and disaster scenarios.
								</p>
							</div>
						</ScrollReveal>

						{/* Card 2: Thermal Imaging */}
						<ScrollReveal direction="up" delay={250} className="h-full">
							<div className="bg-tech-surface/40 border border-tech-border/10 rounded-lg p-8 relative overflow-hidden group hover:border-tech-accent-light/30 transition-all duration-300 h-full">
								<div className="absolute top-0 right-0 w-24 h-24 bg-tech-accent-light/5 rounded-bl-full pointer-events-none group-hover:bg-tech-accent-light/10 transition-colors"></div>
								<Activity className="w-8 h-8 text-tech-accent-dark mb-4" />
								<h3 className="text-lg font-bold text-tech-text uppercase tracking-wider mb-2">Thermal Imaging & Live Mapping</h3>
								<p className="text-sm text-tech-muted leading-relaxed">
									Utilizing our specialized UAV Platform, drones deliver real-time thermal imaging overlay and aerial mapping before personnel enter dangerous environments. Essential for fire brigades assessing structural blazes and law enforcement operations.
								</p>
							</div>
						</ScrollReveal>

						{/* Card 3: Supply Delivery */}
						<ScrollReveal direction="up" delay={100} className="h-full">
							<div className="bg-tech-surface/40 border border-tech-border/10 rounded-lg p-8 relative overflow-hidden group hover:border-tech-accent-light/30 transition-all duration-300 h-full">
								<div className="absolute top-0 right-0 w-24 h-24 bg-tech-accent-light/5 rounded-bl-full pointer-events-none group-hover:bg-tech-accent-light/10 transition-colors"></div>
								<Zap className="w-8 h-8 text-tech-accent-light mb-4" />
								<h3 className="text-lg font-bold text-tech-text uppercase tracking-wider mb-2">Emergency Supply Delivery</h3>
								<p className="text-sm text-tech-muted leading-relaxed">
									Equipped with electromagnetic quick-release payload droppers, Jatayu can deliver up to 7 kg of medical supplies, flotation devices, or VHF radios to isolated coordinates in extreme weather, outperforming ground transport speeds by 70%.
								</p>
							</div>
						</ScrollReveal>

						{/* Card 4: Law Enforcement */}
						<ScrollReveal direction="up" delay={250} className="h-full">
							<div className="bg-tech-surface/40 border border-tech-border/10 rounded-lg p-8 relative overflow-hidden group hover:border-tech-accent-light/30 transition-all duration-300 h-full">
								<div className="absolute top-0 right-0 w-24 h-24 bg-tech-accent-light/5 rounded-bl-full pointer-events-none group-hover:bg-tech-accent-light/10 transition-colors"></div>
								<Shield className="w-8 h-8 text-indigo-400 mb-4" />
								<h3 className="text-lg font-bold text-tech-text uppercase tracking-wider mb-2">Law Enforcement & Border Recon</h3>
								<p className="text-sm text-tech-muted leading-relaxed">
									Supports border surveillance and suspect tracking via advanced zoom optics and AI classification loops. Encrypted telemetry links ensure secure transmission to tactical operations centers, keeping scouts out of danger.
								</p>
							</div>
						</ScrollReveal>

					</div>
				</div>
			</section>

			{/* IMPACT METRICS SECTION */}
			<section className="py-24 border-t border-tech-border/10 bg-tech-bg/90 relative z-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center max-w-2xl mx-auto mb-16">
						<ScrollReveal direction="up">
							<span className="text-[11px] font-mono text-tech-accent-light font-bold uppercase tracking-[0.3em] block mb-2">
								Impact Metrics
							</span>
							<HackerText 
								as="h2" 
								text="Measurable Results" 
								className="text-3xl sm:text-4xl font-bold tracking-tight text-tech-text font-display uppercase" 
							/>
						</ScrollReveal>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center font-space">
						
						{/* Metric 1 */}
						<ScrollReveal direction="up" delay={100} className="h-full">
							<div className="p-8 border border-tech-border/10 bg-tech-surface/40 rounded-lg h-full">
								<div className="text-5xl sm:text-6xl font-black text-tech-accent-light glow-text font-display mb-4">
									<CountUp end={70} suffix="%" duration={2000} />
								</div>
								<h3 className="text-base font-bold text-tech-text uppercase tracking-wide mb-2">
									Faster Response
								</h3>
								<p className="text-sm text-tech-muted">
									Compared to traditional methods in law enforcement, fire dispatch, and search operations.
								</p>
							</div>
						</ScrollReveal>

						{/* Metric 2 */}
						<ScrollReveal direction="up" delay={250} className="h-full">
							<div className="p-8 border border-tech-border/10 bg-tech-surface/40 rounded-lg h-full">
								<div className="text-5xl sm:text-6xl font-black text-tech-accent-dark glow-text font-display mb-4">
									<CountUp end={95} suffix="%" duration={2500} />
								</div>
								<h3 className="text-base font-bold text-tech-text uppercase tracking-wide mb-2">
									Autonomous Success
								</h3>
								<p className="text-sm text-tech-muted">
									Mission completion rate without human controller intervention, powered by onboard AI logic.
								</p>
							</div>
						</ScrollReveal>

						{/* Metric 3 */}
						<ScrollReveal direction="up" delay={400} className="h-full">
							<div className="p-8 border border-tech-border/10 bg-tech-surface/40 rounded-lg h-full">
								<div className="text-5xl sm:text-6xl font-black text-tech-accent-light glow-text font-display mb-4">
									<CountUp end={100} suffix="%" duration={3000} />
								</div>
								<h3 className="text-base font-bold text-tech-text uppercase tracking-wide mb-2">
									Indigenous Tech
								</h3>
								<p className="text-sm text-tech-muted">
									Designed, developed, and manufactured in India with zero foreign proprietary lockouts.
								</p>
							</div>
						</ScrollReveal>

					</div>
				</div>
			</section>

			{/* SIMULATED LAUNCH DIALOG OVERLAY */}
			{isLaunching && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tech-bg transition-colors duration-500/90 backdrop-blur-md">
					<div className="w-full max-w-xl border border-tech-border/40 bg-[#090f1d] rounded-lg shadow-[0_0_30px_rgba(252,211,77,0.3)] overflow-hidden">
						{/* Title Terminal bar */}
						<div className="bg-tech-surface px-4 py-3 flex items-center justify-between border-b border-tech-border/20">
							<div className="flex items-center space-x-2">
								<Terminal className="w-4 h-4 text-tech-accent-light" />
								<span className="font-mono text-xs font-bold text-tech-text tracking-widest uppercase">
									Jatayu Flight Controller Console
								</span>
							</div>
							<button
								onClick={() => setIsLaunching(false)}
								className="text-tech-muted hover:text-tech-text font-mono text-xs uppercase"
							>
								[Abort]
							</button>
						</div>

						{/* Console Logs */}
						<div className="p-6 h-[320px] overflow-y-auto font-mono text-xs space-y-2.5 bg-[#05080e] select-text">
							{launchLogs.map((log, index) => (
								<div
									key={index}
									className={`${
										index === launchLogs.length - 1 ? 'text-tech-text' : 'text-tech-accent-light/80'
									} flex items-start space-x-1.5`}
								>
									<span className="text-tech-accent-light shrink-0">{'>'}</span>
									<p className="leading-relaxed">{log}</p>
								</div>
							))}
							{/* Pulse cursor if in progress */}
							{launchStep < 8 ? (
								<div className="flex items-center space-x-1.5 text-tech-text animate-pulse">
									<span>{'>'}</span>
									<span className="w-2.5 h-4 bg-tech-accent-light"></span>
								</div>
							) : (
								<div className="flex items-center space-x-2 text-tech-accent-dark bg-tech-accent-dark/10 p-3 rounded border border-tech-accent-dark/30 mt-4 animate-bounce">
									<CheckCircle className="w-5 h-5 shrink-0" />
									<span className="text-[11px] font-bold uppercase tracking-wider">
										UAV Airborne. Telemetry locked. Mission status: Active.
									</span>
								</div>
							)}
						</div>

						{/* Console control bar */}
						<div className="px-4 py-3 bg-tech-surface border-t border-tech-border/20 flex items-center justify-between text-[10px] font-mono text-tech-muted">
							<span>Altitude: {launchStep >= 8 ? '3.0m' : launchStep >= 7 ? '1.2m' : '0.0m'}</span>
							<span>Thrust: {launchStep >= 8 ? '45%' : launchStep >= 7 ? '100%' : launchStep >= 4 ? '10%' : '0%'}</span>
							<span>Lock State: RTK-GPS</span>
						</div>
					</div>
				</div>
			)}

			<Footer />
		</div>
	);
}
