// =================================================
// Anas Abu Amer - Portfolio
// Built by AbdullahZaid-ggg (GitHub)
// Date: 4/9/2026
// (c) Copyright AbdullahZaid-ggg. All rights reserved.
// =================================================
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// GPU vertex shader: morphs the sphere on the GPU (cheap) instead of the CPU,
// which is what made the previous version lag during scroll.
const CELL_VERT = `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  vec3 pos = position;
  float d = 0.34
    + 0.22 * sin(pos.y * 2.2 + uTime * 1.4)
    + 0.18 * sin(pos.x * 1.8 + uTime * 1.1) * cos(pos.z * 1.6 + uTime * 0.9);
  pos += normal * d;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vViewDir = normalize(-mv.xyz);
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mv;
}
`;

const CELL_FRAG = `
uniform vec3 uColor;
uniform vec3 uEmissive;
uniform float uEmissiveIntensity;
varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  vec3 lightDir = normalize(vec3(0.6, 0.8, 0.5));
  float dif = max(dot(vNormal, lightDir), 0.0);
  vec3 base = uColor * (0.3 + dif * 0.9);
  float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vViewDir))), 2.2);
  vec3 glow = uEmissive * (uEmissiveIntensity + fresnel * 1.6);
  vec3 col = base + glow;
  gl_FragColor = vec4(col, 1.0);
}
`;

function IncandescentCell({ color, emissive, intensity, segments, scale = 1 }) {
  const mat = useRef(null);
  const group = useRef(null);
  const dur = useMemo(() => 1 + Math.random(), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mat.current) mat.current.uniforms.uTime.value = t;
    if (group.current) group.current.position.y = Math.sin(t * 0.6 + dur) * 0.25;
  });

  return (
    <group ref={group} scale={scale}>
      <mesh>
        <sphereGeometry args={[1.45, segments, segments]} />
        <shaderMaterial
          ref={mat}
          uniforms={{
            uTime: { value: 0 },
            uColor: { value: new THREE.Color(color) },
            uEmissive: { value: new THREE.Color(emissive) },
            uEmissiveIntensity: { value: intensity },
          }}
          vertexShader={CELL_VERT}
          fragmentShader={CELL_FRAG}
        />
      </mesh>
    </group>
  );
}

function Rundle({ a, b, mid, len }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const dir = new THREE.Vector3().subVectors(b, a).normalize();
    ref.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
  }, [a, b]);
  return (
    <mesh ref={ref} position={mid}>
      <cylinderGeometry args={[0.035, 0.035, len, 6]} />
      <meshStandardMaterial color="#34D399" emissive="#047857" emissiveIntensity={0.6} metalness={0.2} roughness={0.35} />
    </mesh>
  );
}

function DnaHelix() {
  const { curveA, curveB, rungPairs } = useMemo(() => {
    const turns = 2.6;
    const steps = 140;
    const radius = 1.05;
    const height = 6.6;
    const pa = [];
    const pb = [];
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = (t - 0.5) * height;
      const angle = t * Math.PI * 2 * turns;
      pa.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
      pb.push(new THREE.Vector3(-Math.cos(angle) * radius, y, -Math.sin(angle) * radius));
    }
    const rungs = [];
    for (let i = 0; i <= steps; i += 8) {
      rungs.push([pa[i], pb[i]]);
    }
    return {
      curveA: new THREE.CatmullRomCurve3(pa),
      curveB: new THREE.CatmullRomCurve3(pb),
      rungPairs: rungs,
    };
  }, []);

  const makeTube = (curve) => (
    <mesh>
      <tubeGeometry args={[curve, 60, 0.055, 8]} />
      <meshStandardMaterial color="#22D3EE" emissive="#0891B2" emissiveIntensity={0.7} metalness={0.3} roughness={0.3} />
    </mesh>
  );

  return (
    <group>
      {makeTube(curveA)}
      {makeTube(curveB)}
      {rungPairs.map(([a, b], i) => {
        const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
        const len = a.distanceTo(b) * 0.92;
        return <Rundle key={i} a={a} b={b} mid={mid} len={len} />;
      })}
    </group>
  );
}

function HeroScene() {
  const sceneRef = useRef(null);
  const groupRef = useRef(null);

  // Gentle continuous rotation (cheap: just a ref update, no CPU vertex work)
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.1;
  });

  useEffect(() => {
    const group = sceneRef.current;
    if (!group) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    const ctx = gsap.context(() => {
      gsap.to(group.position, {
        y: -0.9,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <group ref={sceneRef}>
      <group ref={groupRef}>
        <IncandescentCell color="#10B981" emissive="#06B6D4" intensity={1.1} segments={72} />
        <IncandescentCell color="#34D399" emissive="#22D3EE" intensity={1.5} segments={40} scale={0.42} />
        <DnaHelix />
      </group>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="hero-3d" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.1} />
        <HeroScene />
      </Canvas>
    </div>
  );
}
