import type {Metadata} from 'next';
import { PageIntro } from '@/components/PageIntro';
import { StudioConfigurator } from '@/components/StudioConfigurator';
export const metadata:Metadata={title:'Custom Packaging Studio',description:'Explore a live 3D packaging concept and send dimensions, material, colour and artwork for a personalized quote.'};
export default function StudioPage(){return <main><PageIntro eyebrow="SIGNATURE EXPERIENCE" title={<>Your packaging. <span className="gradient-text">Your imagination.</span></>} description="Experiment with shape, size, colour and finish in our interactive concept studio. Submit your preferences to request a production quotation."/><section className="site-container section-pad"><StudioConfigurator/></section></main>}
