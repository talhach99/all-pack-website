import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { COMPANY } from '@/lib/company';

export const runtime='nodejs';
const schema=z.object({
 name:z.string().trim().min(2).max(120),email:z.string().trim().email().max(200),
 company:z.string().trim().max(150),phone:z.string().trim().max(50),
 quantity:z.coerce.number().int().min(1).max(10_000_000),dimensions:z.string().trim().max(180),
 products:z.string().trim().max(2500),notes:z.string().trim().min(5).max(5000),
 website:z.string().max(200)
});
const esc=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));

async function checkRateLimit(ip:string){
 const url=process.env.UPSTASH_REDIS_REST_URL;const token=process.env.UPSTASH_REDIS_REST_TOKEN;
 if(!url||!token)return {allowed:true};
 const key=`allpack:quote:${ip.replace(/[^a-z0-9.:_-]/gi,'').slice(0,90)}`;
 try{
  const res=await fetch(`${url.replace(/\/$/,'')}/pipeline`,{
   method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},
   body:JSON.stringify([['INCR',key],['EXPIRE',key,3600]]),cache:'no-store'
  });
  if(!res.ok) return {allowed:false};
  const data=(await res.json()) as Array<{result?:number}>;
  return {allowed:Number(data?.[0]?.result||0)<=8};
 }catch{return {allowed:false};}
}

export async function POST(request:NextRequest){
 // Built for POST form submission only. Deployment should enable a bot challenge/WAF as well.
 const origin=request.headers.get('origin');
 if(origin){try{if(new URL(origin).host!==request.nextUrl.host)return NextResponse.json({ok:false,message:'Invalid request origin.'},{status:403});}catch{return NextResponse.json({ok:false,message:'Invalid request origin.'},{status:403});}}
 const contentType=request.headers.get('content-type')||'';
 if(!contentType.includes('multipart/form-data'))return NextResponse.json({ok:false,message:'Invalid form format.'},{status:415});
 let form:FormData;
 try{form=await request.formData()}catch{return NextResponse.json({ok:false,message:'Unable to read the form.'},{status:400});}
 const raw=Object.fromEntries(['name','email','company','phone','quantity','dimensions','products','notes','website'].map(k=>[k,String(form.get(k)||'')]));
 const parsed=schema.safeParse(raw);
 if(!parsed.success)return NextResponse.json({ok:false,message:'Check required fields and enter a valid email and quantity.'},{status:400});
 const v=parsed.data;
 if(v.website)return NextResponse.json({ok:true,message:'Thank you.'}); // spam honeypot: do not send
 const file=form.get('artwork');
 let attachment: {filename:string;content:string}|undefined;
 if(file instanceof File&&file.size>0){
  const allowed=['image/png','image/jpeg','application/pdf'];
  if(!allowed.includes(file.type)||file.size>4*1024*1024)return NextResponse.json({ok:false,message:'Artwork must be a PNG, JPG or PDF no larger than 4 MB.'},{status:400});
  attachment={filename:file.name.replace(/[^a-z0-9._-]/gi,'_').slice(0,100)||'artwork',content:Buffer.from(await file.arrayBuffer()).toString('base64')};
 }
 if(!process.env.RESEND_API_KEY||!process.env.RESEND_FROM_EMAIL){
  return NextResponse.json({ok:false,configurationRequired:true,message:`Online delivery is not enabled yet. Please email ${COMPANY.email} directly.`},{status:503});
 }
 const ip=request.headers.get('cf-connecting-ip')||request.headers.get('x-real-ip')||request.headers.get('x-forwarded-for')?.split(',')[0]||'unknown';
 const rate=await checkRateLimit(ip);
 if(!rate.allowed)return NextResponse.json({ok:false,message:'Please wait before submitting another inquiry.'},{status:429});
 const fields=[['Name',v.name],['Email',v.email],['Company',v.company],['Phone',v.phone],['Quantity',String(v.quantity)],['Dimensions',v.dimensions],['Products/Studio',v.products],['Notes',v.notes]];
 const html=`<div style="font-family:Arial,sans-serif;max-width:650px;margin:auto"><h1>New ALL PACK quote inquiry</h1><p>Submitted from the website.</p><table style="border-collapse:collapse;width:100%">${fields.map(([k,val])=>`<tr><th style="padding:10px;border-bottom:1px solid #ddd;text-align:left">${esc(k)}</th><td style="padding:10px;border-bottom:1px solid #ddd">${esc(val).replace(/\n/g,'<br>')}</td></tr>`).join('')}</table><p>Reply directly to the customer email above.</p></div>`;
 try{
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.RESEND_FROM_EMAIL,to:[process.env.QUOTE_TO_EMAIL||COMPANY.email],reply_to:v.email,subject:`ALL PACK quote request — ${v.name}`,html,attachments:attachment?[attachment]:undefined}),cache:'no-store'});
  if(!response.ok){console.error('Resend rejected the message',response.status);return NextResponse.json({ok:false,message:'Your inquiry could not be delivered. Please email us directly.'},{status:502});}
  return NextResponse.json({ok:true,message:'Your inquiry was sent to ALL PACK.'});
 }catch(error){console.error('Quote transport failure',error instanceof Error?error.message:'unknown');return NextResponse.json({ok:false,message:'Connection problem. Please email us directly.'},{status:502});}
}
