'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer, OrbitControls } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

export type BoxStyle = 'mailer' | 'shipping' | 'rigid' | 'carton';
export type Finish = 'Matte' | 'Gloss' | 'Soft-touch' | 'Foil logo';
export type Board = 'Kraft' | 'White board' | 'Printed colour';
export type BoxConfig = { style: BoxStyle; length: number; width: number; height: number; color: string; board: Board; finish: Finish; logo: string | null; open: boolean; autoRotate: boolean };

const KRAFT = '#C29467';

function useKraftTexture() {
  return useMemo(() => {
    if (typeof document === 'undefined') return null;
    const c = document.createElement('canvas'); c.width = c.height = 512;
    const g = c.getContext('2d')!; g.fillStyle = KRAFT; g.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 1400; i++) { g.strokeStyle = `rgba(${Math.random() > .5 ? '90,55,20' : '255,235,200'},${Math.random() * .12})`; g.lineWidth = Math.random() * 1.2; g.beginPath(); const x = Math.random() * 512, y = Math.random() * 512; g.moveTo(x, y); g.lineTo(x + (Math.random() - .5) * 20, y + (Math.random() - .5) * 20); g.stroke(); }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
  }, []);
}

/** Draws the default ALL PACK mark, or the user's uploaded logo, onto a transparent canvas texture. */
function useLogoTexture(logo: string | null, ink: string) {
  const [tex, setTex] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    let cancelled = false;
    const c = document.createElement('canvas'); c.width = c.height = 1024;
    const g = c.getContext('2d')!;
    const finish = () => { if (cancelled) return; const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; setTex(t); };
    if (logo) {
      const img = new Image();
      img.onload = () => { const s = Math.min(760 / img.width, 760 / img.height); const w = img.width * s, h = img.height * s; g.drawImage(img, (1024 - w) / 2, (1024 - h) / 2, w, h); finish(); };
      img.onerror = finish; img.src = logo;
    } else {
      g.fillStyle = ink; g.beginPath(); g.moveTo(512, 210); g.lineTo(690, 520); g.lineTo(334, 520); g.closePath(); g.fill();
      g.globalCompositeOperation = 'destination-out'; g.font = '800 170px Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('P', 512, 430);
      g.globalCompositeOperation = 'source-over'; g.fillStyle = ink; g.font = '800 120px Arial, sans-serif'; g.fillText('ALL PACK', 512, 650);
      g.font = '600 34px Arial, sans-serif'; g.globalAlpha = .8; g.fillText('THE PACKAGING EXPERTS', 512, 735);
      finish();
    }
    return () => { cancelled = true; };
  }, [logo, ink]);
  return tex;
}

function luminance(hex: string) { const c = new THREE.Color(hex); return .2126 * c.r + .7152 * c.g + .0722 * c.b; }

function Panel({ args, position, rotation, outer, inner, edge }: { args: [number, number, number]; position?: [number, number, number]; rotation?: [number, number, number]; outer: THREE.Material; inner: THREE.Material; edge: THREE.Material }) {
  return <mesh position={position} rotation={rotation} castShadow receiveShadow material={[edge, edge, edge, edge, outer, inner]}><boxGeometry args={args} /></mesh>;
}

