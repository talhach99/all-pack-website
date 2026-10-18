"use client";
import { motion, useReducedMotion } from 'framer-motion';
export function Reveal({children,className='',delay=0}:{children:React.ReactNode;className?:string;delay?:number}){const reduced=useReducedMotion();return <motion.div className={className} initial={reduced?false:{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:reduced?0:.6,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>}
