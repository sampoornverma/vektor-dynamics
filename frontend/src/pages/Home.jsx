import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import ThreeDDroneCanvas from '../components/ThreeDDroneCanvas.jsx';
import ThreeDGlobeCanvas from '../components/ThreeDGlobeCanvas.jsx';
import ScrollReveal from '../components/ScrollReveal.jsx';
import CountUp from '../components/CountUp.jsx';
import HackerText from '../components/HackerText.jsx';
import { Shield, Cpu, Activity, Play, Zap, ArrowDown, ChevronRight, Terminal, CheckCircle } from 'lucide-react';

export default function Home() {
	// Interactive asset switcher
	const [activeAsset, setActiveAsset] = useState(1);

	// Scroll tracking for drone fly-out
	const [droneFlying, setDroneFlying] = useState(false);
	const [scrollPercent, setScrollPercent] = useState(0);

	useEffect(() => {
		const onScroll = () => {
			const y = window.scrollY;
			const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
			setScrollPercent(maxScroll > 0 ? y / maxScroll : 0);
			setDroneFlying(y > 150);
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	// Drone position based on scroll — uses only top+left so CSS can interpolate smoothly
	const getDroneFloatStyle = () => {
		if (!droneFlying) {
			// Start near the hero box position (top-right area)
			return { top: '200px', left: 'calc(100vw - 220px)' };
		}
		if (scrollPercent <= 0.5) {
			// Top-right corner
			return { top: '100px', left: 'calc(100vw - 200px)' };
		} else {
			// Bottom-left corner
			return { top: 'calc(100vh - 200px)', left: '20px' };
		}
	};

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
										Jatayu Series
									</span>
									<h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-tech-text font-display uppercase leading-tight">
										UAV<br />
									<HackerText 
										as="span" 
										text="The Jatayu Platform" 
										className="block text-tech-accent-light glow-text" 
									/>
								</h1>
								</div>
							</ScrollReveal>

							{/* Description */}
							<ScrollReveal direction="up" delay={200}>
								<p className="text-tech-muted text-base sm:text-lg max-w-xl leading-relaxed">
									The definitive structural foundation for law enforcement, emergency response, and disaster operations. Engineered for high-capacity heavy lifting in extreme environments across public safety, fire services, and medical emergencies.
								</p>
							</ScrollReveal>

							{/* HUD Telemetry Quick Readouts */}
							<ScrollReveal direction="up" delay={300}>
								<div className="grid grid-cols-3 gap-4 border-y border-tech-border/10 py-6 max-w-lg font-mono">
									<div className="space-y-1">
										<span className="text-[10px] text-tech-muted uppercase tracking-wider block">Payload</span>
										<span className="text-xl sm:text-2xl font-bold text-tech-text tracking-wide">7 kg</span>
									</div>
									<div className="space-y-1">
										<span className="text-[10px] text-tech-muted uppercase tracking-wider block">Frame</span>
										<span className="text-xl sm:text-2xl font-bold text-tech-text tracking-wide">CF-650</span>
									</div>
									<div className="space-y-1">
										<span className="text-[10px] text-tech-muted uppercase tracking-wider block">Stability</span>
										<span className="text-xl sm:text-2xl font-bold text-tech-text tracking-wide">Grade-A</span>
									</div>
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
													? 'border-tech-accent-light/40 bg-tech-accent-light/10 text-tech-text shadow-[0_0_10px_rgba(0,255,204,0.15)]'
													: 'border-tech-border/10 bg-transparent text-tech-muted hover:text-gray-300'
											}`}
										>
											Asset 01: UAV
										</button>
										<button
											onClick={() => setActiveAsset(2)}
											className={`flex items-center justify-center p-3 rounded border font-mono text-xs uppercase tracking-wider transition-all ${
												activeAsset === 2
													? 'border-tech-accent-light/40 bg-tech-accent-light/10 text-tech-text shadow-[0_0_10px_rgba(0,255,204,0.15)]'
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
						<div className="lg:col-span-5 h-[500px] w-full relative">
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

							<div className="w-full h-full border border-tech-border/10 bg-tech-surface/40 rounded-lg relative">
								<div className="absolute top-3 left-4 flex items-center space-x-2 font-mono text-[10px] text-tech-accent-light/60 z-20">
									<span className="w-2 h-2 rounded-full bg-tech-accent-dark animate-ping"></span>
									<span>LIVE TELEMETRY VIEWPORT: CF-650</span>
								</div>
								{/* Drone in hero box - fades out on scroll */}
								<div
									className="absolute inset-0 w-full h-full z-10 cursor-grab active:cursor-grabbing"
									style={{
										opacity: droneFlying ? 0 : 1,
										transition: 'opacity 0.8s ease-in-out',
									}}
								>
									<ThreeDDroneCanvas scrollReact={false} />
								</div>
								{/* Deployed label - fades in on scroll */}
								<div
									className="absolute inset-0 flex items-center justify-center pointer-events-none"
									style={{
										opacity: droneFlying ? 1 : 0,
										transition: 'opacity 0.8s ease-in-out',
									}}
								>
									<span className="text-[10px] font-mono text-tech-accent-light/30 uppercase tracking-widest">UAV DEPLOYED</span>
								</div>
							</div>
							
						</div>
					</div>
				</div>
				
				{/* Prompt Scroll Down (Moved outside the grid to center properly on screen) */}
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
										Startup Vision
									</span>
									<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-tech-text font-display uppercase">
										Redefining<br />
										<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#00FFCC] glow-text">
											Disaster Response
										</span>
									</h2>
								</div>
							</ScrollReveal>

							<ScrollReveal direction="left" delay={150}>
								<p className="text-tech-muted leading-relaxed font-space text-base">
									Jatayu is a Delhi-based deep-tech startup pioneering autonomous drone systems for smart disaster response. Our mission is to save lives through cutting-edge AI and indigenous technology.
								</p>
							</ScrollReveal>

							<ScrollReveal direction="left" delay={250}>
								<p className="text-tech-muted leading-relaxed font-space text-sm">
									Built on the Tarot 650 Iron Man CF frame and powered by the RDK X5 flight controller, our drones combine durability with precision. When disaster strikes, every second counts—Jatayu ensures rapid detection, real-time 3D mapping, and autonomous supply delivery where it matters most.
								</p>
							</ScrollReveal>

							{/* Quote */}
							<ScrollReveal direction="left" delay={350}>
								<div className="border-l-2 border-tech-accent-light bg-[#0d1627]/50 p-4 rounded-r-md font-mono text-xs sm:text-sm text-tech-accent-light italic">
									"When nature's fury strikes, Jatayu takes flight. Autonomous, intelligent, and relentless in its mission to protect humanity."
								</div>
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

						{/* Right: Globe canvas viewport */}
						<div className="lg:col-span-5 h-[450px] relative">
							<ScrollReveal direction="right" delay={200} className="w-full h-full">
								<div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
									<div className="w-72 h-72 rounded-full bg-tech-accent-light/10 filter blur-3xl"></div>
								</div>
								<div className="w-full h-full rounded-lg relative overflow-hidden bg-gradient-to-b from-[#090f1d]/20 to-transparent">
									<div className="absolute top-4 left-4 font-mono text-[10px] text-tech-accent-light/50 uppercase tracking-widest pointer-events-none">
										Telemetry Map Grid (Drag Globe)
									</div>
									<ThreeDGlobeCanvas />
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
					<div className="w-full max-w-xl border border-tech-border/40 bg-[#090f1d] rounded-lg shadow-[0_0_30px_rgba(0,255,204,0.3)] overflow-hidden">
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
									<span className="w-2.5 h-4 bg-cyan-400"></span>
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

			{/* Floating drone - always rendered, moves smoothly between corners */}
			<div
				style={{
					position: 'fixed',
					...getDroneFloatStyle(),
					width: '180px',
					height: '180px',
					zIndex: 45,
					pointerEvents: 'auto',
					cursor: 'grab',
					opacity: droneFlying ? 1 : 0,
					transition: 'opacity 0.6s ease-in-out, top 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), left 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				}}
			>
				<ThreeDDroneCanvas scrollReact={false} />
			</div>

			<Footer />
		</div>
	);
}
