import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import api from '../api/interceptor.js';
import { Briefcase, MapPin, Calendar, Terminal, CheckCircle2, AlertTriangle, FileText, Upload } from 'lucide-react';
import { useTheme } from '../lib/ThemeContext.jsx';

export default function Careers() {
	const { theme } = useTheme();
	const isLight = theme === 'light';

	const jobs = [
		{
			title: 'Autonomous Flight Control Engineer',
			department: 'Guidance & Controls',
			location: 'Delhi-NCR, India',
			type: 'Full-time',
			description: 'Work on customizing flight control PID loops, sensor fusion algorithms (Extended Kalman Filters), and embedded C++ controllers on RDK X5 hardware to handle high wind shear and motor dropouts.',
			requirements: ['3+ years in C++ and embedded systems', 'Experience with PX4 or ArduPilot firmware custom builds', 'Background in control theory (PID, LQR, state estimation)']
		},
		{
			title: 'Robotics Computer Vision Specialist',
			department: 'AI & Perception',
			location: 'Delhi-NCR, India',
			type: 'Full-time',
			description: 'Deploy real-time object detection models (YOLO, custom classification networks) on low-power edge compute devices. Optimize models using TensorRT and integrate dual thermal/RGB video feeds.',
			requirements: ['Strong Python / C++ skills with PyTorch/TensorFlow', 'Experience compiling models for edge NPUs / RDK hardware', 'Familiarity with OpenCV and GStreamer pipeline setups']
		},
		{
			title: 'Embedded Systems Hardware Intern',
			department: 'Hardware R&D',
			location: 'Delhi-NCR, India',
			type: 'Internship (6 Months)',
			description: 'Assist in PCB prototyping, carbon fiber airframe stress testing, sensor calibration, and battery management logging. Participate in flight test operations in rural Delhi fields.',
			requirements: ['Pursuing B.Tech in Electronics, Robotics, or Aerospace Engineering', 'Basic schematic reading and soldering skills', 'Eagerness to debug physical drone hardware and compile log data']
		}
	];

	// Form State
	const [form, setForm] = useState({
		name: '',
		email: '',
		role: '',
		message: ''
	});
	const [resume, setResume] = useState(null);

	// Status States
	const [status, setStatus] = useState('idle'); // idle, submitting, success, error
	const [errorMessage, setErrorMessage] = useState('');
	const [consoleLogs, setConsoleLogs] = useState([]);

	const handleFileChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setResume(e.target.files[0]);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!form.name || !form.email || !form.role || !resume) {
			setStatus('error');
			setErrorMessage('Please fill in Name, Email, Role, and attach a Resume.');
			return;
		}

		setStatus('submitting');
		setConsoleLogs([
			'⚡ Initializing job application uplink...',
			`📝 Candidate: ${form.name}`,
			`🔍 Applied Role: ${form.role}`,
			`📎 Packaging resume: ${resume.name} (${(resume.size / 1024).toFixed(1)} KB)`
		]);

		const formData = new FormData();
		formData.append('name', form.name);
		formData.append('email', form.email);
		formData.append('role', form.role);
		formData.append('message', form.message);
		formData.append('resume', resume);

		try {
			// Append logs sequentially
			setTimeout(() => {
				setConsoleLogs((prev) => [...prev, '🛰️ Uploading packet to Vektor core server...']);
			}, 600);

			setTimeout(() => {
				setConsoleLogs((prev) => [...prev, '⚙️ Processing resume buffer & indexing application database...']);
			}, 1200);

			const response = await api.post('/public/apply', formData);

			setTimeout(() => {
				setConsoleLogs((prev) => [...prev, '📨 SMTP Transporter triggered: Notification email successfully dispatched.', '🟢 UPLINK COMPLETE. SUCCESS.']);
				setStatus('success');
			}, 1800);

		} catch (error) {
			console.error(error);
			const errText = error.response?.data?.error || 'Uplink failed. Telemetry connection timeout.';
			setStatus('error');
			setErrorMessage(errText);
			setConsoleLogs((prev) => [...prev, `❌ ERROR: ${errText}`]);
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
						Join the Mission
					</span>
					<h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight ${isLight ? 'text-gray-900' : 'text-tech-text'} font-display uppercase`}>
						BUILD THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-accent-light to-tech-accent-dark glow-text">FUTURE</span>
					</h1>
					<p className={`mt-4 ${isLight ? 'text-gray-600' : 'text-tech-muted'} max-w-2xl mx-auto text-sm sm:text-base`}>
						Deploy your robotics or machine learning expertise to build critical life-saving UAV platforms right here in New Delhi.
					</p>
				</div>
			</section>

			{/* JOBS & FORM SECTION */}
			<section className="py-16 relative z-20 font-space">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
						
						{/* Left: Open Positions List */}
						<div className="lg:col-span-7 space-y-8">
							<h2 className={`text-xl sm:text-2xl font-bold ${isLight ? 'text-gray-900' : 'text-tech-text'} uppercase tracking-wider font-display mb-6`}>
								Open Positions
							</h2>
							
							<div className="space-y-6">
								{jobs.map((job, idx) => (
									<div key={idx} className={`${isLight ? 'bg-white' : 'bg-tech-surface/40'} border ${isLight ? 'border-gray-200' : 'border-tech-border/10'} rounded-lg p-6 hover:border-tech-accent-light/20 transition-all space-y-4`}>
										{/* Title header */}
										<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
											<h3 className={`text-base sm:text-lg font-bold ${isLight ? 'text-gray-900' : 'text-tech-text'} uppercase`}>{job.title}</h3>
											<span className="self-start sm:self-center font-mono text-[9px] text-tech-accent-light border border-tech-accent-light/20 px-2 py-0.5 rounded uppercase bg-tech-accent-light/5">
												{job.type}
											</span>
										</div>
										
										{/* Details bar */}
										<div className="flex flex-wrap gap-4 text-xs font-mono text-tech-muted">
											<span className="flex items-center space-x-1">
												<Briefcase className="w-3.5 h-3.5 text-tech-accent-light" />
												<span>{job.department}</span>
											</span>
											<span className="flex items-center space-x-1">
												<MapPin className="w-3.5 h-3.5 text-tech-accent-light" />
												<span>{job.location}</span>
											</span>
										</div>

										<p className={`text-sm ${isLight ? 'text-gray-600' : 'text-tech-muted'} leading-relaxed font-sans`}>{job.description}</p>

										{/* Requirements checklist */}
										<div className="space-y-1.5 font-sans">
											<h5 className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Key Requirements:</h5>
											{job.requirements.map((req, rIdx) => (
												<div key={rIdx} className={`flex items-start text-xs ${isLight ? 'text-gray-600' : 'text-tech-muted'} space-x-2`}>
													<span className="text-tech-accent-light font-mono shrink-0 mt-0.5">•</span>
													<span>{req}</span>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Right: Application Form */}
						<div className="lg:col-span-5">
							<div className={`border ${isLight ? 'border-gray-200' : 'border-tech-border/15'} ${isLight ? 'bg-white' : 'bg-tech-surface/70'} rounded-lg p-6 relative overflow-hidden`}>
								<div className="absolute top-0 right-0 p-2.5 font-mono text-[8px] text-tech-accent-light/40 uppercase tracking-widest">
									Secure Apply Gateway
								</div>
								<h2 className={`text-lg font-bold ${isLight ? 'text-gray-900' : 'text-tech-text'} uppercase tracking-wider mb-6 font-display`}>
									Apply Now
								</h2>

								{status === 'success' ? (
									<div className="space-y-4 py-8 text-center">
										<CheckCircle2 className="w-16 h-16 text-tech-accent-dark mx-auto animate-bounce" />
										<h3 className={`text-lg font-bold ${isLight ? 'text-gray-900' : 'text-tech-text'} uppercase font-display`}>Submission Successful</h3>
										<p className={`text-sm ${isLight ? 'text-gray-600' : 'text-tech-muted'} max-w-xs mx-auto`}>
											Your application and resume package have been securely transmitted to the Vektor Recruitment unit. We will contact you shortly.
										</p>
										<button
											onClick={() => {
												setStatus('idle');
												setForm({ name: '', email: '', role: '', message: '' });
												setResume(null);
											}}
											className="mt-4 px-6 py-2.5 rounded bg-tech-accent-light/15 border border-tech-border/30 text-tech-accent-light text-xs font-bold font-mono hover:bg-tech-accent-light/25 transition-all"
										>
											[Submit Another Application]
										</button>
									</div>
								) : (
									<form onSubmit={handleSubmit} className="space-y-4 text-sm font-sans">
										{/* Name */}
										<div className="space-y-1">
											<label htmlFor="name" className="block text-xs font-semibold text-tech-muted uppercase tracking-wider font-mono">
												Full Name
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
												Email Address
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

										{/* Role selection */}
										<div className="space-y-1">
											<label htmlFor="role" className="block text-xs font-semibold text-tech-muted uppercase tracking-wider font-mono">
												Target Position
											</label>
											<select
												id="role"
												required
												value={form.role}
												onChange={(e) => setForm({ ...form, role: e.target.value })}
												className={`w-full px-3 py-2.5 rounded border ${isLight ? 'border-gray-300 bg-gray-50 text-gray-900' : 'border-tech-border/15 bg-tech-bg transition-colors duration-500 text-gray-300'} focus:outline-none focus:border-tech-accent-light/50`}
											>
												<option value="" disabled>Select a position...</option>
												{jobs.map((job, index) => (
													<option key={index} value={job.title} className="bg-tech-bg transition-colors duration-500 text-tech-text">
														{job.title}
													</option>
												))}
											</select>
										</div>

										{/* Cover Letter */}
										<div className="space-y-1">
											<label htmlFor="message" className="block text-xs font-semibold text-tech-muted uppercase tracking-wider font-mono">
												Cover Letter (Optional)
											</label>
											<textarea
												id="message"
												rows="3"
												placeholder="Introduce yourself and outline your experience..."
												value={form.message}
												onChange={(e) => setForm({ ...form, message: e.target.value })}
												className={`w-full px-3 py-2.5 rounded border ${isLight ? 'border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400' : 'border-tech-border/15 bg-tech-bg transition-colors duration-500 text-tech-text placeholder-gray-600'} focus:outline-none focus:border-tech-accent-light/50 focus:ring-1 focus:ring-[#00FFCC]/20 resize-none`}
											></textarea>
										</div>

										{/* Resume upload */}
										<div className="space-y-1">
											<label className="block text-xs font-semibold text-tech-muted uppercase tracking-wider font-mono">
												Upload Resume (PDF, Word, or Image)
											</label>
											<div className={`relative flex flex-col items-center justify-center p-4 border border-dashed ${isLight ? 'border-gray-300 bg-gray-50' : 'border-tech-border/20 bg-tech-bg transition-colors duration-500'} hover:border-tech-accent-light/40 rounded-lg cursor-pointer transition-colors group`}>
												<input
													type="file"
													required
													accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
													onChange={handleFileChange}
													className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
												/>
												{resume ? (
													<div className="flex items-center space-x-2 text-tech-accent-light font-mono text-xs">
														<FileText className="w-5 h-5" />
														<span className="truncate max-w-[200px]">{resume.name}</span>
													</div>
												) : (
													<div className="flex flex-col items-center text-center space-y-1 text-tech-muted group-hover:text-tech-accent-light transition-colors">
														<Upload className="w-6 h-6" />
														<span className="text-xs">Drag/Click to upload file</span>
													</div>
												)}
											</div>
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
											{status === 'submitting' ? 'Uploading Application...' : 'Send Application'}
										</button>
									</form>
								)}

								{/* Submission terminal logger */}
								{status === 'submitting' && (
									<div className="mt-6 border border-tech-border/20 bg-[#05080e] rounded p-4 font-mono text-[10px] space-y-1">
										<div className="flex items-center space-x-2 text-tech-accent-light border-b border-tech-border/10 pb-1.5 mb-1.5">
											<Terminal className="w-3.5 h-3.5" />
											<span>Upload Terminal logs:</span>
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