function Model({ cfg }: { cfg: BoxConfig }) {
  const kraft = useKraftTexture();
  const group = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);
  const flapsL = useRef<THREE.Group>(null);
  const flapsR = useRef<THREE.Group>(null);
  const progress = useRef(cfg.open ? 1 : 0);

  // scale centimetres into scene units, keeping the largest side ~3 units
  const max = Math.max(cfg.length, cfg.width, cfg.height);
  const k = 3 / max;
  const W = cfg.length * k, D = cfg.width * k, H = cfg.height * k;
  const t = cfg.style === 'rigid' ? .06 : .03;

  const surface = cfg.board === 'Kraft' ? KRAFT : cfg.board === 'White board' ? '#F4F3EF' : cfg.color;
  const inkColor = cfg.board === 'Printed colour' ? (luminance(cfg.color) > .55 ? '#0A1433' : '#FFFFFF') : (cfg.board === 'Kraft' ? '#1B2240' : cfg.color);
  const logoTex = useLogoTexture(cfg.logo, inkColor);

  const mats = useMemo(() => {
    const rough = cfg.finish === 'Gloss' ? .18 : cfg.finish === 'Soft-touch' ? .95 : .62;
    const outer = new THREE.MeshPhysicalMaterial({ color: cfg.board === 'Kraft' ? '#ffffff' : surface, map: cfg.board === 'Kraft' ? kraft : null, roughness: cfg.board === 'Kraft' ? .9 : rough, clearcoat: cfg.finish === 'Gloss' && cfg.board !== 'Kraft' ? 1 : 0, clearcoatRoughness: .08, sheen: cfg.finish === 'Soft-touch' ? .6 : 0, sheenColor: new THREE.Color('#ffffff') });
    const inner = new THREE.MeshStandardMaterial({ color: cfg.board === 'Kraft' ? '#D7B48C' : cfg.style === 'rigid' ? '#F2EEE6' : '#F6F5F1', roughness: .9 });
    const edge = new THREE.MeshStandardMaterial({ color: cfg.board === 'Kraft' ? '#B48756' : '#E9E5DC', roughness: .95 });
    const logo = new THREE.MeshPhysicalMaterial({ map: logoTex, transparent: true, roughness: cfg.finish === 'Foil logo' ? .2 : rough, metalness: cfg.finish === 'Foil logo' ? 1 : 0, color: cfg.finish === 'Foil logo' && !cfg.logo ? '#E2C178' : '#ffffff', polygonOffset: true, polygonOffsetFactor: -2 });
    return { outer, inner, edge, logo };
  }, [cfg.board, cfg.finish, cfg.style, cfg.logo, surface, kraft, logoTex]);

  useFrame((state, dt) => {
    const target = cfg.open ? 1 : 0;
    progress.current = THREE.MathUtils.damp(progress.current, target, 5, dt);
    const p = progress.current;
    if (lid.current) {
      if (cfg.style === 'rigid') { lid.current.position.y = H + p * H * .9; lid.current.rotation.z = p * .18; lid.current.position.x = p * W * .25; }
      else lid.current.rotation.x = -p * (cfg.style === 'carton' ? 1.9 : 1.95);
    }
    if (flapsL.current) flapsL.current.rotation.z = p * 2.2;
    if (flapsR.current) flapsR.current.rotation.z = -p * 2.2;
    if (group.current && cfg.autoRotate) group.current.rotation.y += dt * .25;
  });

  const logoSize = Math.min(W, D) * .7;
  const walls = (
    <>
      <Panel args={[W, D, t]} position={[0, t / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} outer={mats.inner} inner={mats.outer} edge={mats.edge} />
      <Panel args={[W, H, t]} position={[0, H / 2, D / 2 - t / 2]} outer={mats.outer} inner={mats.inner} edge={mats.edge} />
      <Panel args={[W, H, t]} position={[0, H / 2, -D / 2 + t / 2]} rotation={[0, Math.PI, 0]} outer={mats.outer} inner={mats.inner} edge={mats.edge} />
      <Panel args={[D - 2 * t, H, t]} position={[W / 2 - t / 2, H / 2, 0]} rotation={[0, Math.PI / 2, 0]} outer={mats.outer} inner={mats.inner} edge={mats.edge} />
      <Panel args={[D - 2 * t, H, t]} position={[-W / 2 + t / 2, H / 2, 0]} rotation={[0, -Math.PI / 2, 0]} outer={mats.outer} inner={mats.inner} edge={mats.edge} />
      {/* front logo */}
      <mesh position={[0, H / 2, D / 2 + .002]} material={mats.logo}><planeGeometry args={[Math.min(W, H) * .8, Math.min(W, H) * .8]} /></mesh>
    </>
  );

  let top: React.ReactNode = null;
  if (cfg.style === 'shipping') {
    top = (
      <>
        <group ref={flapsL} position={[-W / 2, H, 0]}>
          <Panel args={[W / 2, D, t]} position={[W / 4, t / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} outer={mats.outer} inner={mats.inner} edge={mats.edge} />
          <mesh position={[W / 4, t + .002, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[W * .16, D]} /><meshStandardMaterial color="#26337A" roughness={.4} transparent opacity={.9} /></mesh>
        </group>
        <group ref={flapsR} position={[W / 2, H, 0]}>
          <Panel args={[W / 2, D, t]} position={[-W / 4, t / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} outer={mats.outer} inner={mats.inner} edge={mats.edge} />
          <mesh position={[-W / 4, t + .002, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[W * .16, D]} /><meshStandardMaterial color="#26337A" roughness={.4} transparent opacity={.9} /></mesh>
        </group>
      </>
    );
  } else if (cfg.style === 'rigid') {
    const lh = Math.min(H * .35, .6);
    top = (
      <group ref={lid} position={[0, H, 0]}>
        <mesh position={[0, -lh / 2 + t, 0]} castShadow material={mats.outer}><boxGeometry args={[W + .06, lh, D + .06]} /></mesh>
        <mesh position={[0, t + .004, 0]} rotation={[-Math.PI / 2, 0, 0]} material={mats.logo}><planeGeometry args={[logoSize, logoSize]} /></mesh>
      </group>
    );
  } else {
    top = (
      <group ref={lid} position={[0, H, -D / 2]}>
        <Panel args={[W, D, t]} position={[0, t / 2, D / 2]} rotation={[-Math.PI / 2, 0, 0]} outer={mats.outer} inner={mats.inner} edge={mats.edge} />
        <mesh position={[0, t + .004, D / 2]} rotation={[-Math.PI / 2, 0, 0]} material={mats.logo}><planeGeometry args={[logoSize, logoSize]} /></mesh>
        <Panel args={[W * .96, H * .3, t]} position={[0, -H * .15, D - t * 2]} outer={mats.outer} inner={mats.inner} edge={mats.edge} />
      </group>
    );
  }

  return <group ref={group} position={[0, -H / 2, 0]} rotation={[0, -.55, 0]}>{walls}{top}</group>;
}

export default function BoxScene({ cfg }: { cfg: BoxConfig }) {
  const [webgl, setWebgl] = useState<boolean | null>(null);
  useEffect(() => {
    try { const c = document.createElement('canvas'); setWebgl(Boolean(c.getContext('webgl2') || c.getContext('webgl'))); } catch { setWebgl(false); }
  }, []);
  if (webgl === false) return <div className="grid h-full place-items-center p-8 text-center text-sm text-muted">3D preview isn&apos;t supported on this device, but you can still send your specification below.</div>;
  if (webgl === null) return null;
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [5.6, 4.3, 6.8], fov: 34 }} gl={{ antialias: true, alpha: true, toneMapping: THREE.NeutralToneMapping }} aria-label="Interactive 3D packaging preview">
      <ambientLight intensity={.5} />
      <directionalLight position={[-4, 8, 5]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} />
      <Environment resolution={256}>
        <Lightformer intensity={2} position={[0, 5, -6]} scale={[10, 4, 1]} />
        <Lightformer intensity={1.2} position={[-6, 2, 2]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer intensity={1} position={[6, 1, 4]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} color="#cfe2ff" />
      </Environment>
      <Model cfg={cfg} />
      <ContactShadows position={[0, -1.6, 0]} opacity={.35} scale={10} blur={2.6} far={4} />
      <OrbitControls enablePan={false} minDistance={4.5} maxDistance={11} minPolarAngle={.3} maxPolarAngle={Math.PI / 2.05} />
    </Canvas>
  );
}
