import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {COMPANY} from '@/lib/company';
export const runtime='nodejs';
const schema=z.object({email:z.string().email().max(200),consent:z.literal('yes'),website:z.string().max(200)});
export async function POST(req:NextRequest){
 const origin=req.headers.get('origin');
 if(origin){try{if(new URL(origin).host!==req.nextUrl.host)return NextResponse.json({ok:false,message:'Invalid request origin.'},{status:403});}catch{return NextResponse.json({ok:false,message:'Invalid request origin.'},{status:403});}}
 if(!req.headers.get('content-type')?.includes('multipart/form-data'))return NextResponse.json({ok:false,message:'Invalid form format.'},{status:415});
 let form:FormData;
 try{form=await req.formData()}catch{return NextResponse.json({ok:false,message:'Invalid form data.'},{status:400});}
 const parsed=schema.safeParse({email:String(form.get('email')||'').trim(),consent:String(form.get('consent')||''),website:String(form.get('website')||'')});
 if(!parsed.success)return NextResponse.json({ok:false,message:'Enter a valid email and confirm your consent.'},{status:400});
 if(parsed.data.website)return NextResponse.json({ok:true,message:'Thank you for your interest.'});
 if(!process.env.RESEND_API_KEY||!process.env.RESEND_FROM_EMAIL)return NextResponse.json({ok:false,message:'Email updates are not set up yet.'},{status:503});
 try{
  const response=await fetch('https://api.resend.com/emails',{method:'POST',cache:'no-store',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.RESEND_FROM_EMAIL,to:[process.env.QUOTE_TO_EMAIL||COMPANY.email],subject:'ALL PACK — newsletter interest request',text:`Newsletter interest request: ${parsed.data.email}\nConsent given via newsletter form (yes).\nThis is a request for manual review, not automatic enrolment.\nOnly add after appropriate subscription confirmation.`})});
  if(!response.ok)return NextResponse.json({ok:false,message:'We could not receive this request. Please email us.'},{status:502});
  return NextResponse.json({ok:true,message:'Your request was received. This does not automatically subscribe you.'});
 }catch{return NextResponse.json({ok:false,message:'We could not connect. Please email us.'},{status:502});}
}
