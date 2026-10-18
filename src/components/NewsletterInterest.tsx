'use client';
import {FormEvent, useState} from 'react';
import {ArrowRight, CheckCircle2} from 'lucide-react';
import {COMPANY} from '@/lib/company';
export function NewsletterInterest(){
 const [state,setState]=useState<'idle'|'sending'|'success'|'error'>('idle');
 const [message,setMessage]=useState('');
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault(); const form=e.currentTarget;
  if(!form.reportValidity())return;
  setState('sending');setMessage('');
  try{const response=await fetch('/api/newsletter',{method:'POST',body:new FormData(form)});
   const json=await response.json() as {ok:boolean,message:string};
   if(!response.ok||!json.ok)throw new Error(json.message);
   setState('success');setMessage(json.message);form.reset();
  }catch(error){setState('error');setMessage(error instanceof Error?error.message:'Unable to send request');}
 }
 return <div className="mt-7 max-w-sm"><h3 className="mb-2 font-semibold">Packaging ideas in your inbox</h3><p className="mb-4 text-xs leading-6 text-muted">Request occasional updates about packaging ideas. This is an interest request, not an automatic subscription.</p>
  {state==='success'?<p role="status" className="flex items-start gap-2 text-sm text-[#238668]"><CheckCircle2 size={18} className="mt-0.5 shrink-0"/>{message}</p>:
  <form onSubmit={submit} className="space-y-3"><input className="input !min-h-10" type="email" name="email" maxLength={200} required aria-label="Email for packaging updates" placeholder="Your work email" />
    <div className="hidden" aria-hidden="true"><input name="website" autoComplete="off" tabIndex={-1}/></div>
    <label className="flex items-start gap-2 text-xs leading-5 text-muted"><input type="checkbox" name="consent" value="yes" required className="mt-1 shrink-0 accent-[#303C85]"/><span>I agree to receive packaging updates by email and understand I can request removal.</span></label>
    {state==='error'&&<p className="text-xs leading-5 text-red-700 dark:text-red-300" role="alert">{message} <a className="font-semibold underline" href={`mailto:${COMPANY.email}?subject=Packaging%20updates%20request`}>Request updates by email</a>.</p>}
    <button disabled={state==='sending'} type="submit" className="btn-outline !min-h-10 w-full">{state==='sending'?'Sending request...':'Request updates'} <ArrowRight size={15}/></button>
  </form>}
 </div>
}
