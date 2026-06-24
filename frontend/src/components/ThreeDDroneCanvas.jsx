import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { useTheme } from '../lib/ThemeContext.jsx';

export default function ThreeDDroneCanvas({ scrollReact = true }) {
	const mountRef = useRef(null);
	const { theme } = useTheme();
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		const currentMount = mountRef.current;
		if (!currentMount) return;

		let isMounted = true;
		let animationFrameId;

		// Track geometries and materials for safe disposal
		const disposables = [];

		try {
			const isLight = theme === 'light';
			const fogColor = isLight ? 0xffffff : 0x09090b; // pure white / zinc-950
			// Use Cyan for the drone to make it stand out dramatically against the Amber UI
			const droneColor = isLight ? 0x0891b2 : 0x06b6d4; // cyan-600 / cyan-500
			const redColor = 0xef4444; // red-500
			const darkMetal = isLight ? 0xa1a1aa : 0x18181b; // zinc-400 / zinc-900

			// 1. Scene setup
			const width = currentMount.clientWidth || 300;
			const height = currentMount.clientHeight || 300;
			const scene = new THREE.Scene();
			scene.fog = new THREE.FogExp2(fogColor, 0.08);

			// 2. Camera setup
			const camera = new THREE.PerspectiveCamera(45, height === 0 ? 1 : width / height, 0.1, 100);
			camera.position.set(0, 3.0, 8.0);
			camera.lookAt(0, 0, 0);

			// 3. Renderer setup
			const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
			renderer.setSize(width, height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			currentMount.appendChild(renderer.domElement);

			// 3.5. Orbit Controls (Interactive Dragging)
			const controls = new OrbitControls(camera, renderer.domElement);
			controls.enableDamping = true;
			controls.dampingFactor = 0.05;
			controls.enableZoom = false; // Prevent scrolling from zooming the canvas
			controls.enablePan = false;
			controls.autoRotate = true;
			controls.autoRotateSpeed = 1.5;

			// Auto-reset calibration logic
			const initialCameraPos = new THREE.Vector3(0, 3.0, 8.0);
			const initialTargetPos = new THREE.Vector3(0, 0, 0);
			let resetTimeout = null;
			let isResetting = false;

			controls.addEventListener('start', () => {
				isResetting = false;
				if (resetTimeout) clearTimeout(resetTimeout);
			});

			controls.addEventListener('end', () => {
				if (resetTimeout) clearTimeout(resetTimeout);
				resetTimeout = setTimeout(() => {
					isResetting = true;
				}, 2000); // 2 seconds after let go
			});

			// 4. Drone Group & Procedural Geometry Creation
			const droneGroup = new THREE.Group();
			scene.add(droneGroup);

			// Materials
			const wireframeMat = new THREE.MeshBasicMaterial({
				color: droneColor,
				wireframe: true,
				transparent: true,
				opacity: isLight ? 0.6 : 0.8
			});
			disposables.push(wireframeMat);

			const neonMat = new THREE.MeshBasicMaterial({
				color: droneColor,
				transparent: true,
				opacity: 0.9
			});
			disposables.push(neonMat);

			const redMat = new THREE.MeshBasicMaterial({
				color: redColor,
				transparent: true,
				opacity: 0.9
			});
			disposables.push(redMat);

			const darkMetalMat = new THREE.MeshBasicMaterial({
				color: darkMetal,
				wireframe: true,
				transparent: true,
				opacity: isLight ? 0.6 : 0.4
			});
			disposables.push(darkMetalMat);

			// 4.1 Central Chassis (octagonal box)
			const chassisGeo = new THREE.CylinderGeometry(0.7, 0.9, 0.25, 8);
			disposables.push(chassisGeo);
			const chassis = new THREE.Mesh(chassisGeo, wireframeMat);
			droneGroup.add(chassis);

			const chassisCoreGeo = new THREE.SphereGeometry(0.35, 8, 8);
			disposables.push(chassisCoreGeo);
			const chassisCore = new THREE.Mesh(chassisCoreGeo, wireframeMat);
			chassisCore.position.y = 0.15;
			droneGroup.add(chassisCore);

			// 4.2 Quadcopter Arms
			const armLength = 1.8;
			const armGeo = new THREE.CylinderGeometry(0.04, 0.04, armLength, 4);
			armGeo.rotateX(Math.PI / 2); // Rotate cylinder to lie flat
			disposables.push(armGeo);

			const arms = [];
			const motors = [];
			const propellers = [];

			const angles = [
				Math.PI / 4,     // Front Right (Emerald)
				(3 * Math.PI) / 4, // Back Right (Red)
				(5 * Math.PI) / 4, // Back Left (Red)
				(7 * Math.PI) / 4  // Front Left (Emerald)
			];

			angles.forEach((angle, index) => {
				// Arm
				const arm = new THREE.Mesh(armGeo, wireframeMat);
				const x = Math.cos(angle) * (armLength / 2);
				const z = Math.sin(angle) * (armLength / 2);
				arm.position.set(x, 0, z);
				arm.rotation.y = -angle;
				arm.userData = { originalPos: arm.position.clone(), explodeDir: new THREE.Vector3(x, 0, z).normalize() };
				droneGroup.add(arm);
				arms.push(arm);

				// Motor
				const motorGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.25, 6);
				disposables.push(motorGeo);
				const motor = new THREE.Mesh(motorGeo, wireframeMat);
				const motorX = Math.cos(angle) * armLength;
				const motorZ = Math.sin(angle) * armLength;
				motor.position.set(motorX, 0.1, motorZ);
				motor.userData = { originalPos: motor.position.clone(), explodeDir: new THREE.Vector3(motorX, 1, motorZ).normalize() };
				droneGroup.add(motor);
				motors.push(motor);

				// Glowing Indicator LED
				const ledGeo = new THREE.SphereGeometry(0.06, 4, 4);
				disposables.push(ledGeo);
				const led = new THREE.Mesh(ledGeo, (index === 0 || index === 3) ? neonMat : redMat);
				led.position.set(motorX, -0.1, motorZ);
				droneGroup.add(led);

				// Propeller
				const propGroup = new THREE.Group();
				propGroup.position.set(motorX, 0.22, motorZ);

				const bladeGeo = new THREE.BoxGeometry(0.8, 0.01, 0.06);
				disposables.push(bladeGeo);
				const blade = new THREE.Mesh(bladeGeo, wireframeMat);
				propGroup.add(blade);

				const centerPinGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.08, 4);
				disposables.push(centerPinGeo);
				const centerPin = new THREE.Mesh(centerPinGeo, wireframeMat);
				propGroup.add(centerPin);

				propGroup.userData = { originalPos: propGroup.position.clone(), explodeDir: new THREE.Vector3(motorX, 1.5, motorZ).normalize() };
				droneGroup.add(propGroup);
				propellers.push(propGroup);
			});

			// 4.3 Camera Gimbal (mounted underneath)
			const gimbalGroup = new THREE.Group();
			gimbalGroup.position.set(0, -0.3, 0.2);
			gimbalGroup.userData = { originalPos: gimbalGroup.position.clone(), explodeDir: new THREE.Vector3(0, -1, 0.5).normalize() };

			const gimbalMountGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.2, 6);
			disposables.push(gimbalMountGeo);
			const gimbalMount = new THREE.Mesh(gimbalMountGeo, darkMetalMat);
			gimbalGroup.add(gimbalMount);

			const cameraLensGeo = new THREE.SphereGeometry(0.18, 8, 8);
			disposables.push(cameraLensGeo);
			const cameraLens = new THREE.Mesh(cameraLensGeo, wireframeMat);
			cameraLens.position.y = -0.15;
			gimbalGroup.add(cameraLens);

			droneGroup.add(gimbalGroup);

			// Removed Grid/Floor Helper and scan rings per user request

			// 6. Lights
			const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
			dirLight.position.set(5, 10, 7);
			scene.add(dirLight);

			const ambientLight = new THREE.AmbientLight(0x070b13, 0.8);
			scene.add(ambientLight);

			// 7. Intersection Observer for Performance
			let isVisible = true;
			const observer = new IntersectionObserver((entries) => {
				isVisible = entries[0].isIntersecting;
			}, { threshold: 0 });
			observer.observe(currentMount);

			// 8. Animation loop
			const clock = new THREE.Clock();

			const animate = () => {
				if (!isMounted) return;
				animationFrameId = requestAnimationFrame(animate);
				
				if (!isVisible) return; // Pause rendering when off-screen

				const time = clock.getElapsedTime();

				// Propellers spin
				propellers.forEach((prop, i) => {
					const dir = (i % 2 === 0) ? 1 : -1;
					prop.rotation.y += 0.45 * dir;
				});

				// Auto-reset lerping
				if (isResetting) {
					camera.position.lerp(initialCameraPos, 0.03);
					controls.target.lerp(initialTargetPos, 0.03);
					
					// Stop resetting if we are very close to the initial position
					if (camera.position.distanceTo(initialCameraPos) < 0.01) {
						isResetting = false;
						camera.position.copy(initialCameraPos);
						controls.target.copy(initialTargetPos);
					}
				}

				// Update OrbitControls for damping and auto-rotation
				controls.update();

				// Smooth tilt reaction (mouse look) removed in favor of OrbitControls

				// Default target parameters (Stationary Mode)
				let targetDroneX = 0;
				let targetDroneY = Math.sin(time * 2.0) * 0.35 + 0.2; // increased bobbing amplitude for more up and down motion
				let targetDroneZ = 0;
				let targetDroneRotX = 0;
				let targetDroneRotY = 0; // Auto-rotation is handled by OrbitControls now
				let targetDroneRotZ = 0;
				let targetScale = 1.0;

				// Apply Damping (lerp/inertia) to drone position, scale, and rotation
				droneGroup.position.x += (targetDroneX - droneGroup.position.x) * 0.035;
				droneGroup.position.y += (targetDroneY - droneGroup.position.y) * 0.035;
				droneGroup.position.z += (targetDroneZ - droneGroup.position.z) * 0.035;

				droneGroup.scale.setScalar(
					droneGroup.scale.x + (targetScale - droneGroup.scale.x) * 0.035
				);

				droneGroup.rotation.x += (targetDroneRotX - droneGroup.rotation.x) * 0.035;
				droneGroup.rotation.y += (targetDroneRotY - droneGroup.rotation.y) * 0.035;
				droneGroup.rotation.z += (targetDroneRotZ - droneGroup.rotation.z) * 0.035;

				gimbalGroup.rotation.x = Math.sin(time * 1.5) * 0.15; // Auto-sweep camera
				gimbalGroup.rotation.z = Math.cos(time * 0.8) * 0.1;

				renderer.render(scene, camera);
			};

			animate();

			// 9. Resize handler
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
				if (resetTimeout) clearTimeout(resetTimeout);
				controls.dispose();
				renderer.dispose();
			};

		} catch (error) {
			console.error('Three.js setup encountered a WebGL error:', error);
			setHasError(true);
			isMounted = false;
		}
	}, [scrollReact, theme]);

	// Render a sleek glowing SVG fallback drone if WebGL fails
	if (hasError) {
		return (
			<div className="w-full h-full flex flex-col items-center justify-center bg-[#070b13] border border-cyan-500/10 rounded-lg p-6 text-center select-none font-mono">
				<div className="relative w-40 h-40 flex items-center justify-center animate-pulse mb-4">
					<svg viewBox="0 0 100 100" className="w-full h-full text-[#00FFCC]" fill="none" stroke="currentColor" strokeWidth="1">
						{/* Chassis */}
						<circle cx="50" cy="50" r="10" strokeDasharray="3 3" />
						{/* Cross arms */}
						<line x1="20" y1="20" x2="80" y2="80" />
						<line x1="20" y1="80" x2="80" y2="20" />
						{/* Rotors */}
						<circle cx="20" cy="20" r="8" />
						<circle cx="80" cy="20" r="8" />
						<circle cx="20" cy="80" r="8" />
						<circle cx="80" cy="80" r="8" />
						{/* Scanning beam */}
						<line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.5" className="animate-bounce" />
					</svg>
				</div>
				<span className="text-[10px] text-cyan-400/60 uppercase tracking-widest">
					Vector Mode Active (WebGL Offline)
				</span>
			</div>
		);
	}

	return (
		<div ref={mountRef} className="w-full h-full cursor-crosshair relative z-20" />
	);
}
