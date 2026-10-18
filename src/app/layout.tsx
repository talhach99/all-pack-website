import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { COMPANY, phoneLink } from '@/lib/company';
export const metadata:Metadata={
 metadataBase:new URL(COMPANY.siteUrl),
 title:{default:'ALL PACK | The Packaging Experts',template:'%s | ALL PACK'},
 description:'Explore bespoke packaging and print concepts from ALL PACK, Lahore. Shipping boxes, custom printed packaging, retail cartons, food packaging and more.',
 applicationName:'ALL PACK',
 openGraph:{title:'ALL PACK — The Packaging Experts',description:'Packaging made to protect. Designed to impress.',type:'website',locale:'en_PK',siteName:'ALL PACK',images:[{url:'/og-image.png',width:1200,height:630,alt:'ALL PACK — The Packaging Experts'}]},
 twitter:{card:'summary_large_image',images:['/og-image.png']},
 robots:{index:true,follow:true}
};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#303C85'};
export default function RootLayout({children}:{children:React.ReactNode}){
 const schema={'@context':'https://schema.org','@type':'Organization',name:COMPANY.name,slogan:COMPANY.tagline,email:COMPANY.email,telephone:phoneLink()?.slice(4),url:COMPANY.siteUrl,address:{'@type':'PostalAddress',streetAddress:'Office No. 33, Ali Arcade, 7 Royal Park, Lakshmi Chowk',addressLocality:'Lahore',addressCountry:'PK'},logo:`${COMPANY.siteUrl}/logo.svg`};
 return <html lang="en" suppressHydrationWarning><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/><Providers><Header/>{children}<Footer/><WhatsAppFloat/></Providers></body></html>;
}
