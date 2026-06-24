import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../lib/ThemeContext.jsx';

export default function ThreeDGlobeCanvas() {
	const mountRef = useRef(null);
	const { theme } = useTheme();
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		const currentMount = mountRef.current;
		if (!currentMount) return;

		let isMounted = true;
		let animationFrameId;

		const disposables = [];

		try {
			const isLight = theme === 'light';
			const primaryColorNum = isLight ? 0xd97706 : 0xfbbf24; // amber-600 / amber-400
			const secondaryColorNum = isLight ? 0xb45309 : 0xf59e0b; // amber-700 / amber-500
			
			const width = currentMount.clientWidth || 300;
			const height = currentMount.clientHeight || 300;

			// 1. Scene setup
			const scene = new THREE.Scene();

			// 2. Camera setup
			const camera = new THREE.PerspectiveCamera(45, height === 0 ? 1 : width / height, 0.1, 100);
			camera.position.set(0, 0, 6);

			// 3. Renderer setup
			const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
			renderer.setSize(width, height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			currentMount.appendChild(renderer.domElement);

			// 4. Create Globe Groups
			const globeGroup = new THREE.Group();
			scene.add(globeGroup);

			// 4.1 Particle Earth
			const particleCount = 1200;
			const sphereRadius = 1.8;
			const positions = new Float32Array(particleCount * 3);
			const colors = new Float32Array(particleCount * 3);

			const baseColor = new THREE.Color(isLight ? 0xa1a1aa : 0x27272a); // zinc-400 / zinc-800
			const landAccentColor = new THREE.Color(primaryColorNum);

			for (let i = 0; i < particleCount; i++) {
				const theta = Math.random() * Math.PI * 2;
				const phi = Math.acos((Math.random() * 2) - 1);

				const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
				const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
				const z = sphereRadius * Math.cos(phi);

				positions[i * 3] = x;
				positions[i * 3 + 1] = y;
				positions[i * 3 + 2] = z;

				const noise = Math.sin(x * 1.5) * Math.cos(y * 1.5) * Math.sin(z * 1.5);
				const chosenColor = noise > 0.05 ? landAccentColor : baseColor;

				colors[i * 3] = chosenColor.r;
				colors[i * 3 + 1] = chosenColor.g;
				colors[i * 3 + 2] = chosenColor.b;
			}

			const particleGeo = new THREE.BufferGeometry();
			disposables.push(particleGeo);
			particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
			particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

			const particleMat = new THREE.PointsMaterial({
				size: 0.04,
				vertexColors: true,
				transparent: true,
				opacity: 0.85,
			});
			disposables.push(particleMat);

			const earthParticles = new THREE.Points(particleGeo, particleMat);
			globeGroup.add(earthParticles);

			// 4.2 Latitude/Longitude Grid rings
			const ringMaterial = new THREE.LineBasicMaterial({
				color: primaryColorNum,
				transparent: true,
				opacity: isLight ? 0.2 : 0.15
			});
			disposables.push(ringMaterial);

			// Add 5 horizontal rings
			const ringSegments = 64;
			for (let r = -2; r <= 2; r++) {
				const ringY = (r / 3) * sphereRadius;
				const ringRadius = Math.sqrt(sphereRadius * sphereRadius - ringY * ringY);

				const ringPoints = [];
				for (let s = 0; s <= ringSegments; s++) {
					const angle = (s / ringSegments) * Math.PI * 2;
					ringPoints.push(new THREE.Vector3(Math.cos(angle) * ringRadius, ringY, Math.sin(angle) * ringRadius));
				}

				const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPoints);
				disposables.push(ringGeo);
				const ring = new THREE.Line(ringGeo, ringMaterial);
				globeGroup.add(ring);
			}

			// Add 4 longitudinal rings
			for (let r = 0; r < 4; r++) {
				const angle = (r / 4) * Math.PI;
				const ringPoints = [];
				for (let s = 0; s <= ringSegments; s++) {
					const ringAngle = (s / ringSegments) * Math.PI * 2;
					const rx = sphereRadius * Math.cos(ringAngle) * Math.cos(angle);
					const ry = sphereRadius * Math.sin(ringAngle);
					const rz = sphereRadius * Math.cos(ringAngle) * Math.sin(angle);
					ringPoints.push(new THREE.Vector3(rx, ry, rz));
				}

				const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPoints);
				disposables.push(ringGeo);
				const ring = new THREE.Line(ringGeo, ringMaterial);
				globeGroup.add(ring);
			}

			// 4.3 Add Active Mission Nodes
			const beacons = [];
			const beaconLocations = [
				{ lat: 28.61, lon: 77.20, name: "Delhi HQ (Vektor Core)" },
				{ lat: 34.08, lon: 74.79, name: "Srinagar (Disaster Unit)" },
				{ lat: 13.08, lon: 80.27, name: "Chennai (Coastal Rescue)" },
				{ lat: 26.20, lon: 92.93, name: "Assam (Flood Recon)" }
			];

			const convertToCartesian = (lat, lon, radius) => {
				const phi = (90 - lat) * (Math.PI / 180);
				const theta = (lon + 180) * (Math.PI / 180);

				return new THREE.Vector3(
					-(radius * Math.sin(phi) * Math.sin(theta)),
					radius * Math.cos(phi),
					radius * Math.sin(phi) * Math.cos(theta)
				);
			};

			const activeNodeMat = new THREE.MeshBasicMaterial({ color: secondaryColorNum });
			disposables.push(activeNodeMat);
			const pulseNodeMat = new THREE.MeshBasicMaterial({ color: primaryColorNum, transparent: true, opacity: 0.4 });
			disposables.push(pulseNodeMat);

			beaconLocations.forEach((loc) => {
				const pos = convertToCartesian(loc.lat, loc.lon, sphereRadius);

				const nodeGroup = new THREE.Group();
				nodeGroup.position.copy(pos);

				// Solid Core
				const coreGeo = new THREE.SphereGeometry(0.05, 8, 8);
				disposables.push(coreGeo);
				const core = new THREE.Mesh(coreGeo, activeNodeMat);
				nodeGroup.add(core);

				// Pulsing Ring
				const pulseGeo = new THREE.SphereGeometry(0.12, 8, 8);
				disposables.push(pulseGeo);
				const pulse = new THREE.Mesh(pulseGeo, pulseNodeMat);
				nodeGroup.add(pulse);

				globeGroup.add(nodeGroup);
				beacons.push({ group: nodeGroup, pulse: pulse });
			});

			// 4.4 Add Connection telemetry curves
			const delPos = convertToCartesian(28.61, 77.20, sphereRadius);
			const arcMaterial = new THREE.LineBasicMaterial({
				color: primaryColorNum,
				transparent: true,
				opacity: 0.5
			});
			disposables.push(arcMaterial);

			beaconLocations.slice(1).forEach((loc) => {
				const targetPos = convertToCartesian(loc.lat, loc.lon, sphereRadius);
				const midPoint = new THREE.Vector3().addVectors(delPos, targetPos).multiplyScalar(0.5);
				midPoint.normalize().multiplyScalar(sphereRadius * 1.35);

				const curve = new THREE.QuadraticBezierCurve3(delPos, midPoint, targetPos);
				const points = curve.getPoints(30);
				const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
				disposables.push(arcGeo);
				const arc = new THREE.Line(arcGeo, arcMaterial);
				globeGroup.add(arc);
			});

			// 5. Orbit control variables
			let isDragging = false;
			let previousMousePosition = { x: 0, y: 0 };

			const handleMouseDown = (e) => {
				if (!isMounted) return;
				isDragging = true;
				previousMousePosition = { x: e.clientX, y: e.clientY };
			};

			const handleMouseMove = (e) => {
				if (!isMounted || !isDragging) return;
				const deltaMove = {
					x: e.clientX - previousMousePosition.x,
					y: e.clientY - previousMousePosition.y
				};

				globeGroup.rotation.y += deltaMove.x * 0.005;
				globeGroup.rotation.x += deltaMove.y * 0.005;

				previousMousePosition = { x: e.clientX, y: e.clientY };
			};

			const handleMouseUp = () => {
				isDragging = false;
			};

			// Touch support
			const handleTouchStart = (e) => {
				if (!isMounted) return;
				if (e.touches.length === 1) {
					isDragging = true;
					previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
				}
			};

			const handleTouchMove = (e) => {
				if (!isMounted || !isDragging || e.touches.length !== 1) return;
				const deltaMove = {
					x: e.touches[0].clientX - previousMousePosition.x,
					y: e.touches[0].clientY - previousMousePosition.y
				};

				globeGroup.rotation.y += deltaMove.x * 0.008;
				globeGroup.rotation.x += deltaMove.y * 0.008;

				previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
			};

			const dom = renderer.domElement;
			dom.addEventListener('mousedown', handleMouseDown);
			window.addEventListener('mousemove', handleMouseMove);
			window.addEventListener('mouseup', handleMouseUp);

			dom.addEventListener('touchstart', handleTouchStart);
			window.addEventListener('touchmove', handleTouchMove);
			window.addEventListener('touchend', handleMouseUp);

			// 6. Intersection Observer for Performance
			let isVisible = true;
			const observer = new IntersectionObserver((entries) => {
				isVisible = entries[0].isIntersecting;
			}, { threshold: 0 });
			observer.observe(currentMount);

			// 7. Animation loop
			const clock = new THREE.Clock();

			const animate = () => {
				if (!isMounted) return;
				animationFrameId = requestAnimationFrame(animate);
				
				if (!isVisible) return; // Pause rendering when off-screen

				const time = clock.getElapsedTime();

				if (!isDragging) {
					globeGroup.rotation.y += 0.003;
					globeGroup.rotation.x = Math.sin(time * 0.2) * 0.15;
				}

				beacons.forEach((b) => {
					const pulseScale = Math.sin(time * 6) * 0.4 + 1.2;
					b.pulse.scale.setScalar(pulseScale);
				});

				renderer.render(scene, camera);
			};

			animate();

			// 7. Resize handler
			const handleResize = () => {
				if (!isMounted || !currentMount) return;
				const newWidth = currentMount.clientWidth;
				const newHeight = currentMount.clientHeight;
				camera.aspect = newHeight === 0 ? 1 : newWidth / newHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(newWidth, newHeight);
			};

			window.addEventListener('resize', handleResize);

			// Clean up function inside try block (returned on successful init)
			return () => {
				isMounted = false;
				observer.disconnect();
				dom.removeEventListener('mousedown', handleMouseDown);
				window.removeEventListener('mousemove', handleMouseMove);
				window.removeEventListener('mouseup', handleMouseUp);

				dom.removeEventListener('touchstart', handleTouchStart);
				window.removeEventListener('touchmove', handleTouchMove);
				window.removeEventListener('touchend', handleMouseUp);

				window.removeEventListener('resize', handleResize);
				cancelAnimationFrame(animationFrameId);

				if (currentMount && renderer.domElement) {
					currentMount.removeChild(renderer.domElement);
				}

				// Dispose of materials and geometries
				disposables.forEach((item) => {
					if (item && typeof item.dispose === 'function') {
						item.dispose();
					}
				});
				renderer.dispose();
			};

		} catch (error) {
			console.error('Three.js setup encountered a WebGL error on Globe:', error);
			setHasError(true);
			isMounted = false;
		}
	}, [theme]);

	// Render a sleek glowing SVG fallback radar sweep if WebGL fails
	if (hasError) {
		return (
			<div className="w-full h-full flex flex-col items-center justify-center bg-tech-surface/40 border border-tech-border rounded-lg p-6 text-center select-none font-mono">
				<div className="relative w-44 h-44 flex items-center justify-center animate-pulse mb-4">
					<svg viewBox="0 0 120 120" className="w-full h-full text-tech-accent-light" fill="none" stroke="currentColor" strokeWidth="1">
						{/* Circular rings */}
						<circle cx="60" cy="60" r="50" strokeDasharray="3 3" />
						<circle cx="60" cy="60" r="35" />
						<circle cx="60" cy="60" r="20" strokeDasharray="2 4" />
						{/* Coordinate crosshair lines */}
						<line x1="60" y1="5" x2="60" y2="115" strokeWidth="0.5" />
						<line x1="5" y1="60" x2="115" y2="60" strokeWidth="0.5" />
						{/* Scanning line sweep simulation */}
						<line x1="60" y1="60" x2="110" y2="60" className="origin-center animate-slow-rotate text-tech-accent-dark" stroke="currentColor" strokeWidth="1.5" />
					</svg>
				</div>
				<span className="text-[10px] text-tech-muted uppercase tracking-widest">
					Scanning telemetry grid (WebGL Offline)
				</span>
			</div>
		);
	}

	return (
		<div ref={mountRef} className="w-full h-full min-h-[300px] cursor-grab active:cursor-grabbing" />
	);
}
