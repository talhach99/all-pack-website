import { Reveal } from './Reveal';
export function SectionHeading({eyebrow,title,description,center=false}:{eyebrow:string;title:React.ReactNode;description?:string;center?:boolean}){
return <Reveal className={`mb-12 ${center?'mx-auto max-w-2xl text-center':''}`}><p className="eyebrow"> <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#3689c9]"/>{eyebrow}</p><h2 className="section-title">{title}</h2>{description&&<p className={`lead mt-5 ${center?'mx-auto':''} max-w-2xl`}>{description}</p>}</Reveal>
}
