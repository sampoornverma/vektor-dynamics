<div align="center">
  <img src="frontend/public/logo.png" alt="Vektor Dynamics Logo" width="200" />

  # Vektor Dynamics
  
  **Advanced Autonomous Unmanned Aerial Systems (UAS)**

  [![Live Demo](https://img.shields.io/badge/Live-Demo-06b6d4?style=for-the-badge)](https://sampoornverma.github.io/vektor-dynamics/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
  [![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)](#)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
</div>

<br />

## 🌐 Overview

Vektor Dynamics is a high-performance, military-grade web application designed to showcase advanced drone technology, autonomous flight telemetry, and real-time situational awareness. Built with bleeding-edge web technologies, the interface provides a highly interactive, 3D hardware-accelerated experience.

**[View Live Interactive Demo](https://sampoornverma.github.io/vektor-dynamics/)**

---

## ✨ Key Features

- **Interactive 3D WebGL Rendering:** Procedurally generated, lightweight 3D drones and global node networks utilizing `Three.js`, complete with mouse-tracking orbit controls and auto-rotation.
- **Hardware-Accelerated UI:** Fluid CSS-driven glitch animations, neon glow styling, and glassmorphism (backdrop-blur) components mimicking military HUD interfaces.
- **Live Terminal Simulator:** A fully playable mini-terminal located in the footer simulating telemetry readouts, auto-boot sequences, and interactive command parsing.
- **Scroll-Driven Intelligence:** Features `IntersectionObserver` tech to lazily render heavy animations only when scrolled into view, maximizing device battery life.
- **Mobile Optimized:** Fully responsive grid layouts and touch-friendly navigation that disables heavy cursors on mobile devices to prevent UX clutter.

---

## 🛠️ Technology Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (with custom HUD/Neon configuration)
- **3D Graphics:** Three.js (`three`)
- **Icons:** Lucide React
- **Deployment:** GitHub Pages (`gh-pages`)

---

## 🚀 Local Development Setup

To run the Vektor Dynamics interface on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/sampoornverma/vektor-dynamics.git
cd vektor-dynamics/frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The application will launch locally at `http://localhost:5173`.

---

## 📦 Deployment

This project is configured to auto-deploy to GitHub Pages. To push a new production build:

```bash
cd frontend
npm run deploy
```

---

<div align="center">
  <sub>Developed by <b>Vektor Dynamics Engineering</b></sub>
</div>
