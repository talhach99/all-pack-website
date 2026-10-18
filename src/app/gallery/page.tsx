import type {Metadata} from 'next';
import { PageIntro } from '@/components/PageIntro';
import { GalleryGrid } from '@/components/GalleryGrid';
export const metadata:Metadata={title:'Gallery & Concepts',description:'Explore curated concept illustrations for custom packaging, gift boxes, shipping mailers and more.'};
export default function GalleryPage(){return <main><PageIntro eyebrow="PACKAGING INSPIRATION" title={<>Designed to be <span className="gradient-text">noticed.</span></>} description="A selection of illustrative packaging directions to spark ideas for your next product launch."/><section className="site-container section-pad"><GalleryGrid/></section></main>}
