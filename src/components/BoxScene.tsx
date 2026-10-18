"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, ContactShadows, RoundedBox } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { ProductArt } from './ProductArt';
import { useReducedMotion } from 'framer-motion';
import type { Group } from 'three';
function Box({color='#486bb7',kind='mailer',dimensions=[2.4,1.7,2],finish='Matte',material='Kraft board',reduced=false}:{color?:string;kind?:string;dimensions?:[number,number,number];finish?:string;material?:string;reduced?:boolean}){
 const box=useRef<Group>(null);const lid=useRef<Group>(null);const [w,h,d]=dimensions;
 useFrame(({clock},dt)=>{if(reduced)return; if(box.current)box.current.rotation.y+=Math.min(dt,.05)*.12;if(lid.current)lid.current.rotation.x=-.19-(.19*Math.sin(clock.elapsedTime*.65));});
 const gloss=finish==='Gloss'||finish==='Foil accent'; const roughness=finish==='Soft touch'?.93:gloss?.22:.56; const metallic=finish==='Foil accent'?.42:.08;
 return <group ref={box} rotation={[.08,-.32,.05]}>
  <RoundedBox args={[w,h,d]} radius={.055} smoothness={4} castShadow receiveShadow><meshStandardMaterial color={color} metalness={metallic} roughness={roughness}/></RoundedBox>
  <mesh position={[-w/2+.03,0,d/2+.008]} castShadow><boxGeometry args={[.09,h-.15,.025]}/><meshStandardMaterial color={material==='Kraft board'?'#d0aa79':'#B0C6ED'} roughness={.4}/></mesh>
  <mesh position={[0,0,d/2+.03]}><planeGeometry args={[w*.68,h*.50]}/><meshStandardMaterial color="#F1F6FC" roughness={.9}/></mesh>
  <mesh position={[0,.03,d/2+.05]}><planeGeometry args={[w*.32,h*.17]}/><meshStandardMaterial color="#4269AD" roughness={.8}/></mesh>
  <group ref={lid} position={[0,h/2,-d/2]}><mesh position={[0,.025,d/2]} castShadow><boxGeometry args={[w,.08,d]}/><meshStandardMaterial color={kind==='gift'?'#304784':kind==='shipping'?'#7095d3':'#90B3E7'} metalness={metallic} roughness={roughness}/></mesh></group>
  <mesh position={[w/2+.01,0,0]} rotation={[0,Math.PI/2,0]}><planeGeometry args={[d*.58,h*.27]}/><meshStandardMaterial color="#d3e3fa"/></mesh>
 </group>
}
export default function BoxScene({color,kind,dimensions,controls=false,finish,material}:{color?:string;kind?:string;dimensions?:[number,number,number];controls?:boolean;finish?:string;material?:string}){
 const reduced=useReducedMotion();
 const [webgl,setWebgl]=useState<boolean|null>(null);
 useEffect(()=>{
  try{const canvas=document.createElement('canvas');setWebgl(Boolean(canvas.getContext('webgl2')||canvas.getContext('webgl')))}
  catch{setWebgl(false)}
 },[]);
 if(webgl!==true)return <div className="relative h-full w-full"><ProductArt name="Packaging concept preview" model={kind||'mailer'} hue="#dce9ff" className="h-full w-full"/>{webgl===false&&<span className="absolute bottom-3 left-3 rounded-full bg-white/85 px-3 py-1 text-xs text-[#303C85]">Static preview · 3D not supported on this device</span>}</div>;
 return <div className="h-full w-full" aria-label="Animated three-dimensional packaging box preview" role="img">
  <Canvas dpr={[1,1.5]} shadows={false} camera={{position:[4.2,3.3,5.5],fov:38}} gl={{antialias:true,alpha:true,powerPreference:'high-performance'}}>
   <ambientLight intensity={1.7}/><directionalLight position={[4,7,4]} intensity={2.3} color="#ffffff"/><directionalLight position={[-5,2,-4]} intensity={.8} color="#afccff"/>
   <Float speed={reduced?0:1.1} rotationIntensity={reduced?0:.06} floatIntensity={reduced?0:.22}><Box color={color} kind={kind} dimensions={dimensions} finish={finish} material={material} reduced={Boolean(reduced)}/></Float>
   <ContactShadows opacity={.16} scale={7} blur={2.7} far={6} position={[0,-2.1,0]}/>
   {controls&&<OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI/3} maxPolarAngle={Math.PI/1.6}/>}
  </Canvas>
 </div>;
}
