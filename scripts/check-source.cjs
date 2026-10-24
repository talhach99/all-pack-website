/* Offline sanity checks; not a substitute for npm run build. */
const fs=require('node:fs'),path=require('node:path');
let ts; try { ts=require('typescript'); } catch { const globalRoot=require('node:child_process').execSync('npm root -g',{encoding:'utf8'}).trim(); ts=require(path.join(globalRoot,'typescript')); }
const root=path.resolve(__dirname,'..');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)])}
let errors=[];
let checked=0;
for(const file of walk(path.join(root,'src')).filter(f=>/\.tsx?$/.test(f))){
 const source=fs.readFileSync(file,'utf8');
 const r=ts.transpileModule(source,{fileName:file,reportDiagnostics:true,compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.Preserve}});
 for(const d of (r.diagnostics||[]))if(d.category===ts.DiagnosticCategory.Error)errors.push(`${path.relative(root,file)}: ${ts.flattenDiagnosticMessageText(d.messageText,' ')}`);
 for(const m of source.matchAll(/from\s+['"](@\/[^'"]+|\.\.?\/[^'"]+)['"]/g)){
   const imp=m[1];const base=imp.startsWith('@/')?path.join(root,'src',imp.slice(2)):path.resolve(path.dirname(file),imp);
   if(!['.ts','.tsx','.json','/index.ts','/index.tsx',''].some(ext=>fs.existsSync(base+ext)))errors.push(`${path.relative(root,file)}: Missing import ${imp}`);
 }
 checked++;
}
const products=JSON.parse(fs.readFileSync(path.join(root,'src/data/products.json'),'utf8'));
const slugs=new Set(products.map(p=>p.slug));
if(slugs.size!==products.length)errors.push('Duplicate product slug');
for(const p of products){for(const k of ['slug','name','category','description','fullDescription','materials','sizes','customization','moq','uses','hue','model'])if(!p[k]||(Array.isArray(p[k])&&!p[k].length))errors.push(`Product ${p.slug} missing ${k}`)}
for(const p of products)if(!fs.existsSync(path.join(root,'public/renders',p.model+'.webp')))errors.push(`Missing render for ${p.slug}: ${p.model}.webp`);
for(const route of ['contact','faq','about','gallery','insights','products','quote','studio','privacy'])if(!fs.existsSync(path.join(root,'src/app',route,'page.tsx')))errors.push(`Missing route: ${route}`);
console.log(`Source files: ${checked}, products: ${products.length}, routes: 9, errors: ${errors.length}`);
if(errors.length){for(const e of errors)console.error(e);process.exitCode=1;}
