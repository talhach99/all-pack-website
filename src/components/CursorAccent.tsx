'use client';
import {useEffect, useState} from 'react';
import {motion, useMotionValue, useSpring} from 'framer-motion';
/** Decorative pointer halo on desktop. Never hides the operating-system cursor. */
export function CursorAccent(){
 const x=useMotionValue(-100), y=useMotionValue(-100);
 const springX=useSpring(x,{stiffness:420,damping:38,mass:.6});
 const springY=useSpring(y,{stiffness:420,damping:38,mass:.6});
 const [show,setShow]=useState(false),[hover,setHover]=useState(false);
 useEffect(()=>{
  const media=window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
  if(!media.matches)return;
  const onMove=(event:MouseEvent)=>{
   x.set(event.clientX);y.set(event.clientY);setShow(true);
   setHover(event.target instanceof Element && Boolean(event.target.closest('a,button,[role="button"],input,select,textarea')));
  };
  const onLeave=()=>setShow(false);
  window.addEventListener('mousemove',onMove,{passive:true});document.addEventListener('mouseleave',onLeave);
  return ()=>{window.removeEventListener('mousemove',onMove);document.removeEventListener('mouseleave',onLeave)};
 },[x,y]);
 return <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[110] hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#387EB7]/65 bg-[#6db0ed]/[.08] shadow-[0_0_22px_rgba(65,120,214,.13)] lg:block" animate={{width:hover?52:26,height:hover?52:26,opacity:show?1:0}} transition={{duration:.2}} style={{x:springX,y:springY}}/>;
}
