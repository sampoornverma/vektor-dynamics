import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import api from '../api/interceptor.js';
import { Mail, MapPin, Phone, Terminal, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext.jsx';
import InteractiveTerminal from '../components/InteractiveTerminal.jsx';

export default function Contact() {
	const { theme } = useTheme();
	const isLight = theme === 'light';

	// Form State
	const [form, setForm] = useState({
		name: '',
		email: '',
		subject: '',
		message: ''
	});

	// Status States
	const [status, setStatus] = useState('idle'); // idle, submitting, success, error
	const [errorMessage, setErrorMessage] = useState('');
	const [consoleLogs, setConsoleLogs] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!form.name || !form.email || !form.subject || !form.message) {
			setStatus('error');
			setErrorMessage('Please fill in all form fields.');
			return;
		}

		setStatus('submitting');
		setConsoleLogs([
			'⚡ Initializing packet routing request...',
			`📡 From: ${form.name} <${form.email}>`,
			`🔖 Subject: ${form.subject}`
		]);

		try {
			// Add log items sequentially to look cool
			setTimeout(() => {
				setConsoleLogs((prev) => [...prev, '🔒 Encrypting query parameters via TLS/SSL...']);
			}, 500);

			setTimeout(() => {
				setConsoleLogs((prev) => [...prev, '🛰️ Forwarding telemetry payload to Vektor API Gateway...']);
			}, 1000);

			const response = await api.post('/public/contact', form);

			setTimeout(() => {
				setConsoleLogs((prev) => [...prev, '📧 Nodemailer SMTP transmission: Dispatch completed.', '🟢 SYSTEM RECEIPT: OK.']);
				setStatus('success');
			}, 1500);

		} catch (error) {
			console.error(error);
			const errText = error.response?.data?.error || 'Failed to dispatch message. Gateway timeout.';
			setStatus('error');
			setErrorMessage(errText);
			setConsoleLogs((prev) => [...prev, `❌ UPLINK FAULT: ${errText}`]);
		}
	};

	return (
		<div className={`min-h-screen ${isLight ? 'bg-gray-50' : 'bg-tech-bg transition-colors duration-500'} relative cyber-grid-overlay overflow-x-hidden font-sans`}>
			<div className="absolute inset-0 scanline pointer-events-none z-10"></div>
			<div className={`absolute inset-0 ${isLight ? 'bg-transparent' : 'bg-tech-bg transition-colors duration-500/60'} pointer-events-none`}></div>

			<Navbar />

			{/* HERO HEADER */}
			<section className="relative pt-32 pb-16 bg-gradient-to-b from-[#0a0f1d]/50 to-transparent font-space">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
					<span className={`text-[11px] font-mono ${isLight ? 'text-teal-600' : 'text-tech-accent-light'} font-bold uppercase tracking-[0.4em] block mb-2`}>
						Secure Communications
					</span>
					<h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight ${isLight ? 'text-gray-900' : 'text-tech-text'} font-display uppercase`}>
						CONTACT <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-accent-light to-tech-accent-dark glow-text">VEKTOR</span>
					</h1>
					<p className={`mt-4 ${isLight ? 'text-gray-600' : 'text-tech-muted'} max-w-2xl mx-auto text-sm sm:text-base`}>
						Route your inquiries directly to our engineering team. All submissions are encrypted and processed locally.
					</p>
				</div>
			</section>

			{/* FORM & DETAILS */}
			<section className="py-16 relative z-20 font-space">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
						
						{/* Left: Contact Info HUD */}
						<div className="lg:col-span-5 space-y-8">
							<div className={`${isLight ? 'bg-white' : 'bg-tech-surface/40'} border ${isLight ? 'border-gray-200' : 'border-tech-border/10'} rounded-lg p-6 space-y-6`}>
								<h2 className={`text-lg font-bold ${isLight ? 'text-gray-900' : 'text-tech-text'} uppercase tracking-wider font-display`}>
									Command Coordinates
								</h2>

								<div className="space-y-4">
									<div className="flex items-start space-x-4">
										<MapPin className="w-5 h-5 text-tech-accent-light shrink-0 mt-1" />
										<div>
											<span className="text-xs text-tech-muted uppercase tracking-widest font-mono block">Geographic HQ</span>
											<span className="text-sm text-gray-300 font-semibold">Delhi-NCR, India</span>
										</div>
									</div>

									<div className="flex items-start space-x-4">
										<Mail className="w-5 h-5 text-tech-accent-light shrink-0 mt-1" />
										<div>
											<span className="text-xs text-tech-muted uppercase tracking-widest font-mono block">Direct Mail</span>
											<a href="mailto:contact@vektor-dynamics.com" className="text-sm text-tech-accent-light font-mono hover:text-tech-accent-light/80 transition-colors">
												contact@vektor-dynamics.com
											</a>
										</div>
									</div>

									<div className="flex items-start space-x-4">
										<Phone className="w-5 h-5 text-tech-accent-light shrink-0 mt-1" />
										<div>
											<span className="text-xs text-tech-muted uppercase tracking-widest font-mono block">Secure Tel</span>
											<span className="text-sm text-gray-300 font-mono">+91 11-4567-8910</span>
										</div>
									</div>
								</div>

								{/* Info telemetry badge */}
								<div className={`border-t ${isLight ? 'border-gray-200' : 'border-tech-border/10'} pt-4 flex items-center space-x-2 text-[11px] text-tech-accent-dark font-mono uppercase tracking-wider`}>
									<ShieldCheck className="w-4 h-4 shrink-0" />
									<span>ITAR Compliant Payload Security</span>
								</div>
							</div>

							{/* Simulated wireframe radar element */}
							<div className={`h-[200px] border ${isLight ? 'border-gray-200' : 'border-tech-border/10'} rounded-lg ${isLight ? 'bg-gray-50' : 'bg-[#05080e]/60'} flex flex-col items-center justify-center p-4 relative overflow-hidden font-mono text-[10px] text-tech-accent-light/50`}>
								<div className="absolute top-2 left-3 uppercase tracking-widest text-[8px] text-tech-muted">
									Active Sensor Array
								</div>
								<div className="w-24 h-24 rounded-full border border-dashed border-tech-border/30 animate-spin relative flex items-center justify-center">
									<div className="absolute w-12 h-12 rounded-full border border-tech-border/20"></div>
									<div className="absolute w-1.5 h-1.5 rounded-full bg-tech-accent-light top-2 left-6"></div>
								</div>
								<span className="mt-4 uppercase tracking-[0.25em]">Radar Ping: Active</span>
							</div>

							{/* Moved Terminal from Footer */}
							<div className="mt-6">
								<InteractiveTerminal />
							</div>
						</div>

						{/* Right: Contact Form */}
						<div className="lg:col-span-7">
							<div className={`border ${isLight ? 'border-gray-200' : 'border-tech-border/15'} ${isLight ? 'bg-white' : 'bg-tech-surface/70'} rounded-lg p-6 sm:p-8 relative overflow-hidden`}>
								<div className="absolute top-0 right-0 p-3 font-mono text-[8px] text-tech-accent-light/40 uppercase tracking-widest">
									Secure Comm Node
								</div>

								{status === 'success' ? (
									<div className="space-y-4 py-12 text-center">
										<CheckCircle2 className="w-16 h-16 text-tech-accent-dark mx-auto animate-bounce" />
										<h3 className={`text-lg font-bold ${isLight ? 'text-gray-900' : 'text-tech-text'} uppercase font-display`}>Message Dispatched</h3>
										<p className={`text-sm ${isLight ? 'text-gray-600' : 'text-tech-muted'} max-w-sm mx-auto`}>
											Your secure inquiry packet has been logged in our databases and forwarded to our support inbox. An operations officer will reach out shortly.
										</p>
										<button
											onClick={() => {
												setStatus('idle');
												setForm({ name: '', email: '', subject: '', message: '' });
											}}
											className="mt-6 px-6 py-2.5 rounded bg-tech-accent-light/15 border border-tech-border/30 text-tech-accent-light text-xs font-bold font-mono hover:bg-tech-accent-light/25 transition-all"
										>
											[New Message]
										</button>
									</div>
								) : (
									<form onSubmit={handleSubmit} className="space-y-4 text-sm font-sans">
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											{/* Name */}
											<div className="space-y-1">
												<label htmlFor="name" className="block text-xs font-semibold text-tech-muted uppercase tracking-wider font-mono">
													Sender Identifier (Name)
												</label>
												<input
													id="name"
													type="text"
													required
													placeholder="John Doe"
													value={form.name}
													onChange={(e) => setForm({ ...form, name: e.target.value })}
													className={`w-full px-3 py-2.5 rounded border ${isLight ? 'border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400' : 'border-tech-border/15 bg-tech-bg transition-colors duration-500 text-tech-text placeholder-gray-600'} focus:outline-none focus:border-tech-accent-light/50 focus:ring-1 focus:ring-[#00FFCC]/20`}
												/>
											</div>

											{/* Email */}
											<div className="space-y-1">
												<label htmlFor="email" className="block text-xs font-semibold text-tech-muted uppercase tracking-wider font-mono">
													Return Channel (Email)
												</label>
												<input
													id="email"
													type="email"
													required
													placeholder="john@example.com"
													value={form.email}
													onChange={(e) => setForm({ ...form, email: e.target.value })}
													className={`w-full px-3 py-2.5 rounded border ${isLight ? 'border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400' : 'border-tech-border/15 bg-tech-bg transition-colors duration-500 text-tech-text placeholder-gray-600'} focus:outline-none focus:border-tech-accent-light/50 focus:ring-1 focus:ring-[#00FFCC]/20`}
												/>
											</div>
										</div>

										{/* Subject */}
										<div className="space-y-1">
											<label htmlFor="subject" className="block text-xs font-semibold text-tech-muted uppercase tracking-wider font-mono">
												Signal Subject
											</label>
											<input
												id="subject"
												type="text"
												required
												placeholder="UAV payload specifications query"
												value={form.subject}
												onChange={(e) => setForm({ ...form, subject: e.target.value })}
												className={`w-full px-3 py-2.5 rounded border ${isLight ? 'border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400' : 'border-tech-border/15 bg-tech-bg transition-colors duration-500 text-tech-text placeholder-gray-600'} focus:outline-none focus:border-tech-accent-light/50 focus:ring-1 focus:ring-[#00FFCC]/20`}
											/>
										</div>

										{/* Message */}
										<div className="space-y-1">
											<label htmlFor="message" className="block text-xs font-semibold text-tech-muted uppercase tracking-wider font-mono">
												Payload Message
											</label>
											<textarea
												id="message"
												required
												rows="5"
												placeholder="Describe details of your request or deployment constraints..."
												value={form.message}
												onChange={(e) => setForm({ ...form, message: e.target.value })}
												className={`w-full px-3 py-2.5 rounded border ${isLight ? 'border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400' : 'border-tech-border/15 bg-tech-bg transition-colors duration-500 text-tech-text placeholder-gray-600'} focus:outline-none focus:border-tech-accent-light/50 focus:ring-1 focus:ring-[#00FFCC]/20 resize-none`}
											></textarea>
										</div>

										{/* Error Alert */}
										{status === 'error' && (
											<div className="flex items-center space-x-2 text-red-400 bg-red-500/10 p-3 rounded border border-red-500/30 text-xs">
												<AlertTriangle className="w-4 h-4 shrink-0" />
												<span>{errorMessage}</span>
											</div>
										)}

										{/* Submit Button */}
										<button
											type="submit"
											disabled={status === 'submitting'}
											className="w-full py-3 rounded text-black bg-gradient-to-r from-tech-accent-light to-tech-accent-dark font-bold uppercase tracking-wider text-xs shadow-md hover:shadow-[0_0_15px_rgba(0,255,204,0.4)] disabled:opacity-50 transition-all"
										>
											{status === 'submitting' ? 'Uplinking Message Packet...' : 'Transmit Message'}
										</button>
									</form>
								)}

								{/* Terminal logger */}
								{status === 'submitting' && (
									<div className="mt-6 border border-tech-border/20 bg-[#05080e] rounded p-4 font-mono text-[10px] space-y-1">
										<div className="flex items-center space-x-2 text-tech-accent-light border-b border-tech-border/10 pb-1.5 mb-1.5">
											<Terminal className="w-3.5 h-3.5" />
											<span>Console routing output:</span>
										</div>
										{consoleLogs.map((log, index) => (
											<div key={index} className="text-tech-accent-light/80">
												<span className="text-tech-accent-light">{'>'}</span> {log}
											</div>
										))}
									</div>
								)}
							</div>
						</div>

					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}
