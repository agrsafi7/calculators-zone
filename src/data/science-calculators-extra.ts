import { CalculatorConfig } from "@/components/CalculatorTemplate";

const rel = (exclude: string) => [
  { name: "Force Calculator", slug: "force-calculator", icon: "flask", category: "science" },
  { name: "pH Calculator", slug: "ph-calculator", icon: "flask", category: "science" },
  { name: "Ideal Gas Law", slug: "ideal-gas-law-calculator", icon: "flask", category: "science" },
].filter(c => c.slug !== exclude);

const mk = (slug: string, name: string, desc: string, meta: string, sub: string, inputs: CalculatorConfig["inputs"], calculate: CalculatorConfig["calculate"], formula: CalculatorConfig["formula"]): CalculatorConfig => ({
  slug, name, category: "Science", categorySlug: "science", description: desc, metaDescription: meta, icon: "flask", subcategory: sub,
  inputs, calculate, formula,
  howToUse: `Enter values to calculate using the ${name}.`,
  faqs: [{ question: `What does the ${name} do?`, answer: desc }],
  relatedCalcs: rel(slug),
});

export const scienceCalculatorsExtra: CalculatorConfig[] = [
  // ═══════════════════════════════════════════
  // PHYSICS
  // ═══════════════════════════════════════════
  mk("average-velocity-calculator", "Average Velocity Calculator", "Calculate average velocity from displacement and time.", "Free average velocity calculator.", "Physics",
    [{ id: "displacement", label: "Displacement (m)", type: "number", defaultValue: 100, step: 1 }, { id: "time", label: "Time (s)", type: "number", defaultValue: 10, step: 0.1 }],
    (v) => { if (v.time === 0) return [{ label: "Error", value: "Time cannot be zero" }]; const vel = v.displacement / v.time; return [{ label: "Average Velocity", value: `${vel.toFixed(2)} m/s`, highlight: true }, { label: "In km/h", value: `${(vel * 3.6).toFixed(2)} km/h` }]; },
    { expression: "v_avg = Δx / Δt", variables: ["Δx = displacement", "Δt = time interval"] }
  ),
  mk("final-velocity-calculator", "Final Velocity Calculator", "Calculate final velocity using v² = u² + 2as.", "Free final velocity calculator using kinematic equation.", "Physics",
    [{ id: "u", label: "Initial Velocity (m/s)", type: "number", defaultValue: 0, step: 0.1 }, { id: "a", label: "Acceleration (m/s²)", type: "number", defaultValue: 9.81, step: 0.01 }, { id: "s", label: "Displacement (m)", type: "number", defaultValue: 20, step: 0.1 }],
    (v) => { const v2 = v.u ** 2 + 2 * v.a * v.s; if (v2 < 0) return [{ label: "Error", value: "Negative v² — object stops before reaching displacement" }]; const vf = Math.sqrt(v2); return [{ label: "Final Velocity", value: `${vf.toFixed(2)} m/s`, highlight: true }, { label: "In km/h", value: `${(vf * 3.6).toFixed(2)} km/h` }]; },
    { expression: "v² = u² + 2as", variables: ["u = initial velocity", "a = acceleration", "s = displacement"] }
  ),
  mk("displacement-calculator", "Displacement Calculator", "Calculate displacement using s = ut + ½at².", "Free displacement calculator.", "Physics",
    [{ id: "u", label: "Initial Velocity (m/s)", type: "number", defaultValue: 5, step: 0.1 }, { id: "a", label: "Acceleration (m/s²)", type: "number", defaultValue: 2, step: 0.01 }, { id: "t", label: "Time (s)", type: "number", defaultValue: 10, step: 0.1 }],
    (v) => { const s = v.u * v.t + 0.5 * v.a * v.t ** 2; return [{ label: "Displacement", value: `${s.toFixed(2)} m`, highlight: true }, { label: "Final Velocity", value: `${(v.u + v.a * v.t).toFixed(2)} m/s` }]; },
    { expression: "s = ut + ½at²", variables: ["u = initial velocity", "a = acceleration", "t = time"] }
  ),
  mk("distance-time-calculator", "Distance and Time Calculator", "Calculate distance or time from speed.", "Free distance and time calculator.", "Physics",
    [{ id: "speed", label: "Speed (m/s)", type: "number", defaultValue: 15, step: 0.1 }, { id: "time", label: "Time (s)", type: "number", defaultValue: 60, step: 1 }],
    (v) => { const d = v.speed * v.time; return [{ label: "Distance", value: `${d.toFixed(2)} m`, highlight: true }, { label: "In km", value: `${(d / 1000).toFixed(3)} km` }]; },
    { expression: "d = v × t", variables: ["v = speed", "t = time", "d = distance"] }
  ),
  mk("newtons-second-law-calculator", "Newton's Second Law Calculator", "Calculate force, mass, or acceleration using F = ma.", "Free Newton's second law calculator.", "Physics",
    [{ id: "mass", label: "Mass (kg)", type: "number", defaultValue: 50, step: 0.1 }, { id: "acceleration", label: "Acceleration (m/s²)", type: "number", defaultValue: 3, step: 0.01 }],
    (v) => { const f = v.mass * v.acceleration; return [{ label: "Force", value: `${f.toFixed(2)} N`, highlight: true }, { label: "Weight (at g)", value: `${(v.mass * 9.81).toFixed(2)} N` }]; },
    { expression: "F = m × a", variables: ["F = force (N)", "m = mass (kg)", "a = acceleration (m/s²)"] }
  ),
  mk("momentum-calculator", "Momentum Calculator", "Calculate linear momentum p = mv.", "Free momentum calculator.", "Physics",
    [{ id: "mass", label: "Mass (kg)", type: "number", defaultValue: 10, step: 0.1 }, { id: "velocity", label: "Velocity (m/s)", type: "number", defaultValue: 5, step: 0.1 }],
    (v) => { const p = v.mass * v.velocity; return [{ label: "Momentum", value: `${p.toFixed(2)} kg·m/s`, highlight: true }, { label: "KE", value: `${(0.5 * v.mass * v.velocity ** 2).toFixed(2)} J` }]; },
    { expression: "p = m × v", variables: ["p = momentum", "m = mass", "v = velocity"] }
  ),
  mk("impulse-calculator", "Impulse Calculator", "Calculate impulse J = FΔt or change in momentum.", "Free impulse calculator.", "Physics",
    [{ id: "force", label: "Force (N)", type: "number", defaultValue: 100, step: 1 }, { id: "time", label: "Time (s)", type: "number", defaultValue: 0.5, step: 0.01 }],
    (v) => { const j = v.force * v.time; return [{ label: "Impulse", value: `${j.toFixed(2)} N·s`, highlight: true }, { label: "Change in Momentum", value: `${j.toFixed(2)} kg·m/s` }]; },
    { expression: "J = F × Δt = Δp", variables: ["J = impulse", "F = force", "Δt = time"] }
  ),
  mk("work-calculator", "Work Calculator", "Calculate work done W = Fd cos(θ).", "Free work calculator. W = Fd cos θ.", "Physics",
    [{ id: "force", label: "Force (N)", type: "number", defaultValue: 50, step: 0.1 }, { id: "distance", label: "Distance (m)", type: "number", defaultValue: 10, step: 0.1 }, { id: "angle", label: "Angle (°)", type: "number", defaultValue: 0, min: 0, max: 180 }],
    (v) => { const w = v.force * v.distance * Math.cos(v.angle * Math.PI / 180); return [{ label: "Work Done", value: `${w.toFixed(2)} J`, highlight: true }, { label: "In kJ", value: `${(w / 1000).toFixed(4)} kJ` }]; },
    { expression: "W = F × d × cos(θ)", variables: ["W = work (Joules)", "θ = angle between force and displacement"] }
  ),
  mk("power-physics-calculator", "Power Physics Calculator", "Calculate mechanical power P = W/t.", "Free power calculator for physics.", "Physics",
    [{ id: "work", label: "Work (J)", type: "number", defaultValue: 1000, step: 1 }, { id: "time", label: "Time (s)", type: "number", defaultValue: 5, step: 0.1 }],
    (v) => { if (v.time === 0) return [{ label: "Error", value: "Time cannot be zero" }]; const p = v.work / v.time; return [{ label: "Power", value: `${p.toFixed(2)} W`, highlight: true }, { label: "In kW", value: `${(p / 1000).toFixed(4)} kW` }, { label: "In hp", value: `${(p / 745.7).toFixed(4)} hp` }]; },
    { expression: "P = W / t", variables: ["P = power (Watts)", "W = work (Joules)", "t = time (s)"] }
  ),
  mk("elastic-potential-energy-calculator", "Elastic Potential Energy Calculator", "Calculate elastic PE using ½kx².", "Free elastic potential energy calculator.", "Physics",
    [{ id: "k", label: "Spring Constant (N/m)", type: "number", defaultValue: 200, step: 1 }, { id: "x", label: "Extension (m)", type: "number", defaultValue: 0.1, step: 0.01 }],
    (v) => { const pe = 0.5 * v.k * v.x ** 2; return [{ label: "Elastic PE", value: `${pe.toFixed(4)} J`, highlight: true }, { label: "Force at Extension", value: `${(v.k * v.x).toFixed(2)} N` }]; },
    { expression: "PE = ½kx²", variables: ["k = spring constant", "x = extension/compression"] }
  ),
  mk("gravity-acceleration-calculator", "Gravity Acceleration Calculator", "Calculate gravitational acceleration g = GM/r².", "Free gravity acceleration calculator.", "Physics",
    [{ id: "mass", label: "Body Mass (×10²⁴ kg)", type: "number", defaultValue: 5.972, step: 0.001 }, { id: "radius", label: "Body Radius (km)", type: "number", defaultValue: 6371, step: 1 }],
    (v) => { const G = 6.674e-11; const m = v.mass * 1e24; const r = v.radius * 1000; if (r === 0) return [{ label: "Error", value: "Radius cannot be zero" }]; const g = G * m / (r ** 2); return [{ label: "Surface Gravity", value: `${g.toFixed(4)} m/s²`, highlight: true }, { label: "Relative to Earth", value: `${(g / 9.81).toFixed(4)} g` }]; },
    { expression: "g = GM/r²", variables: ["G = 6.674×10⁻¹¹", "Earth g ≈ 9.81 m/s²"] }
  ),
  mk("projectile-motion-calculator", "Projectile Motion Calculator", "Calculate range, max height, and time of flight for projectile motion.", "Free projectile motion calculator.", "Physics",
    [{ id: "v0", label: "Initial Velocity (m/s)", type: "number", defaultValue: 30, step: 0.1 }, { id: "angle", label: "Launch Angle (°)", type: "number", defaultValue: 45, min: 0, max: 90 }],
    (v) => { const rad = v.angle * Math.PI / 180; const g = 9.81; const tof = 2 * v.v0 * Math.sin(rad) / g; const range = v.v0 ** 2 * Math.sin(2 * rad) / g; const maxH = (v.v0 * Math.sin(rad)) ** 2 / (2 * g); return [{ label: "Range", value: `${range.toFixed(2)} m`, highlight: true }, { label: "Max Height", value: `${maxH.toFixed(2)} m` }, { label: "Time of Flight", value: `${tof.toFixed(2)} s` }]; },
    { expression: "R = v₀²sin(2θ)/g", variables: ["Max height at θ = 90°", "Max range at θ = 45°"] }
  ),
  mk("free-fall-calculator", "Free Fall Calculator", "Calculate velocity and distance for free-falling objects.", "Free fall calculator. No air resistance.", "Physics",
    [{ id: "height", label: "Height (m)", type: "number", defaultValue: 50, step: 1 }, { id: "g", label: "Gravity (m/s²)", type: "number", defaultValue: 9.81, step: 0.01 }],
    (v) => { const t = Math.sqrt(2 * v.height / v.g); const vf = v.g * t; return [{ label: "Time to Fall", value: `${t.toFixed(3)} s`, highlight: true }, { label: "Impact Velocity", value: `${vf.toFixed(2)} m/s` }, { label: "In km/h", value: `${(vf * 3.6).toFixed(1)} km/h` }]; },
    { expression: "t = √(2h/g); v = gt", variables: ["Assumes no air resistance"] }
  ),
  mk("centripetal-force-calculator", "Centripetal Force Calculator", "Calculate centripetal force F = mv²/r.", "Free centripetal force calculator.", "Physics",
    [{ id: "mass", label: "Mass (kg)", type: "number", defaultValue: 5, step: 0.1 }, { id: "velocity", label: "Velocity (m/s)", type: "number", defaultValue: 10, step: 0.1 }, { id: "radius", label: "Radius (m)", type: "number", defaultValue: 2, step: 0.1 }],
    (v) => { if (v.radius === 0) return [{ label: "Error", value: "Radius cannot be zero" }]; const f = v.mass * v.velocity ** 2 / v.radius; const a = v.velocity ** 2 / v.radius; return [{ label: "Centripetal Force", value: `${f.toFixed(2)} N`, highlight: true }, { label: "Centripetal Acceleration", value: `${a.toFixed(2)} m/s²` }]; },
    { expression: "F = mv²/r", variables: ["F = centripetal force", "r = radius of circular path"] }
  ),
  mk("centripetal-acceleration-calculator", "Centripetal Acceleration Calculator", "Calculate centripetal acceleration a = v²/r.", "Free centripetal acceleration calculator.", "Physics",
    [{ id: "velocity", label: "Velocity (m/s)", type: "number", defaultValue: 10, step: 0.1 }, { id: "radius", label: "Radius (m)", type: "number", defaultValue: 5, step: 0.1 }],
    (v) => { if (v.radius === 0) return [{ label: "Error", value: "Radius cannot be zero" }]; const a = v.velocity ** 2 / v.radius; return [{ label: "Centripetal Acceleration", value: `${a.toFixed(2)} m/s²`, highlight: true }, { label: "In g", value: `${(a / 9.81).toFixed(3)} g` }]; },
    { expression: "a = v²/r", variables: ["a = centripetal acceleration", "v = tangential velocity", "r = radius"] }
  ),
  mk("angular-momentum-calculator", "Angular Momentum Calculator", "Calculate angular momentum L = Iω.", "Free angular momentum calculator.", "Physics",
    [{ id: "inertia", label: "Moment of Inertia (kg·m²)", type: "number", defaultValue: 2, step: 0.1 }, { id: "omega", label: "Angular Velocity (rad/s)", type: "number", defaultValue: 10, step: 0.1 }],
    (v) => { const l = v.inertia * v.omega; return [{ label: "Angular Momentum", value: `${l.toFixed(2)} kg·m²/s`, highlight: true }, { label: "Rotational KE", value: `${(0.5 * v.inertia * v.omega ** 2).toFixed(2)} J` }]; },
    { expression: "L = Iω", variables: ["I = moment of inertia", "ω = angular velocity"] }
  ),
  mk("rotational-kinetic-energy-calculator", "Rotational Kinetic Energy Calculator", "Calculate rotational KE = ½Iω².", "Free rotational kinetic energy calculator.", "Physics",
    [{ id: "inertia", label: "Moment of Inertia (kg·m²)", type: "number", defaultValue: 5, step: 0.1 }, { id: "omega", label: "Angular Velocity (rad/s)", type: "number", defaultValue: 10, step: 0.1 }],
    (v) => { const ke = 0.5 * v.inertia * v.omega ** 2; return [{ label: "Rotational KE", value: `${ke.toFixed(2)} J`, highlight: true }, { label: "In kJ", value: `${(ke / 1000).toFixed(4)} kJ` }]; },
    { expression: "KE_rot = ½Iω²", variables: ["I = moment of inertia", "ω = angular velocity (rad/s)"] }
  ),
  mk("rotational-speed-calculator", "Rotational Speed Calculator", "Convert between RPM and angular velocity.", "Free rotational speed calculator.", "Physics",
    [{ id: "rpm", label: "RPM", type: "number", defaultValue: 3000, step: 10 }],
    (v) => { const omega = v.rpm * 2 * Math.PI / 60; const freq = v.rpm / 60; return [{ label: "Angular Velocity", value: `${omega.toFixed(2)} rad/s`, highlight: true }, { label: "Frequency", value: `${freq.toFixed(2)} Hz` }, { label: "Period", value: `${(1 / freq).toFixed(4)} s` }]; },
    { expression: "ω = 2π × RPM / 60", variables: ["ω = angular velocity", "f = RPM/60"] }
  ),
  mk("torque-physics-calculator", "Torque Physics Calculator", "Calculate torque τ = rF sin(θ) with detailed analysis.", "Free torque physics calculator.", "Physics",
    [{ id: "r", label: "Lever Arm (m)", type: "number", defaultValue: 0.5, step: 0.01 }, { id: "force", label: "Force (N)", type: "number", defaultValue: 100, step: 1 }, { id: "angle", label: "Angle (°)", type: "number", defaultValue: 90, min: 0, max: 180 }],
    (v) => { const rad = v.angle * Math.PI / 180; const tau = v.r * v.force * Math.sin(rad); return [{ label: "Torque", value: `${tau.toFixed(2)} N·m`, highlight: true }, { label: "In lb·ft", value: `${(tau * 0.7376).toFixed(2)} lb·ft` }]; },
    { expression: "τ = r × F × sin(θ)", variables: ["r = lever arm distance", "F = applied force", "θ = angle"] }
  ),
  mk("wave-speed-calculator", "Wave Speed Calculator", "Calculate wave speed v = fλ.", "Free wave speed calculator.", "Physics",
    [{ id: "freq", label: "Frequency (Hz)", type: "number", defaultValue: 440, step: 1 }, { id: "wavelength", label: "Wavelength (m)", type: "number", defaultValue: 0.78, step: 0.01 }],
    (v) => { const speed = v.freq * v.wavelength; return [{ label: "Wave Speed", value: `${speed.toFixed(2)} m/s`, highlight: true }, { label: "Period", value: `${(1 / v.freq).toFixed(6)} s` }]; },
    { expression: "v = f × λ", variables: ["f = frequency", "λ = wavelength"] }
  ),
  mk("sound-intensity-calculator", "Sound Intensity Calculator", "Calculate sound intensity level in decibels.", "Free sound intensity calculator.", "Physics",
    [{ id: "intensity", label: "Intensity (W/m²)", type: "number", defaultValue: 0.001, step: 0.0001 }],
    (v) => { if (v.intensity <= 0) return [{ label: "Error", value: "Intensity must be > 0" }]; const db = 10 * Math.log10(v.intensity / 1e-12); return [{ label: "Sound Level", value: `${db.toFixed(1)} dB`, highlight: true }, { label: "Reference", value: "I₀ = 10⁻¹² W/m²" }]; },
    { expression: "β = 10 log₁₀(I/I₀)", variables: ["I₀ = 10⁻¹² W/m² (threshold of hearing)"] }
  ),
  mk("wave-energy-calculator", "Wave Energy Calculator", "Calculate energy of a wave from amplitude and frequency.", "Free wave energy calculator.", "Physics",
    [{ id: "amplitude", label: "Amplitude (m)", type: "number", defaultValue: 0.5, step: 0.01 }, { id: "freq", label: "Frequency (Hz)", type: "number", defaultValue: 2, step: 0.1 }, { id: "density", label: "Water Density (kg/m³)", type: "number", defaultValue: 1025, step: 1 }],
    (v) => { const e = 0.5 * v.density * 9.81 * v.amplitude ** 2; return [{ label: "Energy Density", value: `${e.toFixed(2)} J/m²`, highlight: true }, { label: "Power per meter", value: `${(e * v.freq * v.amplitude).toFixed(2)} W/m` }]; },
    { expression: "E ≈ ½ρgA²", variables: ["ρ = fluid density", "A = amplitude", "g = 9.81 m/s²"] }
  ),
  mk("mechanical-advantage-calculator", "Mechanical Advantage Calculator", "Calculate mechanical advantage of a simple machine.", "Free mechanical advantage calculator.", "Physics",
    [{ id: "outputForce", label: "Output Force (N)", type: "number", defaultValue: 500, step: 1 }, { id: "inputForce", label: "Input Force (N)", type: "number", defaultValue: 100, step: 1 }],
    (v) => { if (v.inputForce === 0) return [{ label: "Error", value: "Input force cannot be zero" }]; const ma = v.outputForce / v.inputForce; return [{ label: "Mechanical Advantage", value: `${ma.toFixed(2)}`, highlight: true }, { label: "Efficiency Note", value: "Ideal (no friction)" }]; },
    { expression: "MA = F_out / F_in", variables: ["MA > 1: force multiplier", "MA < 1: speed multiplier"] }
  ),
  mk("simple-machine-calculator", "Simple Machine Calculator", "Calculate effort needed for lever, pulley, or inclined plane.", "Free simple machine calculator.", "Physics",
    [{ id: "load", label: "Load (N)", type: "number", defaultValue: 500, step: 1 }, { id: "pulleys", label: "Number of Pulleys", type: "number", defaultValue: 4, min: 1 }],
    (v) => { const effort = v.load / v.pulleys; return [{ label: "Effort Needed", value: `${effort.toFixed(2)} N`, highlight: true }, { label: "Mechanical Advantage", value: `${v.pulleys}` }, { label: "Rope to Pull", value: `${v.pulleys}× the distance` }]; },
    { expression: "Effort = Load / n (pulleys)", variables: ["n = number of supporting ropes"] }
  ),
  mk("spring-constant-calculator", "Spring Constant Calculator", "Calculate spring constant k = F/x.", "Free spring constant calculator.", "Physics",
    [{ id: "force", label: "Force (N)", type: "number", defaultValue: 10, step: 0.1 }, { id: "extension", label: "Extension (m)", type: "number", defaultValue: 0.05, step: 0.001 }],
    (v) => { if (v.extension === 0) return [{ label: "Error", value: "Extension cannot be zero" }]; const k = v.force / v.extension; return [{ label: "Spring Constant", value: `${k.toFixed(2)} N/m`, highlight: true }, { label: "PE Stored", value: `${(0.5 * k * v.extension ** 2).toFixed(4)} J` }]; },
    { expression: "k = F / x", variables: ["k = spring constant (N/m)", "Hooke's law: F = kx"] }
  ),
  mk("hookes-law-calculator", "Hooke's Law Calculator", "Calculate spring force using F = kx.", "Free Hooke's law calculator.", "Physics",
    [{ id: "k", label: "Spring Constant (N/m)", type: "number", defaultValue: 200, step: 1 }, { id: "x", label: "Displacement (m)", type: "number", defaultValue: 0.1, step: 0.01 }],
    (v) => { const f = v.k * v.x; const pe = 0.5 * v.k * v.x ** 2; return [{ label: "Force", value: `${f.toFixed(2)} N`, highlight: true }, { label: "Elastic PE", value: `${pe.toFixed(4)} J` }]; },
    { expression: "F = k × x", variables: ["k = spring constant", "x = displacement from equilibrium"] }
  ),
  mk("pendulum-period-calculator", "Pendulum Period Calculator", "Calculate the period of a simple pendulum.", "Free pendulum period calculator.", "Physics",
    [{ id: "length", label: "Length (m)", type: "number", defaultValue: 1, step: 0.01 }, { id: "g", label: "Gravity (m/s²)", type: "number", defaultValue: 9.81, step: 0.01 }],
    (v) => { if (v.g === 0) return [{ label: "Error", value: "Gravity cannot be zero" }]; const T = 2 * Math.PI * Math.sqrt(v.length / v.g); return [{ label: "Period", value: `${T.toFixed(4)} s`, highlight: true }, { label: "Frequency", value: `${(1 / T).toFixed(4)} Hz` }]; },
    { expression: "T = 2π√(L/g)", variables: ["L = pendulum length", "g = gravitational acceleration"] }
  ),

  // ═══════════════════════════════════════════
  // CHEMISTRY
  // ═══════════════════════════════════════════
  mk("poh-calculator", "pOH Calculator", "Calculate pOH from hydroxide ion concentration.", "Free pOH calculator.", "Chemistry",
    [{ id: "oh", label: "[OH⁻] (mol/L)", type: "number", defaultValue: 0.001, step: 0.0001 }],
    (v) => { if (v.oh <= 0) return [{ label: "Error", value: "[OH⁻] must be > 0" }]; const poh = -Math.log10(v.oh); const ph = 14 - poh; return [{ label: "pOH", value: poh.toFixed(4), highlight: true }, { label: "pH", value: ph.toFixed(4) }, { label: "Nature", value: ph < 7 ? "Acidic" : ph > 7 ? "Basic" : "Neutral" }]; },
    { expression: "pOH = −log₁₀[OH⁻]; pH + pOH = 14", variables: ["At 25°C"] }
  ),
  mk("acid-base-calculator", "Acid Base Calculator", "Calculate Ka, Kb, pH of weak acid/base solutions.", "Free acid base equilibrium calculator.", "Chemistry",
    [{ id: "concentration", label: "Concentration (M)", type: "number", defaultValue: 0.1, step: 0.01 }, { id: "ka", label: "Ka (×10⁻⁵)", type: "number", defaultValue: 1.8, step: 0.1 }],
    (v) => { const ka = v.ka * 1e-5; const h = Math.sqrt(ka * v.concentration); const ph = -Math.log10(h); return [{ label: "pH", value: ph.toFixed(4), highlight: true }, { label: "[H⁺]", value: h.toExponential(3) }, { label: "% Dissociation", value: `${((h / v.concentration) * 100).toFixed(2)}%` }]; },
    { expression: "[H⁺] ≈ √(Ka × C)", variables: ["Weak acid approximation", "Ka = acid dissociation constant"] }
  ),
  mk("buffer-solution-calculator", "Buffer Solution Calculator", "Calculate buffer pH using Henderson-Hasselbalch equation.", "Free buffer solution calculator.", "Chemistry",
    [{ id: "pka", label: "pKa", type: "number", defaultValue: 4.76, step: 0.01 }, { id: "acid", label: "[Acid] (M)", type: "number", defaultValue: 0.1, step: 0.01 }, { id: "base", label: "[Conjugate Base] (M)", type: "number", defaultValue: 0.1, step: 0.01 }],
    (v) => { if (v.acid === 0) return [{ label: "Error", value: "Acid concentration cannot be zero" }]; const ph = v.pka + Math.log10(v.base / v.acid); return [{ label: "Buffer pH", value: ph.toFixed(4), highlight: true }, { label: "Ratio [A⁻]/[HA]", value: `${(v.base / v.acid).toFixed(3)}` }]; },
    { expression: "pH = pKa + log([A⁻]/[HA])", variables: ["Henderson-Hasselbalch equation"] }
  ),
  mk("limiting-reagent-calculator", "Limiting Reagent Calculator", "Determine the limiting reagent in a chemical reaction.", "Free limiting reagent calculator.", "Chemistry",
    [{ id: "molesA", label: "Moles of Reactant A", type: "number", defaultValue: 2, step: 0.1 }, { id: "molesB", label: "Moles of Reactant B", type: "number", defaultValue: 3, step: 0.1 }, { id: "ratioA", label: "Stoich Coeff A", type: "number", defaultValue: 1, min: 1 }, { id: "ratioB", label: "Stoich Coeff B", type: "number", defaultValue: 2, min: 1 }],
    (v) => { const eqA = v.molesA / v.ratioA; const eqB = v.molesB / v.ratioB; const limiting = eqA <= eqB ? "Reactant A" : "Reactant B"; const excess = eqA <= eqB ? (v.molesB - eqA * v.ratioB).toFixed(3) : (v.molesA - eqB * v.ratioA).toFixed(3); return [{ label: "Limiting Reagent", value: limiting, highlight: true }, { label: "Excess Remaining", value: `${excess} mol` }]; },
    { expression: "Compare moles/coefficient for each reactant", variables: ["Smaller ratio = limiting reagent"] }
  ),
  mk("percent-yield-calculator", "Percent Yield Calculator", "Calculate percent yield of a reaction.", "Free percent yield calculator.", "Chemistry",
    [{ id: "actual", label: "Actual Yield (g)", type: "number", defaultValue: 8.5, step: 0.1 }, { id: "theoretical", label: "Theoretical Yield (g)", type: "number", defaultValue: 10, step: 0.1 }],
    (v) => { if (v.theoretical === 0) return [{ label: "Error", value: "Theoretical yield cannot be zero" }]; const pct = (v.actual / v.theoretical) * 100; return [{ label: "Percent Yield", value: `${pct.toFixed(2)}%`, highlight: true }, { label: "Lost", value: `${(v.theoretical - v.actual).toFixed(2)} g` }]; },
    { expression: "% Yield = (Actual / Theoretical) × 100", variables: ["Ideal yield = 100%"] }
  ),
  mk("reaction-rate-calculator", "Reaction Rate Calculator", "Calculate rate of reaction from concentration change over time.", "Free reaction rate calculator.", "Chemistry",
    [{ id: "c1", label: "Initial Conc (M)", type: "number", defaultValue: 1, step: 0.01 }, { id: "c2", label: "Final Conc (M)", type: "number", defaultValue: 0.5, step: 0.01 }, { id: "time", label: "Time (s)", type: "number", defaultValue: 60, step: 1 }],
    (v) => { if (v.time === 0) return [{ label: "Error", value: "Time cannot be zero" }]; const rate = Math.abs(v.c2 - v.c1) / v.time; return [{ label: "Avg Reaction Rate", value: `${rate.toExponential(3)} M/s`, highlight: true }, { label: "Conc Change", value: `${Math.abs(v.c2 - v.c1).toFixed(4)} M` }]; },
    { expression: "Rate = |ΔC| / Δt", variables: ["ΔC = change in concentration"] }
  ),
  mk("chemical-equilibrium-calculator", "Chemical Equilibrium Calculator", "Calculate equilibrium constant from concentrations.", "Free chemical equilibrium calculator.", "Chemistry",
    [{ id: "products", label: "[Products] (M)", type: "number", defaultValue: 0.5, step: 0.01 }, { id: "reactants", label: "[Reactants] (M)", type: "number", defaultValue: 0.1, step: 0.01 }],
    (v) => { if (v.reactants === 0) return [{ label: "Error", value: "Reactant concentration cannot be zero" }]; const keq = v.products / v.reactants; return [{ label: "Keq", value: keq.toFixed(4), highlight: true }, { label: "Favors", value: keq > 1 ? "Products" : keq < 1 ? "Reactants" : "Neither" }]; },
    { expression: "Keq = [Products] / [Reactants]", variables: ["Keq > 1: products favored"] }
  ),
  mk("equilibrium-constant-calculator", "Equilibrium Constant Calculator", "Calculate Kc from product and reactant concentrations.", "Free Kc calculator.", "Chemistry",
    [{ id: "pA", label: "[Product A] (M)", type: "number", defaultValue: 0.3, step: 0.01 }, { id: "pB", label: "[Product B] (M)", type: "number", defaultValue: 0.2, step: 0.01 }, { id: "rA", label: "[Reactant A] (M)", type: "number", defaultValue: 0.5, step: 0.01 }, { id: "rB", label: "[Reactant B] (M)", type: "number", defaultValue: 0.4, step: 0.01 }],
    (v) => { if (v.rA * v.rB === 0) return [{ label: "Error", value: "Reactant concentrations cannot be zero" }]; const kc = (v.pA * v.pB) / (v.rA * v.rB); return [{ label: "Kc", value: kc.toFixed(4), highlight: true }, { label: "Direction", value: kc > 1 ? "Products favored" : "Reactants favored" }]; },
    { expression: "Kc = [C][D] / [A][B]", variables: ["For aA + bB ⇌ cC + dD"] }
  ),
  mk("boyles-law-calculator", "Boyle's Law Calculator", "Calculate pressure or volume using P₁V₁ = P₂V₂.", "Free Boyle's law calculator.", "Chemistry",
    [{ id: "p1", label: "P₁ (atm)", type: "number", defaultValue: 1, step: 0.01 }, { id: "v1", label: "V₁ (L)", type: "number", defaultValue: 10, step: 0.1 }, { id: "p2", label: "P₂ (atm)", type: "number", defaultValue: 2, step: 0.01 }],
    (v) => { if (v.p2 === 0) return [{ label: "Error", value: "Pressure cannot be zero" }]; const v2 = (v.p1 * v.v1) / v.p2; return [{ label: "V₂", value: `${v2.toFixed(3)} L`, highlight: true }, { label: "Volume Change", value: `${(v2 - v.v1).toFixed(3)} L` }]; },
    { expression: "P₁V₁ = P₂V₂", variables: ["At constant temperature", "Inverse relationship"] }
  ),
  mk("charles-law-calculator", "Charles Law Calculator", "Calculate volume or temperature using V₁/T₁ = V₂/T₂.", "Free Charles law calculator.", "Chemistry",
    [{ id: "v1", label: "V₁ (L)", type: "number", defaultValue: 5, step: 0.1 }, { id: "t1", label: "T₁ (K)", type: "number", defaultValue: 300, step: 1 }, { id: "t2", label: "T₂ (K)", type: "number", defaultValue: 400, step: 1 }],
    (v) => { if (v.t1 === 0) return [{ label: "Error", value: "Temperature cannot be zero" }]; const v2 = v.v1 * v.t2 / v.t1; return [{ label: "V₂", value: `${v2.toFixed(3)} L`, highlight: true }, { label: "Volume Change", value: `${(v2 - v.v1).toFixed(3)} L` }]; },
    { expression: "V₁/T₁ = V₂/T₂", variables: ["At constant pressure", "T must be in Kelvin"] }
  ),
  mk("avogadro-law-calculator", "Avogadro Law Calculator", "Calculate volume or moles using V₁/n₁ = V₂/n₂.", "Free Avogadro's law calculator.", "Chemistry",
    [{ id: "v1", label: "V₁ (L)", type: "number", defaultValue: 22.4, step: 0.1 }, { id: "n1", label: "n₁ (mol)", type: "number", defaultValue: 1, step: 0.1 }, { id: "n2", label: "n₂ (mol)", type: "number", defaultValue: 2, step: 0.1 }],
    (v) => { if (v.n1 === 0) return [{ label: "Error", value: "Moles cannot be zero" }]; const v2 = v.v1 * v.n2 / v.n1; return [{ label: "V₂", value: `${v2.toFixed(2)} L`, highlight: true }, { label: "Volume per mole", value: `${(v2 / v.n2).toFixed(2)} L/mol` }]; },
    { expression: "V₁/n₁ = V₂/n₂", variables: ["At constant T and P", "At STP: 22.4 L/mol"] }
  ),
  mk("combined-gas-law-calculator", "Combined Gas Law Calculator", "Calculate using P₁V₁/T₁ = P₂V₂/T₂.", "Free combined gas law calculator.", "Chemistry",
    [{ id: "p1", label: "P₁ (atm)", type: "number", defaultValue: 1, step: 0.01 }, { id: "v1", label: "V₁ (L)", type: "number", defaultValue: 10, step: 0.1 }, { id: "t1", label: "T₁ (K)", type: "number", defaultValue: 300, step: 1 }, { id: "p2", label: "P₂ (atm)", type: "number", defaultValue: 2, step: 0.01 }, { id: "t2", label: "T₂ (K)", type: "number", defaultValue: 350, step: 1 }],
    (v) => { if (v.t1 === 0 || v.p2 === 0) return [{ label: "Error", value: "Values cannot be zero" }]; const v2 = (v.p1 * v.v1 * v.t2) / (v.t1 * v.p2); return [{ label: "V₂", value: `${v2.toFixed(3)} L`, highlight: true }]; },
    { expression: "P₁V₁/T₁ = P₂V₂/T₂", variables: ["Combines Boyle's and Charles's laws"] }
  ),
  mk("gas-density-calculator", "Gas Density Calculator", "Calculate gas density using ρ = PM/RT.", "Free gas density calculator.", "Chemistry",
    [{ id: "pressure", label: "Pressure (atm)", type: "number", defaultValue: 1, step: 0.01 }, { id: "molarMass", label: "Molar Mass (g/mol)", type: "number", defaultValue: 28.97, step: 0.01 }, { id: "temp", label: "Temperature (K)", type: "number", defaultValue: 273.15, step: 1 }],
    (v) => { if (v.temp === 0) return [{ label: "Error", value: "Temperature cannot be zero" }]; const R = 0.08206; const density = (v.pressure * v.molarMass) / (R * v.temp); return [{ label: "Gas Density", value: `${density.toFixed(4)} g/L`, highlight: true }, { label: "In kg/m³", value: `${density.toFixed(4)} kg/m³` }]; },
    { expression: "ρ = PM / RT", variables: ["R = 0.08206 L·atm/(mol·K)"] }
  ),
  mk("partial-pressure-calculator", "Partial Pressure Calculator", "Calculate partial pressure using Dalton's law.", "Free partial pressure calculator.", "Chemistry",
    [{ id: "totalP", label: "Total Pressure (atm)", type: "number", defaultValue: 1, step: 0.01 }, { id: "moleFraction", label: "Mole Fraction", type: "number", defaultValue: 0.21, step: 0.01 }],
    (v) => { const pp = v.totalP * v.moleFraction; return [{ label: "Partial Pressure", value: `${pp.toFixed(4)} atm`, highlight: true }, { label: "In kPa", value: `${(pp * 101.325).toFixed(2)} kPa` }]; },
    { expression: "Pᵢ = xᵢ × P_total", variables: ["xᵢ = mole fraction", "Dalton's Law"] }
  ),
  mk("solution-concentration-calculator", "Solution Concentration Calculator", "Calculate molarity from moles and volume.", "Free molarity calculator.", "Chemistry",
    [{ id: "moles", label: "Moles of Solute", type: "number", defaultValue: 0.5, step: 0.01 }, { id: "volume", label: "Volume (L)", type: "number", defaultValue: 1, step: 0.01 }],
    (v) => { if (v.volume === 0) return [{ label: "Error", value: "Volume cannot be zero" }]; const m = v.moles / v.volume; return [{ label: "Molarity", value: `${m.toFixed(4)} M`, highlight: true }, { label: "In mmol/L", value: `${(m * 1000).toFixed(2)} mM` }]; },
    { expression: "M = n / V", variables: ["n = moles of solute", "V = volume in liters"] }
  ),
  mk("mass-percent-calculator", "Mass Percent Calculator", "Calculate mass percent of a solute in solution.", "Free mass percent calculator.", "Chemistry",
    [{ id: "soluteMass", label: "Solute Mass (g)", type: "number", defaultValue: 10, step: 0.1 }, { id: "solutionMass", label: "Solution Mass (g)", type: "number", defaultValue: 100, step: 1 }],
    (v) => { if (v.solutionMass === 0) return [{ label: "Error", value: "Solution mass cannot be zero" }]; const pct = (v.soluteMass / v.solutionMass) * 100; return [{ label: "Mass Percent", value: `${pct.toFixed(2)}%`, highlight: true }, { label: "Solvent Mass", value: `${(v.solutionMass - v.soluteMass).toFixed(2)} g` }]; },
    { expression: "Mass % = (solute mass / solution mass) × 100", variables: ["Solution = solute + solvent"] }
  ),
  mk("mole-fraction-calculator", "Mole Fraction Calculator", "Calculate mole fraction of components.", "Free mole fraction calculator.", "Chemistry",
    [{ id: "molesA", label: "Moles of Component A", type: "number", defaultValue: 2, step: 0.1 }, { id: "molesB", label: "Moles of Component B", type: "number", defaultValue: 8, step: 0.1 }],
    (v) => { const total = v.molesA + v.molesB; if (total === 0) return [{ label: "Error", value: "Total moles cannot be zero" }]; return [{ label: "Mole Fraction A", value: (v.molesA / total).toFixed(4), highlight: true }, { label: "Mole Fraction B", value: (v.molesB / total).toFixed(4) }]; },
    { expression: "xₐ = nₐ / (nₐ + n_b)", variables: ["Sum of all mole fractions = 1"] }
  ),
  mk("normality-calculator", "Normality Calculator", "Calculate normality from equivalents and volume.", "Free normality calculator.", "Chemistry",
    [{ id: "equivalents", label: "Gram Equivalents", type: "number", defaultValue: 0.5, step: 0.01 }, { id: "volume", label: "Volume (L)", type: "number", defaultValue: 1, step: 0.01 }],
    (v) => { if (v.volume === 0) return [{ label: "Error", value: "Volume cannot be zero" }]; const n = v.equivalents / v.volume; return [{ label: "Normality", value: `${n.toFixed(4)} N`, highlight: true }]; },
    { expression: "N = equivalents / V", variables: ["N = normality", "Equivalents depend on reaction type"] }
  ),
  mk("equivalent-weight-calculator", "Equivalent Weight Calculator", "Calculate equivalent weight from molar mass.", "Free equivalent weight calculator.", "Chemistry",
    [{ id: "molarMass", label: "Molar Mass (g/mol)", type: "number", defaultValue: 98, step: 0.1 }, { id: "nFactor", label: "n-factor", type: "number", defaultValue: 2, min: 1 }],
    (v) => { const ew = v.molarMass / v.nFactor; return [{ label: "Equivalent Weight", value: `${ew.toFixed(2)} g/eq`, highlight: true }]; },
    { expression: "Eq. Wt = Molar Mass / n-factor", variables: ["n-factor: H⁺ or OH⁻ or electrons transferred"] }
  ),
  mk("empirical-formula-calculator", "Empirical Formula Calculator", "Determine empirical formula from mass percentages.", "Free empirical formula calculator.", "Chemistry",
    [{ id: "c", label: "% Carbon", type: "number", defaultValue: 40, step: 0.1 }, { id: "h", label: "% Hydrogen", type: "number", defaultValue: 6.7, step: 0.1 }, { id: "o", label: "% Oxygen", type: "number", defaultValue: 53.3, step: 0.1 }],
    (v) => { const mc = v.c / 12.011; const mh = v.h / 1.008; const mo = v.o / 15.999; const min = Math.min(mc, mh, mo) || 1; return [{ label: "C ratio", value: `${(mc / min).toFixed(1)}`, highlight: true }, { label: "H ratio", value: `${(mh / min).toFixed(1)}` }, { label: "O ratio", value: `${(mo / min).toFixed(1)}` }]; },
    { expression: "Divide mass% by atomic mass, then by smallest ratio", variables: ["Round ratios to nearest whole number"] }
  ),
  mk("molecular-formula-calculator", "Molecular Formula Calculator", "Find molecular formula from empirical formula and molar mass.", "Free molecular formula calculator.", "Chemistry",
    [{ id: "empiricalMass", label: "Empirical Formula Mass (g/mol)", type: "number", defaultValue: 30, step: 0.1 }, { id: "molarMass", label: "Molar Mass (g/mol)", type: "number", defaultValue: 180, step: 0.1 }],
    (v) => { if (v.empiricalMass === 0) return [{ label: "Error", value: "Empirical mass cannot be zero" }]; const n = Math.round(v.molarMass / v.empiricalMass); return [{ label: "Multiplier", value: `${n}`, highlight: true }, { label: "Molecular = Empirical × n", value: `n = ${n}` }]; },
    { expression: "n = Molar Mass / Empirical Mass", variables: ["Molecular formula = n × empirical formula"] }
  ),
  mk("reaction-enthalpy-calculator", "Reaction Enthalpy Calculator", "Calculate reaction enthalpy ΔH from bond energies.", "Free reaction enthalpy calculator.", "Chemistry",
    [{ id: "bondsBreaking", label: "Energy to Break Bonds (kJ)", type: "number", defaultValue: 800, step: 1 }, { id: "bondsForming", label: "Energy from Forming Bonds (kJ)", type: "number", defaultValue: 1000, step: 1 }],
    (v) => { const dh = v.bondsBreaking - v.bondsForming; return [{ label: "ΔH", value: `${dh.toFixed(1)} kJ`, highlight: true }, { label: "Reaction Type", value: dh < 0 ? "Exothermic" : dh > 0 ? "Endothermic" : "Neutral" }]; },
    { expression: "ΔH = Σ(bonds broken) − Σ(bonds formed)", variables: ["ΔH < 0: exothermic", "ΔH > 0: endothermic"] }
  ),
  mk("gibbs-free-energy-calculator", "Gibbs Free Energy Calculator", "Calculate ΔG = ΔH − TΔS.", "Free Gibbs free energy calculator.", "Chemistry",
    [{ id: "dh", label: "ΔH (kJ/mol)", type: "number", defaultValue: -100, step: 1 }, { id: "ds", label: "ΔS (J/mol·K)", type: "number", defaultValue: 200, step: 1 }, { id: "temp", label: "Temperature (K)", type: "number", defaultValue: 298, step: 1 }],
    (v) => { const dg = v.dh - v.temp * v.ds / 1000; return [{ label: "ΔG", value: `${dg.toFixed(2)} kJ/mol`, highlight: true }, { label: "Spontaneous?", value: dg < 0 ? "Yes" : "No" }]; },
    { expression: "ΔG = ΔH − TΔS", variables: ["ΔG < 0: spontaneous", "T in Kelvin"] }
  ),
  mk("entropy-calculator", "Entropy Calculator", "Calculate entropy change ΔS = Q/T.", "Free entropy calculator.", "Chemistry",
    [{ id: "q", label: "Heat (J)", type: "number", defaultValue: 5000, step: 100 }, { id: "temp", label: "Temperature (K)", type: "number", defaultValue: 298, step: 1 }],
    (v) => { if (v.temp === 0) return [{ label: "Error", value: "Temperature cannot be zero" }]; const ds = v.q / v.temp; return [{ label: "ΔS", value: `${ds.toFixed(2)} J/K`, highlight: true }, { label: "In kJ/K", value: `${(ds / 1000).toFixed(4)} kJ/K` }]; },
    { expression: "ΔS = Q / T", variables: ["For reversible processes at constant T"] }
  ),

  // ═══════════════════════════════════════════
  // BIOLOGY
  // ═══════════════════════════════════════════
  mk("cell-doubling-time-calculator", "Cell Doubling Time Calculator", "Calculate cell population doubling time.", "Free cell doubling time calculator.", "Biology",
    [{ id: "n0", label: "Initial Cell Count", type: "number", defaultValue: 1000, step: 100 }, { id: "n1", label: "Final Cell Count", type: "number", defaultValue: 8000, step: 100 }, { id: "time", label: "Time (hours)", type: "number", defaultValue: 24, step: 1 }],
    (v) => { if (v.n0 <= 0 || v.n1 <= 0 || v.time <= 0) return [{ label: "Error", value: "Values must be > 0" }]; const doublings = Math.log2(v.n1 / v.n0); const dt = v.time / doublings; return [{ label: "Doubling Time", value: `${dt.toFixed(2)} hours`, highlight: true }, { label: "Number of Doublings", value: doublings.toFixed(2) }, { label: "Growth Rate", value: `${(Math.log(2) / dt).toFixed(4)} /hr` }]; },
    { expression: "Td = t × ln(2) / ln(N/N₀)", variables: ["N₀ = initial count", "N = final count"] }
  ),
  mk("population-growth-calculator", "Population Growth Calculator", "Calculate exponential population growth.", "Free population growth calculator.", "Biology",
    [{ id: "p0", label: "Initial Population", type: "number", defaultValue: 1000, step: 100 }, { id: "rate", label: "Growth Rate (%/year)", type: "number", defaultValue: 5, step: 0.1 }, { id: "years", label: "Years", type: "number", defaultValue: 10, step: 1 }],
    (v) => { const pf = v.p0 * Math.pow(1 + v.rate / 100, v.years); const doubling = Math.log(2) / Math.log(1 + v.rate / 100); return [{ label: "Final Population", value: Math.round(pf).toLocaleString(), highlight: true }, { label: "Doubling Time", value: `${doubling.toFixed(1)} years` }]; },
    { expression: "P = P₀(1 + r)^t", variables: ["r = growth rate", "t = time"] }
  ),
  mk("bacterial-growth-calculator", "Bacterial Growth Calculator", "Calculate bacterial colony growth over time.", "Free bacterial growth calculator.", "Biology",
    [{ id: "n0", label: "Initial Bacteria", type: "number", defaultValue: 100, step: 10 }, { id: "genTime", label: "Generation Time (min)", type: "number", defaultValue: 20, step: 1 }, { id: "totalTime", label: "Total Time (min)", type: "number", defaultValue: 180, step: 10 }],
    (v) => { if (v.genTime === 0) return [{ label: "Error", value: "Generation time cannot be zero" }]; const generations = v.totalTime / v.genTime; const nf = v.n0 * Math.pow(2, generations); return [{ label: "Final Count", value: nf.toExponential(2), highlight: true }, { label: "Generations", value: generations.toFixed(1) }]; },
    { expression: "N = N₀ × 2^(t/g)", variables: ["g = generation time"] }
  ),
  mk("genetic-probability-calculator", "Genetic Probability Calculator", "Calculate genotype probabilities from a monohybrid cross.", "Free genetic probability calculator.", "Biology",
    [{ id: "dominant", label: "Parent 1 Dominant Alleles (0-2)", type: "number", defaultValue: 1, min: 0, max: 2 }, { id: "dominant2", label: "Parent 2 Dominant Alleles (0-2)", type: "number", defaultValue: 1, min: 0, max: 2 }],
    (v) => { const p1 = v.dominant / 2; const p2 = v.dominant2 / 2; const AA = p1 * p2; const Aa = p1 * (1 - p2) + (1 - p1) * p2; const aa = (1 - p1) * (1 - p2); return [{ label: "Homozygous Dominant (AA)", value: `${(AA * 100).toFixed(1)}%`, highlight: true }, { label: "Heterozygous (Aa)", value: `${(Aa * 100).toFixed(1)}%` }, { label: "Homozygous Recessive (aa)", value: `${(aa * 100).toFixed(1)}%` }]; },
    { expression: "Punnett Square probabilities", variables: ["AA, Aa, aa genotype ratios"] }
  ),
  mk("hardy-weinberg-calculator", "Hardy Weinberg Equation Calculator", "Calculate allele and genotype frequencies.", "Free Hardy-Weinberg calculator.", "Biology",
    [{ id: "q2", label: "Frequency of aa (q²)", type: "number", defaultValue: 0.09, step: 0.01, min: 0, max: 1 }],
    (v) => { const q = Math.sqrt(v.q2); const p = 1 - q; const p2 = p ** 2; const twoP_q = 2 * p * q; return [{ label: "p (dominant allele)", value: p.toFixed(4), highlight: true }, { label: "q (recessive allele)", value: q.toFixed(4) }, { label: "p² (AA)", value: `${(p2 * 100).toFixed(1)}%` }, { label: "2pq (Aa)", value: `${(twoP_q * 100).toFixed(1)}%` }]; },
    { expression: "p² + 2pq + q² = 1; p + q = 1", variables: ["p = dominant allele freq", "q = recessive allele freq"] }
  ),
  mk("protein-concentration-calculator", "Protein Concentration Calculator", "Calculate protein concentration using Beer-Lambert law.", "Free protein concentration calculator.", "Biology",
    [{ id: "absorbance", label: "Absorbance (A280)", type: "number", defaultValue: 0.5, step: 0.01 }, { id: "extinction", label: "Extinction Coeff (M⁻¹cm⁻¹)", type: "number", defaultValue: 50000, step: 1000 }, { id: "path", label: "Path Length (cm)", type: "number", defaultValue: 1, step: 0.1 }],
    (v) => { if (v.extinction === 0 || v.path === 0) return [{ label: "Error", value: "Values cannot be zero" }]; const conc = v.absorbance / (v.extinction * v.path); return [{ label: "Concentration", value: `${(conc * 1e6).toFixed(2)} µM`, highlight: true }, { label: "In mg/mL", value: `${(conc * 50000 / 1000).toFixed(4)}` }]; },
    { expression: "A = εcl → c = A/(εl)", variables: ["Beer-Lambert Law"] }
  ),
  mk("dna-molecular-weight-calculator", "DNA Molecular Weight Calculator", "Calculate molecular weight of DNA from base pairs.", "Free DNA molecular weight calculator.", "Biology",
    [{ id: "bp", label: "Base Pairs", type: "number", defaultValue: 1000, step: 100 }],
    (v) => { const mw = v.bp * 649; return [{ label: "Molecular Weight", value: `${mw.toLocaleString()} Da`, highlight: true }, { label: "In kDa", value: `${(mw / 1000).toFixed(1)} kDa` }]; },
    { expression: "MW ≈ bp × 649 Da", variables: ["Average MW per base pair for dsDNA"] }
  ),
  mk("rna-molecular-weight-calculator", "RNA Molecular Weight Calculator", "Calculate molecular weight of RNA from nucleotides.", "Free RNA molecular weight calculator.", "Biology",
    [{ id: "nt", label: "Nucleotides", type: "number", defaultValue: 1000, step: 100 }],
    (v) => { const mw = v.nt * 340; return [{ label: "Molecular Weight", value: `${mw.toLocaleString()} Da`, highlight: true }, { label: "In kDa", value: `${(mw / 1000).toFixed(1)} kDa` }]; },
    { expression: "MW ≈ nt × 340 Da", variables: ["Average MW per nucleotide for ssRNA"] }
  ),
  mk("base-pair-calculator", "Base Pair Calculator", "Convert between base pairs, kilobases, and megabases.", "Free base pair converter.", "Biology",
    [{ id: "bp", label: "Base Pairs", type: "number", defaultValue: 3200000000, step: 1000000 }],
    (v) => { return [{ label: "Base Pairs", value: v.bp.toLocaleString(), highlight: true }, { label: "Kilobases (kb)", value: `${(v.bp / 1000).toLocaleString()} kb` }, { label: "Megabases (Mb)", value: `${(v.bp / 1e6).toFixed(1)} Mb` }, { label: "Gigabases (Gb)", value: `${(v.bp / 1e9).toFixed(2)} Gb` }]; },
    { expression: "1 kb = 1,000 bp; 1 Mb = 10⁶ bp", variables: ["Human genome ≈ 3.2 Gb"] }
  ),
  mk("genome-size-calculator", "Genome Size Calculator", "Estimate genome size in base pairs from DNA mass.", "Free genome size calculator.", "Biology",
    [{ id: "mass", label: "DNA Mass (pg)", type: "number", defaultValue: 3.5, step: 0.1 }],
    (v) => { const bp = v.mass * 978e6; return [{ label: "Genome Size", value: `${(bp / 1e9).toFixed(2)} Gb`, highlight: true }, { label: "In Mb", value: `${(bp / 1e6).toFixed(0)} Mb` }]; },
    { expression: "bp ≈ mass(pg) × 978 × 10⁶", variables: ["1 pg DNA ≈ 978 Mb"] }
  ),
  mk("enzyme-kinetics-calculator", "Enzyme Kinetics Calculator", "Calculate reaction velocity from substrate concentration.", "Free enzyme kinetics calculator.", "Biology",
    [{ id: "vmax", label: "Vmax (µmol/min)", type: "number", defaultValue: 100, step: 1 }, { id: "km", label: "Km (µM)", type: "number", defaultValue: 50, step: 1 }, { id: "substrate", label: "[S] (µM)", type: "number", defaultValue: 100, step: 1 }],
    (v) => { const vel = (v.vmax * v.substrate) / (v.km + v.substrate); return [{ label: "Velocity", value: `${vel.toFixed(2)} µmol/min`, highlight: true }, { label: "% Vmax", value: `${((vel / v.vmax) * 100).toFixed(1)}%` }]; },
    { expression: "v = Vmax[S] / (Km + [S])", variables: ["Michaelis-Menten equation"] }
  ),
  mk("michaelis-menten-calculator", "Michaelis Menten Calculator", "Calculate Km and Vmax from enzyme kinetics data.", "Free Michaelis-Menten calculator.", "Biology",
    [{ id: "v1", label: "v at [S]₁ (µmol/min)", type: "number", defaultValue: 40, step: 1 }, { id: "s1", label: "[S]₁ (µM)", type: "number", defaultValue: 20, step: 1 }, { id: "v2", label: "v at [S]₂ (µmol/min)", type: "number", defaultValue: 80, step: 1 }, { id: "s2", label: "[S]₂ (µM)", type: "number", defaultValue: 100, step: 1 }],
    (v) => { const denom = v.v2 * v.s1 - v.v1 * v.s2; if (denom === 0) return [{ label: "Error", value: "Cannot determine — try different data points" }]; const km = (v.v1 * v.v2 * (v.s2 - v.s1)) / denom; const vmax = v.v1 * (km + v.s1) / v.s1; return [{ label: "Km", value: `${Math.abs(km).toFixed(2)} µM`, highlight: true }, { label: "Vmax", value: `${Math.abs(vmax).toFixed(2)} µmol/min` }]; },
    { expression: "v = Vmax[S]/(Km+[S])", variables: ["Two-point estimation method"] }
  ),
  mk("osmolarity-calculator", "Osmolarity Calculator", "Calculate osmolarity of a solution.", "Free osmolarity calculator.", "Biology",
    [{ id: "molarity", label: "Molarity (M)", type: "number", defaultValue: 0.15, step: 0.01 }, { id: "ions", label: "Number of Ions (i)", type: "number", defaultValue: 2, min: 1 }],
    (v) => { const osm = v.molarity * v.ions; return [{ label: "Osmolarity", value: `${(osm * 1000).toFixed(1)} mOsm/L`, highlight: true }, { label: "In Osm/L", value: osm.toFixed(4) }]; },
    { expression: "Osm = M × i", variables: ["i = van't Hoff factor (ions per formula unit)", "Blood ≈ 300 mOsm/L"] }
  ),
  mk("osmotic-pressure-calculator", "Osmotic Pressure Calculator", "Calculate osmotic pressure π = iMRT.", "Free osmotic pressure calculator.", "Biology",
    [{ id: "molarity", label: "Molarity (M)", type: "number", defaultValue: 0.1, step: 0.01 }, { id: "temp", label: "Temperature (K)", type: "number", defaultValue: 310, step: 1 }, { id: "i", label: "van't Hoff factor", type: "number", defaultValue: 1, min: 1 }],
    (v) => { const R = 0.08206; const pi = v.i * v.molarity * R * v.temp; return [{ label: "Osmotic Pressure", value: `${pi.toFixed(2)} atm`, highlight: true }, { label: "In kPa", value: `${(pi * 101.325).toFixed(1)} kPa` }]; },
    { expression: "π = iMRT", variables: ["R = 0.08206 L·atm/(mol·K)"] }
  ),
  mk("diffusion-rate-calculator", "Diffusion Rate Calculator", "Calculate diffusion rate using Fick's first law.", "Free diffusion rate calculator.", "Biology",
    [{ id: "D", label: "Diffusion Coefficient (m²/s)", type: "number", defaultValue: 1e-9, step: 1e-10 }, { id: "area", label: "Area (m²)", type: "number", defaultValue: 0.001, step: 0.0001 }, { id: "dc", label: "Conc Difference (mol/m³)", type: "number", defaultValue: 100, step: 1 }, { id: "dx", label: "Distance (m)", type: "number", defaultValue: 0.01, step: 0.001 }],
    (v) => { if (v.dx === 0) return [{ label: "Error", value: "Distance cannot be zero" }]; const flux = v.D * v.area * v.dc / v.dx; return [{ label: "Diffusion Rate", value: `${flux.toExponential(3)} mol/s`, highlight: true }]; },
    { expression: "J = D × A × ΔC / Δx", variables: ["Fick's first law of diffusion"] }
  ),
  mk("ecological-footprint-calculator", "Ecological Footprint Calculator", "Estimate ecological footprint from lifestyle factors.", "Free ecological footprint calculator.", "Biology",
    [{ id: "electricity", label: "Monthly Electricity (kWh)", type: "number", defaultValue: 300, step: 10 }, { id: "driving", label: "Monthly Driving (km)", type: "number", defaultValue: 1500, step: 100 }, { id: "meat", label: "Meat Meals/Week", type: "number", defaultValue: 7, min: 0 }],
    (v) => { const co2 = v.electricity * 0.4 + v.driving * 0.21 + v.meat * 4 * 3; const hectares = co2 / 1000 * 0.5; return [{ label: "Monthly CO₂", value: `${co2.toFixed(0)} kg`, highlight: true }, { label: "Annual CO₂", value: `${(co2 * 12 / 1000).toFixed(1)} tonnes` }, { label: "Global Hectares", value: `${(hectares * 12).toFixed(1)} gha/yr` }]; },
    { expression: "Estimate from energy, transport, and diet", variables: ["Global average: ~2.7 gha/person"] }
  ),
  mk("biodiversity-index-calculator", "Biodiversity Index Calculator", "Calculate Simpson's Diversity Index.", "Free biodiversity index calculator.", "Biology",
    [{ id: "species1", label: "Species 1 Count", type: "number", defaultValue: 50, min: 0 }, { id: "species2", label: "Species 2 Count", type: "number", defaultValue: 30, min: 0 }, { id: "species3", label: "Species 3 Count", type: "number", defaultValue: 20, min: 0 }, { id: "species4", label: "Species 4 Count", type: "number", defaultValue: 10, min: 0 }],
    (v) => { const counts = [v.species1, v.species2, v.species3, v.species4].filter(c => c > 0); const N = counts.reduce((a, b) => a + b, 0); if (N <= 1) return [{ label: "Error", value: "Need more individuals" }]; const D = 1 - counts.reduce((sum, n) => sum + (n * (n - 1)) / (N * (N - 1)), 0); return [{ label: "Simpson's Index (1-D)", value: D.toFixed(4), highlight: true }, { label: "Species Richness", value: `${counts.length}` }, { label: "Total Individuals", value: `${N}` }]; },
    { expression: "D = 1 − Σ[n(n−1) / N(N−1)]", variables: ["0 = no diversity", "1 = infinite diversity"] }
  ),

  // ═══════════════════════════════════════════
  // ASTRONOMY
  // ═══════════════════════════════════════════
  mk("orbital-period-calculator", "Orbital Period Calculator", "Calculate orbital period using Kepler's third law.", "Free orbital period calculator.", "Astronomy",
    [{ id: "semiMajor", label: "Semi-major Axis (AU)", type: "number", defaultValue: 1, step: 0.01 }],
    (v) => { const T = Math.pow(v.semiMajor, 1.5); return [{ label: "Orbital Period", value: `${T.toFixed(4)} years`, highlight: true }, { label: "In days", value: `${(T * 365.25).toFixed(1)} days` }]; },
    { expression: "T² = a³ (in AU and years)", variables: ["Kepler's Third Law", "Earth: a=1 AU, T=1 year"] }
  ),
  mk("stellar-luminosity-calculator", "Stellar Luminosity Calculator", "Calculate stellar luminosity from radius and temperature.", "Free stellar luminosity calculator.", "Astronomy",
    [{ id: "radius", label: "Radius (R☉)", type: "number", defaultValue: 1, step: 0.1 }, { id: "temp", label: "Surface Temp (K)", type: "number", defaultValue: 5778, step: 100 }],
    (v) => { const L = Math.pow(v.radius, 2) * Math.pow(v.temp / 5778, 4); return [{ label: "Luminosity", value: `${L.toFixed(4)} L☉`, highlight: true }, { label: "In watts", value: `${(L * 3.828e26).toExponential(3)} W` }]; },
    { expression: "L = R² × (T/T☉)⁴", variables: ["L☉ = 3.828 × 10²⁶ W", "T☉ = 5778 K"] }
  ),
  mk("absolute-magnitude-calculator", "Absolute Magnitude Calculator", "Calculate absolute magnitude from apparent magnitude and distance.", "Free absolute magnitude calculator.", "Astronomy",
    [{ id: "apparent", label: "Apparent Magnitude", type: "number", defaultValue: 1, step: 0.1 }, { id: "distance", label: "Distance (parsecs)", type: "number", defaultValue: 100, step: 1 }],
    (v) => { if (v.distance <= 0) return [{ label: "Error", value: "Distance must be > 0" }]; const M = v.apparent - 5 * Math.log10(v.distance / 10); return [{ label: "Absolute Magnitude", value: M.toFixed(2), highlight: true }, { label: "Distance Modulus", value: `${(v.apparent - M).toFixed(2)}` }]; },
    { expression: "M = m − 5 log₁₀(d/10)", variables: ["m = apparent magnitude", "d = distance in parsecs"] }
  ),
  mk("apparent-magnitude-calculator", "Apparent Magnitude Calculator", "Calculate apparent magnitude from absolute magnitude and distance.", "Free apparent magnitude calculator.", "Astronomy",
    [{ id: "absolute", label: "Absolute Magnitude", type: "number", defaultValue: -26.74, step: 0.1 }, { id: "distance", label: "Distance (parsecs)", type: "number", defaultValue: 4.848e-6, step: 1e-7 }],
    (v) => { if (v.distance <= 0) return [{ label: "Error", value: "Distance must be > 0" }]; const m = v.absolute + 5 * Math.log10(v.distance / 10); return [{ label: "Apparent Magnitude", value: m.toFixed(2), highlight: true }]; },
    { expression: "m = M + 5 log₁₀(d/10)", variables: ["Sun: M = 4.83, m = −26.74"] }
  ),
  mk("redshift-calculator", "Redshift Calculator", "Calculate recession velocity from redshift z.", "Free redshift calculator.", "Astronomy",
    [{ id: "z", label: "Redshift (z)", type: "number", defaultValue: 0.1, step: 0.01 }],
    (v) => { const c = 299792; const vel = v.z * c; const distance = vel / 70; return [{ label: "Recession Velocity", value: `${vel.toFixed(0)} km/s`, highlight: true }, { label: "Approx Distance", value: `${distance.toFixed(0)} Mpc` }]; },
    { expression: "v = zc (low z)", variables: ["c = 299,792 km/s", "H₀ ≈ 70 km/s/Mpc"] }
  ),
  mk("hubble-law-calculator", "Hubble Law Calculator", "Calculate recession velocity or distance using Hubble's law.", "Free Hubble's law calculator.", "Astronomy",
    [{ id: "distance", label: "Distance (Mpc)", type: "number", defaultValue: 100, step: 1 }, { id: "h0", label: "Hubble Constant (km/s/Mpc)", type: "number", defaultValue: 70, step: 1 }],
    (v) => { const vel = v.h0 * v.distance; return [{ label: "Recession Velocity", value: `${vel.toLocaleString()} km/s`, highlight: true }, { label: "Redshift (z)", value: (vel / 299792).toFixed(4) }]; },
    { expression: "v = H₀ × d", variables: ["H₀ ≈ 70 km/s/Mpc (Hubble constant)"] }
  ),
  mk("planetary-gravity-calculator", "Planetary Gravity Calculator", "Calculate surface gravity of a planet.", "Free planetary gravity calculator.", "Astronomy",
    [{ id: "mass", label: "Planet Mass (×Earth)", type: "number", defaultValue: 1, step: 0.01 }, { id: "radius", label: "Planet Radius (×Earth)", type: "number", defaultValue: 1, step: 0.01 }],
    (v) => { if (v.radius === 0) return [{ label: "Error", value: "Radius cannot be zero" }]; const g = 9.81 * v.mass / (v.radius ** 2); return [{ label: "Surface Gravity", value: `${g.toFixed(2)} m/s²`, highlight: true }, { label: "Relative to Earth", value: `${(g / 9.81).toFixed(3)} g` }]; },
    { expression: "g = g_Earth × (M/M_E) / (R/R_E)²", variables: ["Mars: 0.107M, 0.532R → 3.7 m/s²"] }
  ),
  mk("planet-density-calculator", "Planet Density Calculator", "Calculate average density of a planet.", "Free planet density calculator.", "Astronomy",
    [{ id: "mass", label: "Mass (×10²⁴ kg)", type: "number", defaultValue: 5.972, step: 0.001 }, { id: "radius", label: "Radius (km)", type: "number", defaultValue: 6371, step: 1 }],
    (v) => { const vol = (4 / 3) * Math.PI * (v.radius * 1000) ** 3; if (vol === 0) return [{ label: "Error", value: "Radius cannot be zero" }]; const density = (v.mass * 1e24) / vol; return [{ label: "Density", value: `${density.toFixed(0)} kg/m³`, highlight: true }, { label: "Relative to Water", value: `${(density / 1000).toFixed(2)}×` }]; },
    { expression: "ρ = M / (4/3 πR³)", variables: ["Earth: 5514 kg/m³", "Saturn: 687 kg/m³ (floats!)"] }
  ),
  mk("black-hole-radius-calculator", "Black Hole Radius Calculator", "Calculate Schwarzschild radius of a black hole.", "Free black hole radius calculator.", "Astronomy",
    [{ id: "mass", label: "Mass (M☉)", type: "number", defaultValue: 10, step: 0.1 }],
    (v) => { const rs = 2 * 6.674e-11 * v.mass * 1.989e30 / (299792458 ** 2); return [{ label: "Schwarzschild Radius", value: `${(rs / 1000).toFixed(2)} km`, highlight: true }, { label: "In meters", value: `${rs.toFixed(0)} m` }]; },
    { expression: "rs = 2GM/c²", variables: ["M☉ = 1.989 × 10³⁰ kg", "Sun's rs ≈ 2.95 km"] }
  ),
  mk("schwarzschild-radius-calculator", "Schwarzschild Radius Calculator", "Calculate event horizon radius from mass.", "Free Schwarzschild radius calculator.", "Astronomy",
    [{ id: "mass", label: "Mass (kg)", type: "number", defaultValue: 1.989e30, step: 1e28 }],
    (v) => { const rs = 2 * 6.674e-11 * v.mass / (299792458 ** 2); return [{ label: "Schwarzschild Radius", value: `${rs.toFixed(2)} m`, highlight: true }, { label: "In km", value: `${(rs / 1000).toFixed(4)} km` }, { label: "In Solar Masses", value: `${(v.mass / 1.989e30).toFixed(4)} M☉` }]; },
    { expression: "rs = 2GM/c²", variables: ["G = 6.674×10⁻¹¹", "c = 2.998×10⁸ m/s"] }
  ),
  mk("light-travel-time-calculator", "Light Travel Time Calculator", "Calculate time for light to travel a given distance.", "Free light travel time calculator.", "Astronomy",
    [{ id: "distance", label: "Distance (km)", type: "number", defaultValue: 149597870.7, step: 1000000 }],
    (v) => { const c = 299792.458; const t = v.distance / c; return [{ label: "Travel Time", value: `${t.toFixed(3)} seconds`, highlight: true }, { label: "In minutes", value: `${(t / 60).toFixed(3)} min` }, { label: "In light-years", value: `${(v.distance / 9.461e12).toExponential(3)} ly` }]; },
    { expression: "t = d / c", variables: ["c = 299,792.458 km/s", "Sun to Earth ≈ 8.3 min"] }
  ),
  mk("cosmic-distance-calculator", "Cosmic Distance Calculator", "Convert between cosmic distance units.", "Free cosmic distance converter.", "Astronomy",
    [{ id: "parsec", label: "Parsecs", type: "number", defaultValue: 1, step: 0.01 }],
    (v) => { const ly = v.parsec * 3.26156; const au = v.parsec * 206265; const km = v.parsec * 3.0857e13; return [{ label: "Light Years", value: ly.toFixed(4), highlight: true }, { label: "AU", value: au.toLocaleString() }, { label: "Trillion km", value: `${(km / 1e12).toFixed(2)}` }]; },
    { expression: "1 pc = 3.26 ly = 206,265 AU", variables: ["pc = parsec"] }
  ),
  mk("astronomical-unit-converter", "Astronomical Unit Converter", "Convert between AU, km, miles, and light-minutes.", "Free AU converter.", "Astronomy",
    [{ id: "au", label: "Astronomical Units", type: "number", defaultValue: 1, step: 0.01 }],
    (v) => { const km = v.au * 149597870.7; const miles = km * 0.621371; const lightMin = v.au * 8.317; return [{ label: "Kilometers", value: `${km.toLocaleString()} km`, highlight: true }, { label: "Miles", value: `${Math.round(miles).toLocaleString()} mi` }, { label: "Light-Minutes", value: `${lightMin.toFixed(3)} min` }]; },
    { expression: "1 AU = 149,597,870.7 km", variables: ["Earth-Sun average distance"] }
  ),
  mk("solar-radiation-calculator", "Solar Radiation Calculator", "Calculate solar radiation at a given distance.", "Free solar radiation calculator.", "Astronomy",
    [{ id: "distance", label: "Distance (AU)", type: "number", defaultValue: 1, step: 0.01 }],
    (v) => { if (v.distance === 0) return [{ label: "Error", value: "Distance cannot be zero" }]; const flux = 1361 / (v.distance ** 2); return [{ label: "Solar Flux", value: `${flux.toFixed(1)} W/m²`, highlight: true }, { label: "Relative to Earth", value: `${(flux / 1361).toFixed(3)}×` }]; },
    { expression: "F = L☉ / (4πd²) ≈ 1361/d² W/m²", variables: ["Solar constant at Earth ≈ 1361 W/m²"] }
  ),

  // ═══════════════════════════════════════════
  // ENVIRONMENTAL SCIENCE
  // ═══════════════════════════════════════════
  mk("carbon-footprint-calculator", "Carbon Footprint Calculator", "Estimate your annual carbon footprint.", "Free carbon footprint calculator.", "Environmental Science",
    [{ id: "electricity", label: "Monthly Electricity (kWh)", type: "number", defaultValue: 400, step: 10 }, { id: "gas", label: "Monthly Gas (therms)", type: "number", defaultValue: 30, step: 1 }, { id: "driving", label: "Annual Driving (km)", type: "number", defaultValue: 18000, step: 1000 }],
    (v) => { const elec = v.electricity * 12 * 0.42; const gas = v.gas * 12 * 5.3; const drive = v.driving * 0.21; const total = (elec + gas + drive) / 1000; return [{ label: "Annual CO₂", value: `${total.toFixed(1)} tonnes`, highlight: true }, { label: "Electricity", value: `${(elec / 1000).toFixed(1)} t` }, { label: "Heating", value: `${(gas / 1000).toFixed(1)} t` }, { label: "Driving", value: `${(drive / 1000).toFixed(1)} t` }]; },
    { expression: "Sum of energy, heating, and transport emissions", variables: ["Global average: ~4.7 tonnes/person"] }
  ),
  mk("water-footprint-calculator", "Water Footprint Calculator", "Estimate daily water footprint.", "Free water footprint calculator.", "Environmental Science",
    [{ id: "showers", label: "Shower Minutes/Day", type: "number", defaultValue: 8, step: 1 }, { id: "laundry", label: "Laundry Loads/Week", type: "number", defaultValue: 3, step: 1 }, { id: "meals", label: "Meals with Meat/Day", type: "number", defaultValue: 1, min: 0, max: 3 }],
    (v) => { const shower = v.showers * 9.5; const laundry = v.laundry * 75 / 7; const food = v.meals * 2500 + (3 - v.meals) * 500; const total = shower + laundry + food; return [{ label: "Daily Water Footprint", value: `${total.toFixed(0)} L`, highlight: true }, { label: "Direct Use", value: `${(shower + laundry).toFixed(0)} L` }, { label: "Food (virtual)", value: `${food.toFixed(0)} L` }]; },
    { expression: "Direct + virtual (embedded in food production)", variables: ["Global average: ~3,800 L/day"] }
  ),
  mk("energy-consumption-calculator", "Energy Consumption Calculator", "Calculate electrical energy consumption and cost.", "Free energy consumption calculator.", "Environmental Science",
    [{ id: "watts", label: "Power (W)", type: "number", defaultValue: 100, step: 1 }, { id: "hours", label: "Hours/Day", type: "number", defaultValue: 8, step: 0.5 }, { id: "rate", label: "Rate ($/kWh)", type: "number", defaultValue: 0.12, step: 0.01 }],
    (v) => { const dailyKwh = v.watts * v.hours / 1000; const monthlyKwh = dailyKwh * 30; const monthlyCost = monthlyKwh * v.rate; return [{ label: "Monthly kWh", value: `${monthlyKwh.toFixed(1)} kWh`, highlight: true }, { label: "Monthly Cost", value: `$${monthlyCost.toFixed(2)}` }, { label: "Annual Cost", value: `$${(monthlyCost * 12).toFixed(2)}` }]; },
    { expression: "kWh = W × hours / 1000", variables: ["Cost = kWh × rate"] }
  ),
  mk("solar-panel-output-calculator", "Solar Panel Output Calculator", "Estimate solar panel energy production.", "Free solar panel output calculator.", "Environmental Science",
    [{ id: "panels", label: "Number of Panels", type: "number", defaultValue: 20, min: 1 }, { id: "wattage", label: "Panel Wattage (W)", type: "number", defaultValue: 400, step: 10 }, { id: "sunHours", label: "Peak Sun Hours/Day", type: "number", defaultValue: 5, step: 0.5 }, { id: "efficiency", label: "System Efficiency (%)", type: "number", defaultValue: 80, step: 1 }],
    (v) => { const daily = v.panels * v.wattage * v.sunHours * (v.efficiency / 100) / 1000; const monthly = daily * 30; const annual = daily * 365; return [{ label: "Daily Output", value: `${daily.toFixed(1)} kWh`, highlight: true }, { label: "Monthly", value: `${monthly.toFixed(0)} kWh` }, { label: "Annual", value: `${annual.toFixed(0)} kWh` }]; },
    { expression: "Output = Panels × W × Sun Hours × Efficiency", variables: ["Typical home: 20-30 panels"] }
  ),
  mk("wind-energy-calculator", "Wind Energy Calculator", "Calculate wind turbine power output.", "Free wind energy calculator.", "Environmental Science",
    [{ id: "radius", label: "Blade Radius (m)", type: "number", defaultValue: 40, step: 1 }, { id: "windSpeed", label: "Wind Speed (m/s)", type: "number", defaultValue: 10, step: 0.5 }, { id: "airDensity", label: "Air Density (kg/m³)", type: "number", defaultValue: 1.225, step: 0.01 }],
    (v) => { const area = Math.PI * v.radius ** 2; const power = 0.5 * v.airDensity * area * v.windSpeed ** 3 * 0.4; return [{ label: "Power Output", value: `${(power / 1000).toFixed(1)} kW`, highlight: true }, { label: "Swept Area", value: `${area.toFixed(0)} m²` }, { label: "Annual (est)", value: `${(power * 8760 * 0.3 / 1e6).toFixed(1)} MWh` }]; },
    { expression: "P = ½ρAv³ × Cp", variables: ["Cp ≈ 0.4 (Betz limit: 0.593)"] }
  ),
  mk("hydroelectric-power-calculator", "Hydroelectric Power Calculator", "Calculate hydroelectric power from head and flow.", "Free hydroelectric power calculator.", "Environmental Science",
    [{ id: "head", label: "Head (m)", type: "number", defaultValue: 50, step: 1 }, { id: "flow", label: "Flow Rate (m³/s)", type: "number", defaultValue: 10, step: 0.1 }, { id: "efficiency", label: "Efficiency (%)", type: "number", defaultValue: 85, step: 1 }],
    (v) => { const power = 9.81 * v.flow * v.head * (v.efficiency / 100); return [{ label: "Power", value: `${(power / 1000).toFixed(1)} kW`, highlight: true }, { label: "In MW", value: `${(power / 1e6).toFixed(3)} MW` }]; },
    { expression: "P = ρgQh × η", variables: ["Q = flow rate", "h = hydraulic head", "η = efficiency"] }
  ),
  mk("air-quality-index-calculator", "Air Quality Index Calculator", "Estimate AQI from PM2.5 concentration.", "Free air quality index calculator.", "Environmental Science",
    [{ id: "pm25", label: "PM2.5 (µg/m³)", type: "number", defaultValue: 35, step: 1 }],
    (v) => { let aqi; let level; if (v.pm25 <= 12) { aqi = v.pm25 / 12 * 50; level = "Good"; } else if (v.pm25 <= 35.4) { aqi = 50 + (v.pm25 - 12) / 23.4 * 50; level = "Moderate"; } else if (v.pm25 <= 55.4) { aqi = 100 + (v.pm25 - 35.4) / 20 * 50; level = "Unhealthy for Sensitive Groups"; } else if (v.pm25 <= 150.4) { aqi = 150 + (v.pm25 - 55.4) / 95 * 50; level = "Unhealthy"; } else { aqi = 200 + (v.pm25 - 150.4) / 100 * 100; level = "Very Unhealthy"; } return [{ label: "AQI", value: Math.round(aqi).toString(), highlight: true }, { label: "Level", value: level }]; },
    { expression: "AQI from EPA PM2.5 breakpoints", variables: ["0-50: Good", "51-100: Moderate", "101-150: USG"] }
  ),
  mk("greenhouse-gas-calculator", "Greenhouse Gas Emission Calculator", "Calculate CO₂ equivalent emissions.", "Free greenhouse gas emission calculator.", "Environmental Science",
    [{ id: "co2", label: "CO₂ (tonnes)", type: "number", defaultValue: 5, step: 0.1 }, { id: "ch4", label: "CH₄ (tonnes)", type: "number", defaultValue: 0.1, step: 0.01 }, { id: "n2o", label: "N₂O (tonnes)", type: "number", defaultValue: 0.01, step: 0.001 }],
    (v) => { const co2e = v.co2 + v.ch4 * 28 + v.n2o * 265; return [{ label: "CO₂ Equivalent", value: `${co2e.toFixed(2)} tonnes`, highlight: true }, { label: "CH₄ contribution", value: `${(v.ch4 * 28).toFixed(2)} t CO₂e` }, { label: "N₂O contribution", value: `${(v.n2o * 265).toFixed(2)} t CO₂e` }]; },
    { expression: "CO₂e = CO₂ + 28×CH₄ + 265×N₂O", variables: ["GWP: CH₄=28, N₂O=265 (100-yr)"] }
  ),
  mk("fuel-emission-calculator", "Fuel Emission Calculator", "Calculate CO₂ emissions from fuel usage.", "Free fuel emission calculator.", "Environmental Science",
    [{ id: "liters", label: "Fuel Used (L)", type: "number", defaultValue: 50, step: 1 }, { id: "type", label: "Fuel Type (0=Gasoline, 1=Diesel)", type: "number", defaultValue: 0, min: 0, max: 1 }],
    (v) => { const factor = v.type === 0 ? 2.31 : 2.68; const co2 = v.liters * factor; return [{ label: "CO₂ Emitted", value: `${co2.toFixed(1)} kg`, highlight: true }, { label: "Fuel Type", value: v.type === 0 ? "Gasoline" : "Diesel" }]; },
    { expression: "CO₂ = liters × emission factor", variables: ["Gasoline: 2.31 kg/L", "Diesel: 2.68 kg/L"] }
  ),
  mk("waste-generation-calculator", "Waste Generation Calculator", "Estimate waste generation per household.", "Free waste generation calculator.", "Environmental Science",
    [{ id: "people", label: "Household Size", type: "number", defaultValue: 4, min: 1 }, { id: "kgPerDay", label: "Waste per Person (kg/day)", type: "number", defaultValue: 1.2, step: 0.1 }],
    (v) => { const daily = v.people * v.kgPerDay; const monthly = daily * 30; const annual = daily * 365; return [{ label: "Daily Waste", value: `${daily.toFixed(1)} kg`, highlight: true }, { label: "Monthly", value: `${monthly.toFixed(0)} kg` }, { label: "Annual", value: `${(annual / 1000).toFixed(2)} tonnes` }]; },
    { expression: "Waste = people × kg/person/day", variables: ["US avg: ~2.0 kg/person/day", "Global avg: ~0.74 kg"] }
  ),
  mk("recycling-rate-calculator", "Recycling Rate Calculator", "Calculate recycling rate from waste data.", "Free recycling rate calculator.", "Environmental Science",
    [{ id: "recycled", label: "Recycled Waste (kg)", type: "number", defaultValue: 30, step: 1 }, { id: "total", label: "Total Waste (kg)", type: "number", defaultValue: 100, step: 1 }],
    (v) => { if (v.total === 0) return [{ label: "Error", value: "Total waste cannot be zero" }]; const rate = (v.recycled / v.total) * 100; return [{ label: "Recycling Rate", value: `${rate.toFixed(1)}%`, highlight: true }, { label: "Landfill", value: `${(v.total - v.recycled).toFixed(0)} kg` }]; },
    { expression: "Rate = (recycled / total) × 100", variables: ["Target: >50%"] }
  ),
  mk("environmental-impact-calculator", "Environmental Impact Calculator", "Estimate environmental impact score.", "Free environmental impact calculator.", "Environmental Science",
    [{ id: "co2", label: "Annual CO₂ (tonnes)", type: "number", defaultValue: 8, step: 0.1 }, { id: "water", label: "Daily Water (L)", type: "number", defaultValue: 150, step: 10 }, { id: "waste", label: "Weekly Waste (kg)", type: "number", defaultValue: 10, step: 1 }],
    (v) => { const co2Score = Math.min(100, v.co2 * 10); const waterScore = Math.min(100, v.water / 2); const wasteScore = Math.min(100, v.waste * 5); const avg = (co2Score + waterScore + wasteScore) / 3; return [{ label: "Impact Score", value: `${avg.toFixed(0)}/100`, highlight: true }, { label: "CO₂ Impact", value: `${co2Score.toFixed(0)}/100` }, { label: "Water Impact", value: `${waterScore.toFixed(0)}/100` }]; },
    { expression: "Composite score from CO₂, water, and waste", variables: ["Lower = better", "100 = high impact"] }
  ),

  // ═══════════════════════════════════════════
  // GEOLOGY & EARTH SCIENCE
  // ═══════════════════════════════════════════
  mk("rock-density-calculator", "Rock Density Calculator", "Calculate rock density from mass and volume.", "Free rock density calculator.", "Geology & Earth Science",
    [{ id: "mass", label: "Mass (g)", type: "number", defaultValue: 500, step: 1 }, { id: "volume", label: "Volume (cm³)", type: "number", defaultValue: 185, step: 1 }],
    (v) => { if (v.volume === 0) return [{ label: "Error", value: "Volume cannot be zero" }]; const d = v.mass / v.volume; return [{ label: "Density", value: `${d.toFixed(2)} g/cm³`, highlight: true }, { label: "In kg/m³", value: `${(d * 1000).toFixed(0)}` }]; },
    { expression: "ρ = m / V", variables: ["Granite: ~2.65 g/cm³", "Basalt: ~3.0 g/cm³"] }
  ),
  mk("mineral-hardness-calculator", "Mineral Hardness Calculator", "Compare mineral hardness on Mohs scale.", "Free mineral hardness calculator.", "Geology & Earth Science",
    [{ id: "hardness", label: "Mohs Hardness (1-10)", type: "number", defaultValue: 7, min: 1, max: 10, step: 0.5 }],
    (v) => { const minerals: Record<number, string> = { 1: "Talc", 2: "Gypsum", 3: "Calcite", 4: "Fluorite", 5: "Apatite", 6: "Feldspar", 7: "Quartz", 8: "Topaz", 9: "Corundum", 10: "Diamond" }; const ref = minerals[Math.round(v.hardness)] || "Between scales"; return [{ label: "Reference Mineral", value: ref, highlight: true }, { label: "Absolute Hardness", value: `~${Math.pow(10, v.hardness * 0.3).toFixed(0)}` }, { label: "Can scratch glass?", value: v.hardness >= 5.5 ? "Yes" : "No" }]; },
    { expression: "Mohs scale: 1 (softest) to 10 (hardest)", variables: ["Glass ≈ 5.5", "Fingernail ≈ 2.5"] }
  ),
  mk("sediment-transport-calculator", "Sediment Transport Calculator", "Calculate sediment transport capacity.", "Free sediment transport calculator.", "Geology & Earth Science",
    [{ id: "velocity", label: "Flow Velocity (m/s)", type: "number", defaultValue: 1.5, step: 0.1 }, { id: "depth", label: "Water Depth (m)", type: "number", defaultValue: 2, step: 0.1 }, { id: "slope", label: "Channel Slope", type: "number", defaultValue: 0.001, step: 0.0001 }],
    (v) => { const shearStress = 1000 * 9.81 * v.depth * v.slope; const transport = 0.1 * Math.pow(shearStress, 1.5); return [{ label: "Shear Stress", value: `${shearStress.toFixed(2)} Pa`, highlight: true }, { label: "Transport Capacity", value: `${transport.toFixed(4)} kg/m/s` }]; },
    { expression: "τ = ρgdS", variables: ["τ = bed shear stress", "S = channel slope"] }
  ),
  mk("richter-scale-energy-calculator", "Richter Scale Energy Calculator", "Calculate energy released by earthquakes.", "Free Richter scale energy calculator.", "Geology & Earth Science",
    [{ id: "magnitude", label: "Magnitude", type: "number", defaultValue: 7, step: 0.1 }],
    (v) => { const energy = Math.pow(10, 1.5 * v.magnitude + 4.8); const tnt = energy / 4.184e9; return [{ label: "Energy", value: `${energy.toExponential(2)} J`, highlight: true }, { label: "TNT Equivalent", value: `${tnt.toExponential(2)} tons` }]; },
    { expression: "log₁₀E = 1.5M + 4.8", variables: ["Each step = 31.6× more energy"] }
  ),
  mk("seismic-wave-velocity-calculator", "Seismic Wave Velocity Calculator", "Calculate P-wave and S-wave velocities.", "Free seismic wave velocity calculator.", "Geology & Earth Science",
    [{ id: "bulk", label: "Bulk Modulus (GPa)", type: "number", defaultValue: 130, step: 1 }, { id: "shear", label: "Shear Modulus (GPa)", type: "number", defaultValue: 70, step: 1 }, { id: "density", label: "Density (kg/m³)", type: "number", defaultValue: 3300, step: 100 }],
    (v) => { if (v.density === 0) return [{ label: "Error", value: "Density cannot be zero" }]; const vp = Math.sqrt((v.bulk * 1e9 + 4 / 3 * v.shear * 1e9) / v.density); const vs = Math.sqrt(v.shear * 1e9 / v.density); return [{ label: "P-wave Velocity", value: `${(vp / 1000).toFixed(2)} km/s`, highlight: true }, { label: "S-wave Velocity", value: `${(vs / 1000).toFixed(2)} km/s` }]; },
    { expression: "Vp = √((K+4G/3)/ρ); Vs = √(G/ρ)", variables: ["K = bulk modulus", "G = shear modulus"] }
  ),
  mk("plate-tectonic-speed-calculator", "Plate Tectonic Speed Calculator", "Calculate plate movement over time.", "Free plate tectonic speed calculator.", "Geology & Earth Science",
    [{ id: "distance", label: "Distance Moved (cm)", type: "number", defaultValue: 250, step: 10 }, { id: "years", label: "Time (million years)", type: "number", defaultValue: 100, step: 1 }],
    (v) => { if (v.years === 0) return [{ label: "Error", value: "Time cannot be zero" }]; const rate = v.distance / v.years; return [{ label: "Rate", value: `${rate.toFixed(2)} cm/Myr`, highlight: true }, { label: "In mm/year", value: `${(rate * 10).toFixed(1)} mm/yr` }]; },
    { expression: "Rate = distance / time", variables: ["Typical: 2-10 cm/year"] }
  ),
  mk("volcanic-eruption-energy-calculator", "Volcanic Eruption Energy Calculator", "Estimate energy of volcanic eruptions by VEI.", "Free volcanic eruption energy calculator.", "Geology & Earth Science",
    [{ id: "vei", label: "VEI (0-8)", type: "number", defaultValue: 5, min: 0, max: 8 }],
    (v) => { const energy = Math.pow(10, v.vei + 17); const tnt = energy / 4.184e9; return [{ label: "Energy", value: `${energy.toExponential(1)} J`, highlight: true }, { label: "TNT Equivalent", value: `${tnt.toExponential(1)} tons` }, { label: "Ejecta Volume", value: `~${Math.pow(10, v.vei - 2).toFixed(1)} km³` }]; },
    { expression: "E ≈ 10^(VEI+17) J", variables: ["VEI 5 = Mt. St. Helens", "VEI 8 = Yellowstone supervolcano"] }
  ),
  mk("earth-pressure-calculator", "Earth Pressure Calculator", "Calculate lateral earth pressure on retaining walls.", "Free earth pressure calculator.", "Geology & Earth Science",
    [{ id: "density", label: "Soil Density (kN/m³)", type: "number", defaultValue: 18, step: 0.5 }, { id: "height", label: "Wall Height (m)", type: "number", defaultValue: 5, step: 0.1 }, { id: "phi", label: "Friction Angle (°)", type: "number", defaultValue: 30, min: 0, max: 45 }],
    (v) => { const ka = Math.pow(Math.tan((45 - v.phi / 2) * Math.PI / 180), 2); const pressure = 0.5 * ka * v.density * v.height ** 2; return [{ label: "Active Pressure", value: `${pressure.toFixed(1)} kN/m`, highlight: true }, { label: "Ka coefficient", value: ka.toFixed(4) }]; },
    { expression: "Pa = ½ Ka γ H²", variables: ["Ka = tan²(45 − φ/2)", "Rankine theory"] }
  ),
  mk("slope-stability-calculator", "Slope Stability Calculator", "Calculate factor of safety for slopes.", "Free slope stability calculator.", "Geology & Earth Science",
    [{ id: "cohesion", label: "Cohesion (kPa)", type: "number", defaultValue: 20, step: 1 }, { id: "phi", label: "Friction Angle (°)", type: "number", defaultValue: 25, step: 1 }, { id: "weight", label: "Soil Weight (kN/m)", type: "number", defaultValue: 100, step: 1 }, { id: "angle", label: "Slope Angle (°)", type: "number", defaultValue: 30, step: 1 }],
    (v) => { const rad = v.angle * Math.PI / 180; const phiRad = v.phi * Math.PI / 180; if (Math.sin(rad) === 0) return [{ label: "Error", value: "Slope angle cannot be zero" }]; const fs = (v.cohesion + v.weight * Math.cos(rad) * Math.tan(phiRad)) / (v.weight * Math.sin(rad)); return [{ label: "Factor of Safety", value: fs.toFixed(3), highlight: true }, { label: "Status", value: fs >= 1.5 ? "Stable" : fs >= 1 ? "Marginal" : "Unstable" }]; },
    { expression: "FoS = (c + W cosα tanφ) / (W sinα)", variables: ["FoS ≥ 1.5: stable", "FoS < 1: failure"] }
  ),

  // ═══════════════════════════════════════════
  // THERMODYNAMICS
  // ═══════════════════════════════════════════
  mk("heat-capacity-calculator", "Heat Capacity Calculator", "Calculate heat capacity C = Q/ΔT.", "Free heat capacity calculator.", "Thermodynamics",
    [{ id: "heat", label: "Heat (J)", type: "number", defaultValue: 5000, step: 100 }, { id: "dt", label: "Temperature Change (°C)", type: "number", defaultValue: 10, step: 0.1 }],
    (v) => { if (v.dt === 0) return [{ label: "Error", value: "ΔT cannot be zero" }]; const c = v.heat / v.dt; return [{ label: "Heat Capacity", value: `${c.toFixed(2)} J/°C`, highlight: true }]; },
    { expression: "C = Q / ΔT", variables: ["C = heat capacity (J/°C)"] }
  ),
  mk("latent-heat-calculator", "Latent Heat Calculator", "Calculate heat for phase change Q = mL.", "Free latent heat calculator.", "Thermodynamics",
    [{ id: "mass", label: "Mass (kg)", type: "number", defaultValue: 1, step: 0.1 }, { id: "latentHeat", label: "Latent Heat (kJ/kg)", type: "number", defaultValue: 334, step: 1 }],
    (v) => { const q = v.mass * v.latentHeat; return [{ label: "Heat Required", value: `${q.toFixed(1)} kJ`, highlight: true }, { label: "In J", value: `${(q * 1000).toLocaleString()} J` }]; },
    { expression: "Q = mL", variables: ["Water fusion: 334 kJ/kg", "Water vaporization: 2260 kJ/kg"] }
  ),
  mk("thermal-efficiency-calculator", "Thermal Efficiency Calculator", "Calculate thermal efficiency of a heat engine.", "Free thermal efficiency calculator.", "Thermodynamics",
    [{ id: "workOut", label: "Work Output (J)", type: "number", defaultValue: 400, step: 10 }, { id: "heatIn", label: "Heat Input (J)", type: "number", defaultValue: 1000, step: 10 }],
    (v) => { if (v.heatIn === 0) return [{ label: "Error", value: "Heat input cannot be zero" }]; const eff = (v.workOut / v.heatIn) * 100; return [{ label: "Efficiency", value: `${eff.toFixed(1)}%`, highlight: true }, { label: "Waste Heat", value: `${(v.heatIn - v.workOut).toFixed(0)} J` }]; },
    { expression: "η = W/Q_H × 100%", variables: ["W = work output", "Q_H = heat input"] }
  ),
  mk("carnot-efficiency-calculator", "Carnot Efficiency Calculator", "Calculate maximum theoretical efficiency of a heat engine.", "Free Carnot efficiency calculator.", "Thermodynamics",
    [{ id: "th", label: "Hot Temperature (K)", type: "number", defaultValue: 600, step: 10 }, { id: "tc", label: "Cold Temperature (K)", type: "number", defaultValue: 300, step: 10 }],
    (v) => { if (v.th === 0) return [{ label: "Error", value: "Hot temperature cannot be zero" }]; const eff = (1 - v.tc / v.th) * 100; return [{ label: "Carnot Efficiency", value: `${eff.toFixed(1)}%`, highlight: true }, { label: "Temperature Ratio", value: `${(v.tc / v.th).toFixed(4)}` }]; },
    { expression: "η_Carnot = 1 − T_C/T_H", variables: ["Maximum possible efficiency", "T in Kelvin"] }
  ),
  mk("heat-engine-efficiency-calculator", "Heat Engine Efficiency Calculator", "Compare actual to Carnot efficiency.", "Free heat engine efficiency calculator.", "Thermodynamics",
    [{ id: "actual", label: "Actual Efficiency (%)", type: "number", defaultValue: 35, step: 1 }, { id: "th", label: "T_hot (K)", type: "number", defaultValue: 600, step: 10 }, { id: "tc", label: "T_cold (K)", type: "number", defaultValue: 300, step: 10 }],
    (v) => { if (v.th === 0) return [{ label: "Error", value: "Temperature cannot be zero" }]; const carnot = (1 - v.tc / v.th) * 100; const relative = (v.actual / carnot) * 100; return [{ label: "Carnot Efficiency", value: `${carnot.toFixed(1)}%`, highlight: true }, { label: "Relative Efficiency", value: `${relative.toFixed(1)}%` }]; },
    { expression: "Relative η = η_actual / η_Carnot", variables: ["How close to theoretical maximum"] }
  ),
  mk("entropy-change-calculator", "Entropy Change Calculator", "Calculate entropy change for processes.", "Free entropy change calculator.", "Thermodynamics",
    [{ id: "heat", label: "Heat (J)", type: "number", defaultValue: 10000, step: 100 }, { id: "temp", label: "Temperature (K)", type: "number", defaultValue: 373, step: 1 }],
    (v) => { if (v.temp === 0) return [{ label: "Error", value: "Temperature cannot be zero" }]; const ds = v.heat / v.temp; return [{ label: "Entropy Change", value: `${ds.toFixed(2)} J/K`, highlight: true }, { label: "In kJ/K", value: `${(ds / 1000).toFixed(4)} kJ/K` }]; },
    { expression: "ΔS = Q / T", variables: ["For reversible isothermal process"] }
  ),
  mk("enthalpy-change-calculator", "Enthalpy Change Calculator", "Calculate enthalpy change from heat and work.", "Free enthalpy change calculator.", "Thermodynamics",
    [{ id: "heat", label: "Heat (kJ)", type: "number", defaultValue: 50, step: 1 }, { id: "work", label: "PΔV Work (kJ)", type: "number", defaultValue: 5, step: 0.1 }],
    (v) => { const dh = v.heat + v.work; return [{ label: "ΔH", value: `${dh.toFixed(2)} kJ`, highlight: true }, { label: "Process", value: dh < 0 ? "Exothermic" : "Endothermic" }]; },
    { expression: "ΔH = Q + PΔV (at constant pressure: ΔH = Q)", variables: ["ΔH < 0: exothermic"] }
  ),
  mk("heat-conduction-calculator", "Heat Conduction Calculator", "Calculate heat conduction through a material.", "Free heat conduction calculator.", "Thermodynamics",
    [{ id: "k", label: "Thermal Conductivity (W/m·K)", type: "number", defaultValue: 0.04, step: 0.01 }, { id: "area", label: "Area (m²)", type: "number", defaultValue: 10, step: 0.1 }, { id: "dt", label: "Temperature Difference (°C)", type: "number", defaultValue: 20, step: 1 }, { id: "thickness", label: "Thickness (m)", type: "number", defaultValue: 0.15, step: 0.01 }],
    (v) => { if (v.thickness === 0) return [{ label: "Error", value: "Thickness cannot be zero" }]; const q = v.k * v.area * v.dt / v.thickness; return [{ label: "Heat Flow", value: `${q.toFixed(2)} W`, highlight: true }, { label: "R-value", value: `${(v.thickness / v.k).toFixed(3)} m²·K/W` }]; },
    { expression: "Q = kAΔT/d", variables: ["k = thermal conductivity", "d = thickness"] }
  ),

  // ═══════════════════════════════════════════
  // OPTICS
  // ═══════════════════════════════════════════
  mk("lens-formula-calculator", "Lens Formula Calculator", "Calculate using 1/f = 1/v − 1/u.", "Free lens formula calculator.", "Optics",
    [{ id: "objectDist", label: "Object Distance u (cm)", type: "number", defaultValue: -30, step: 1 }, { id: "focal", label: "Focal Length f (cm)", type: "number", defaultValue: 15, step: 1 }],
    (v) => { if (v.focal === 0) return [{ label: "Error", value: "Focal length cannot be zero" }]; const vi = 1 / (1 / v.focal - 1 / v.objectDist); const mag = vi / v.objectDist; return [{ label: "Image Distance v", value: `${vi.toFixed(2)} cm`, highlight: true }, { label: "Magnification", value: `${Math.abs(mag).toFixed(3)}×` }, { label: "Image", value: vi > 0 ? "Real" : "Virtual" }]; },
    { expression: "1/f = 1/v − 1/u", variables: ["Sign convention: real=positive, virtual=negative"] }
  ),
  mk("focal-length-calculator", "Focal Length Calculator", "Calculate focal length from object and image distances.", "Free focal length calculator.", "Optics",
    [{ id: "u", label: "Object Distance (cm)", type: "number", defaultValue: -30, step: 1 }, { id: "v", label: "Image Distance (cm)", type: "number", defaultValue: 60, step: 1 }],
    (v) => { const denom = 1 / v.v - 1 / v.u; if (denom === 0) return [{ label: "Error", value: "Cannot calculate" }]; const f = 1 / denom; return [{ label: "Focal Length", value: `${f.toFixed(2)} cm`, highlight: true }, { label: "Power", value: `${(100 / f).toFixed(2)} D` }]; },
    { expression: "1/f = 1/v − 1/u", variables: ["f > 0: converging", "f < 0: diverging"] }
  ),
  mk("magnification-calculator", "Magnification Calculator", "Calculate optical magnification.", "Free magnification calculator.", "Optics",
    [{ id: "imageH", label: "Image Height (cm)", type: "number", defaultValue: 4, step: 0.1 }, { id: "objectH", label: "Object Height (cm)", type: "number", defaultValue: 2, step: 0.1 }],
    (v) => { if (v.objectH === 0) return [{ label: "Error", value: "Object height cannot be zero" }]; const m = v.imageH / v.objectH; return [{ label: "Magnification", value: `${m.toFixed(3)}×`, highlight: true }, { label: "Image Orientation", value: m > 0 ? "Upright" : "Inverted" }]; },
    { expression: "M = h_i / h_o", variables: ["M > 1: magnified", "M < 1: diminished"] }
  ),
  mk("mirror-equation-calculator", "Mirror Equation Calculator", "Calculate using mirror equation 1/f = 1/v + 1/u.", "Free mirror equation calculator.", "Optics",
    [{ id: "objectDist", label: "Object Distance u (cm)", type: "number", defaultValue: -20, step: 1 }, { id: "focal", label: "Focal Length f (cm)", type: "number", defaultValue: -10, step: 1 }],
    (v) => { if (v.focal === 0) return [{ label: "Error", value: "Focal length cannot be zero" }]; const vi = 1 / (1 / v.focal - 1 / v.objectDist); const mag = -vi / v.objectDist; return [{ label: "Image Distance", value: `${vi.toFixed(2)} cm`, highlight: true }, { label: "Magnification", value: `${mag.toFixed(3)}×` }]; },
    { expression: "1/f = 1/v + 1/u", variables: ["Concave: f < 0", "Convex: f > 0"] }
  ),
  mk("snell-law-calculator", "Snell Law Calculator", "Calculate refraction angle using Snell's law.", "Free Snell's law calculator.", "Optics",
    [{ id: "n1", label: "n₁ (incident medium)", type: "number", defaultValue: 1, step: 0.01 }, { id: "theta1", label: "Angle of Incidence (°)", type: "number", defaultValue: 30, min: 0, max: 89 }, { id: "n2", label: "n₂ (refracting medium)", type: "number", defaultValue: 1.5, step: 0.01 }],
    (v) => { const sinT2 = v.n1 * Math.sin(v.theta1 * Math.PI / 180) / v.n2; if (Math.abs(sinT2) > 1) return [{ label: "Result", value: "Total Internal Reflection", highlight: true }]; const t2 = Math.asin(sinT2) * 180 / Math.PI; return [{ label: "Refracted Angle", value: `${t2.toFixed(2)}°`, highlight: true }, { label: "sin(θ₂)", value: sinT2.toFixed(4) }]; },
    { expression: "n₁ sin θ₁ = n₂ sin θ₂", variables: ["n_air = 1.0", "n_glass ≈ 1.5"] }
  ),
  mk("refractive-index-calculator", "Refractive Index Calculator", "Calculate refractive index from angles.", "Free refractive index calculator.", "Optics",
    [{ id: "theta1", label: "Angle of Incidence (°)", type: "number", defaultValue: 45, min: 1, max: 89 }, { id: "theta2", label: "Angle of Refraction (°)", type: "number", defaultValue: 28, min: 1, max: 89 }],
    (v) => { const n = Math.sin(v.theta1 * Math.PI / 180) / Math.sin(v.theta2 * Math.PI / 180); return [{ label: "Refractive Index", value: n.toFixed(4), highlight: true }, { label: "Speed in Medium", value: `${(299792 / n).toFixed(0)} km/s` }]; },
    { expression: "n = sin θ₁ / sin θ₂", variables: ["Assuming incident from air (n=1)"] }
  ),
  mk("critical-angle-calculator", "Critical Angle Calculator", "Calculate the critical angle for total internal reflection.", "Free critical angle calculator.", "Optics",
    [{ id: "n1", label: "n₁ (denser medium)", type: "number", defaultValue: 1.5, step: 0.01 }, { id: "n2", label: "n₂ (less dense)", type: "number", defaultValue: 1, step: 0.01 }],
    (v) => { if (v.n1 <= v.n2) return [{ label: "Result", value: "No TIR (n₁ must be > n₂)" }]; const critical = Math.asin(v.n2 / v.n1) * 180 / Math.PI; return [{ label: "Critical Angle", value: `${critical.toFixed(2)}°`, highlight: true }]; },
    { expression: "θc = sin⁻¹(n₂/n₁)", variables: ["Requires n₁ > n₂", "Glass→Air: ~42°"] }
  ),
  mk("optical-power-calculator", "Optical Power Calculator", "Calculate optical power in diopters.", "Free optical power calculator.", "Optics",
    [{ id: "focal", label: "Focal Length (cm)", type: "number", defaultValue: 50, step: 1 }],
    (v) => { if (v.focal === 0) return [{ label: "Error", value: "Focal length cannot be zero" }]; const power = 100 / v.focal; return [{ label: "Optical Power", value: `${power.toFixed(2)} D`, highlight: true }, { label: "Lens Type", value: v.focal > 0 ? "Converging (+)" : "Diverging (−)" }]; },
    { expression: "P = 1/f (in meters)", variables: ["P in diopters (D)", "1 D = 1 m⁻¹"] }
  ),
  mk("diffraction-grating-calculator", "Diffraction Grating Calculator", "Calculate diffraction angles using d sin θ = mλ.", "Free diffraction grating calculator.", "Optics",
    [{ id: "slitSpacing", label: "Slit Spacing d (µm)", type: "number", defaultValue: 2, step: 0.1 }, { id: "wavelength", label: "Wavelength λ (nm)", type: "number", defaultValue: 550, step: 10 }, { id: "order", label: "Order m", type: "number", defaultValue: 1, min: 1 }],
    (v) => { const d = v.slitSpacing * 1e-6; const lam = v.wavelength * 1e-9; const sinT = v.order * lam / d; if (sinT > 1) return [{ label: "Result", value: "Order not visible (sin θ > 1)" }]; const theta = Math.asin(sinT) * 180 / Math.PI; return [{ label: "Diffraction Angle", value: `${theta.toFixed(2)}°`, highlight: true }, { label: "sin θ", value: sinT.toFixed(4) }]; },
    { expression: "d sin θ = mλ", variables: ["m = order number", "d = slit spacing"] }
  ),
  mk("light-intensity-calculator", "Light Intensity Calculator", "Calculate light intensity using inverse square law.", "Free light intensity calculator.", "Optics",
    [{ id: "power", label: "Source Power (W)", type: "number", defaultValue: 100, step: 1 }, { id: "distance", label: "Distance (m)", type: "number", defaultValue: 2, step: 0.1 }],
    (v) => { if (v.distance === 0) return [{ label: "Error", value: "Distance cannot be zero" }]; const intensity = v.power / (4 * Math.PI * v.distance ** 2); return [{ label: "Intensity", value: `${intensity.toFixed(4)} W/m²`, highlight: true }, { label: "In lux (approx)", value: `${(intensity * 683 * 0.15).toFixed(0)} lux` }]; },
    { expression: "I = P / (4πr²)", variables: ["Inverse square law"] }
  ),

  // ═══════════════════════════════════════════
  // FLUID MECHANICS
  // ═══════════════════════════════════════════
  mk("bernoulli-equation-calculator", "Bernoulli Equation Calculator", "Apply Bernoulli's equation to fluid flow.", "Free Bernoulli equation calculator.", "Fluid Mechanics",
    [{ id: "p1", label: "Pressure 1 (Pa)", type: "number", defaultValue: 101325, step: 100 }, { id: "v1", label: "Velocity 1 (m/s)", type: "number", defaultValue: 5, step: 0.1 }, { id: "h1", label: "Height 1 (m)", type: "number", defaultValue: 0, step: 0.1 }, { id: "v2", label: "Velocity 2 (m/s)", type: "number", defaultValue: 10, step: 0.1 }, { id: "h2", label: "Height 2 (m)", type: "number", defaultValue: 3, step: 0.1 }],
    (v) => { const rho = 1000; const p2 = v.p1 + 0.5 * rho * (v.v1 ** 2 - v.v2 ** 2) + rho * 9.81 * (v.h1 - v.h2); return [{ label: "Pressure at Point 2", value: `${p2.toFixed(0)} Pa`, highlight: true }, { label: "In kPa", value: `${(p2 / 1000).toFixed(2)} kPa` }]; },
    { expression: "P₁ + ½ρv₁² + ρgh₁ = P₂ + ½ρv₂² + ρgh₂", variables: ["For ideal, incompressible flow"] }
  ),
  mk("drag-force-calculator", "Drag Force Calculator", "Calculate aerodynamic drag force.", "Free drag force calculator.", "Fluid Mechanics",
    [{ id: "cd", label: "Drag Coefficient", type: "number", defaultValue: 0.3, step: 0.01 }, { id: "area", label: "Frontal Area (m²)", type: "number", defaultValue: 2.2, step: 0.1 }, { id: "velocity", label: "Velocity (m/s)", type: "number", defaultValue: 30, step: 1 }, { id: "density", label: "Air Density (kg/m³)", type: "number", defaultValue: 1.225, step: 0.01 }],
    (v) => { const fd = 0.5 * v.cd * v.density * v.area * v.velocity ** 2; return [{ label: "Drag Force", value: `${fd.toFixed(2)} N`, highlight: true }, { label: "Power to Overcome", value: `${(fd * v.velocity / 1000).toFixed(2)} kW` }]; },
    { expression: "Fd = ½CdρAv²", variables: ["Cd = drag coefficient", "A = frontal area"] }
  ),
  mk("lift-force-calculator", "Lift Force Calculator", "Calculate aerodynamic lift force.", "Free lift force calculator.", "Fluid Mechanics",
    [{ id: "cl", label: "Lift Coefficient", type: "number", defaultValue: 1.2, step: 0.01 }, { id: "area", label: "Wing Area (m²)", type: "number", defaultValue: 16, step: 0.5 }, { id: "velocity", label: "Velocity (m/s)", type: "number", defaultValue: 60, step: 1 }, { id: "density", label: "Air Density (kg/m³)", type: "number", defaultValue: 1.225, step: 0.01 }],
    (v) => { const fl = 0.5 * v.cl * v.density * v.area * v.velocity ** 2; return [{ label: "Lift Force", value: `${fl.toFixed(0)} N`, highlight: true }, { label: "Can Lift (kg)", value: `${(fl / 9.81).toFixed(0)} kg` }]; },
    { expression: "FL = ½CLρAv²", variables: ["CL = lift coefficient"] }
  ),
  mk("fluid-pressure-calculator", "Fluid Pressure Calculator", "Calculate pressure at depth in a fluid.", "Free fluid pressure calculator.", "Fluid Mechanics",
    [{ id: "density", label: "Fluid Density (kg/m³)", type: "number", defaultValue: 1000, step: 10 }, { id: "depth", label: "Depth (m)", type: "number", defaultValue: 10, step: 0.1 }],
    (v) => { const p = v.density * 9.81 * v.depth; return [{ label: "Gauge Pressure", value: `${p.toFixed(0)} Pa`, highlight: true }, { label: "Absolute Pressure", value: `${(p + 101325).toFixed(0)} Pa` }, { label: "In atm", value: `${((p + 101325) / 101325).toFixed(3)} atm` }]; },
    { expression: "P = ρgh", variables: ["g = 9.81 m/s²", "+101325 Pa for absolute"] }
  ),
  mk("hydrostatic-pressure-calculator", "Hydrostatic Pressure Calculator", "Calculate hydrostatic pressure at depth.", "Free hydrostatic pressure calculator.", "Fluid Mechanics",
    [{ id: "density", label: "Fluid Density (kg/m³)", type: "number", defaultValue: 1025, step: 1 }, { id: "depth", label: "Depth (m)", type: "number", defaultValue: 100, step: 1 }],
    (v) => { const p = v.density * 9.81 * v.depth + 101325; return [{ label: "Total Pressure", value: `${(p / 1000).toFixed(1)} kPa`, highlight: true }, { label: "In atm", value: `${(p / 101325).toFixed(2)} atm` }, { label: "In bar", value: `${(p / 100000).toFixed(2)} bar` }]; },
    { expression: "P = ρgh + P_atm", variables: ["Seawater: 1025 kg/m³", "Every 10m ≈ +1 atm"] }
  ),
  mk("buoyant-force-calculator", "Buoyant Force Calculator", "Calculate buoyant force on a submerged object.", "Free buoyant force calculator.", "Fluid Mechanics",
    [{ id: "volume", label: "Displaced Volume (m³)", type: "number", defaultValue: 0.1, step: 0.01 }, { id: "density", label: "Fluid Density (kg/m³)", type: "number", defaultValue: 1000, step: 10 }],
    (v) => { const fb = v.density * 9.81 * v.volume; return [{ label: "Buoyant Force", value: `${fb.toFixed(2)} N`, highlight: true }, { label: "Weight Supported", value: `${(fb / 9.81).toFixed(2)} kg` }]; },
    { expression: "Fb = ρVg", variables: ["Archimedes' principle"] }
  ),
  mk("archimedes-principle-calculator", "Archimedes Principle Calculator", "Determine if an object floats or sinks.", "Free Archimedes principle calculator.", "Fluid Mechanics",
    [{ id: "objMass", label: "Object Mass (kg)", type: "number", defaultValue: 5, step: 0.1 }, { id: "objVolume", label: "Object Volume (m³)", type: "number", defaultValue: 0.006, step: 0.001 }, { id: "fluidDensity", label: "Fluid Density (kg/m³)", type: "number", defaultValue: 1000, step: 10 }],
    (v) => { const objDensity = v.objMass / v.objVolume; const buoyancy = v.fluidDensity * 9.81 * v.objVolume; const weight = v.objMass * 9.81; return [{ label: "Object Density", value: `${objDensity.toFixed(0)} kg/m³`, highlight: true }, { label: "Buoyant Force", value: `${buoyancy.toFixed(2)} N` }, { label: "Weight", value: `${weight.toFixed(2)} N` }, { label: "Result", value: buoyancy >= weight ? "Floats" : "Sinks" }]; },
    { expression: "Floats if ρ_object < ρ_fluid", variables: ["Fb = ρ_fluid × V × g"] }
  ),
  mk("pipe-flow-calculator", "Pipe Flow Calculator", "Calculate flow rate through a pipe.", "Free pipe flow calculator.", "Fluid Mechanics",
    [{ id: "diameter", label: "Pipe Diameter (m)", type: "number", defaultValue: 0.1, step: 0.01 }, { id: "velocity", label: "Flow Velocity (m/s)", type: "number", defaultValue: 2, step: 0.1 }],
    (v) => { const area = Math.PI * (v.diameter / 2) ** 2; const flow = area * v.velocity; return [{ label: "Flow Rate", value: `${(flow * 1000).toFixed(2)} L/s`, highlight: true }, { label: "In m³/s", value: flow.toFixed(6) }, { label: "Cross-section", value: `${(area * 10000).toFixed(2)} cm²` }]; },
    { expression: "Q = A × v = π(d/2)² × v", variables: ["Q = volumetric flow rate"] }
  ),
  mk("laminar-flow-calculator", "Laminar Flow Calculator", "Calculate flow properties for laminar regime.", "Free laminar flow calculator.", "Fluid Mechanics",
    [{ id: "diameter", label: "Pipe Diameter (m)", type: "number", defaultValue: 0.02, step: 0.001 }, { id: "length", label: "Pipe Length (m)", type: "number", defaultValue: 10, step: 0.1 }, { id: "dp", label: "Pressure Drop (Pa)", type: "number", defaultValue: 1000, step: 100 }, { id: "viscosity", label: "Dynamic Viscosity (Pa·s)", type: "number", defaultValue: 0.001, step: 0.0001 }],
    (v) => { const r = v.diameter / 2; const q = Math.PI * r ** 4 * v.dp / (8 * v.viscosity * v.length); const vAvg = q / (Math.PI * r ** 2); return [{ label: "Flow Rate", value: `${(q * 1e6).toFixed(2)} mL/s`, highlight: true }, { label: "Avg Velocity", value: `${vAvg.toFixed(4)} m/s` }]; },
    { expression: "Q = πr⁴ΔP / (8µL)", variables: ["Hagen-Poiseuille equation", "Re < 2300"] }
  ),
  mk("turbulent-flow-calculator", "Turbulent Flow Calculator", "Calculate Reynolds number and verify turbulent flow.", "Free turbulent flow calculator.", "Fluid Mechanics",
    [{ id: "velocity", label: "Velocity (m/s)", type: "number", defaultValue: 5, step: 0.1 }, { id: "diameter", label: "Diameter (m)", type: "number", defaultValue: 0.05, step: 0.001 }, { id: "kinVisc", label: "Kinematic Viscosity (m²/s)", type: "number", defaultValue: 1e-6, step: 1e-7 }],
    (v) => { if (v.kinVisc === 0) return [{ label: "Error", value: "Viscosity cannot be zero" }]; const re = v.velocity * v.diameter / v.kinVisc; const regime = re < 2300 ? "Laminar" : re < 4000 ? "Transitional" : "Turbulent"; return [{ label: "Reynolds Number", value: re.toFixed(0), highlight: true }, { label: "Flow Regime", value: regime }]; },
    { expression: "Re = vD/ν", variables: ["Re > 4000: turbulent", "ν_water ≈ 10⁻⁶ m²/s"] }
  ),

  // ═══════════════════════════════════════════
  // NUCLEAR PHYSICS
  // ═══════════════════════════════════════════
  mk("decay-constant-calculator", "Decay Constant Calculator", "Calculate decay constant from half-life.", "Free decay constant calculator.", "Nuclear Physics",
    [{ id: "halfLife", label: "Half-Life", type: "number", defaultValue: 5730, step: 1 }, { id: "unit", label: "Time Unit (0=years, 1=days, 2=hours)", type: "number", defaultValue: 0, min: 0, max: 2 }],
    (v) => { const lambda = Math.log(2) / v.halfLife; const units = ["years", "days", "hours"]; return [{ label: "Decay Constant", value: `${lambda.toExponential(4)} /${units[v.unit]}`, highlight: true }, { label: "Mean Lifetime", value: `${(1 / lambda).toFixed(2)} ${units[v.unit]}` }]; },
    { expression: "λ = ln(2) / t½", variables: ["τ = 1/λ (mean lifetime)"] }
  ),
  mk("mass-defect-calculator", "Mass Defect Calculator", "Calculate mass defect and binding energy.", "Free mass defect calculator.", "Nuclear Physics",
    [{ id: "protons", label: "Protons (Z)", type: "number", defaultValue: 26, min: 1 }, { id: "neutrons", label: "Neutrons (N)", type: "number", defaultValue: 30, min: 0 }, { id: "atomicMass", label: "Atomic Mass (u)", type: "number", defaultValue: 55.845, step: 0.001 }],
    (v) => { const expected = v.protons * 1.00728 + v.neutrons * 1.00866; const defect = expected - v.atomicMass; const energy = defect * 931.5; return [{ label: "Mass Defect", value: `${defect.toFixed(4)} u`, highlight: true }, { label: "Binding Energy", value: `${energy.toFixed(2)} MeV` }, { label: "BE/nucleon", value: `${(energy / (v.protons + v.neutrons)).toFixed(2)} MeV` }]; },
    { expression: "Δm = Zm_p + Nm_n − M", variables: ["E = Δm × 931.5 MeV/u"] }
  ),
  mk("radiation-dose-calculator", "Radiation Dose Calculator", "Convert between radiation dose units.", "Free radiation dose calculator.", "Nuclear Physics",
    [{ id: "gray", label: "Absorbed Dose (Gy)", type: "number", defaultValue: 0.001, step: 0.0001 }, { id: "wf", label: "Radiation Weighting Factor", type: "number", defaultValue: 1, step: 0.1 }],
    (v) => { const sv = v.gray * v.wf; return [{ label: "Equivalent Dose", value: `${(sv * 1000).toFixed(2)} mSv`, highlight: true }, { label: "In µSv", value: `${(sv * 1e6).toFixed(0)} µSv` }, { label: "In rem", value: `${(sv * 100).toFixed(4)} rem` }]; },
    { expression: "H = D × W_R", variables: ["Sv = Gy × W_R", "Gamma/X-ray: W_R=1", "Alpha: W_R=20"] }
  ),
  mk("nuclear-reaction-energy-calculator", "Nuclear Reaction Energy Calculator", "Calculate Q-value of nuclear reactions.", "Free nuclear reaction energy calculator.", "Nuclear Physics",
    [{ id: "reactantMass", label: "Total Reactant Mass (u)", type: "number", defaultValue: 236.0526, step: 0.0001 }, { id: "productMass", label: "Total Product Mass (u)", type: "number", defaultValue: 235.8658, step: 0.0001 }],
    (v) => { const dm = v.reactantMass - v.productMass; const q = dm * 931.5; return [{ label: "Q-value", value: `${q.toFixed(2)} MeV`, highlight: true }, { label: "Mass Difference", value: `${dm.toFixed(4)} u` }, { label: "Reaction Type", value: q > 0 ? "Exothermic" : "Endothermic" }]; },
    { expression: "Q = (m_reactants − m_products) × 931.5", variables: ["Q > 0: energy released"] }
  ),
];
