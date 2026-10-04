// Bounded handler tests against SQLite. No network calls or production data.
const fs=require('node:fs');const ts=require('typescript');const {DatabaseSync}=require('node:sqlite');const {randomUUID}=require('node:crypto');const assert=require('node:assert/strict');
const sqlite=new DatabaseSync(':memory:');sqlite.exec(fs.readFileSync('drizzle/0000_dazzling_nightmare.sql','utf8'));let available=true;
const db={
 prepare(sql){
  return {bind(...values){
   return {
    async first(){return sqlite.prepare(sql).get(...values)||null},
    async run(){return sqlite.prepare(sql).run(...values)}
   };
  }};
 }
};
const moduleExports={};const compiled=ts.transpileModule(fs.readFileSync('app/api/inquiries/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
new Function('require','exports',compiled)((id)=>id==='@/db/raw'?{getRawDb(){if(!available)throw Error('offline');return db}}:require(id),moduleExports);
const seed={requestId:randomUUID(),name:'Synthetic QA',email:'handler-qa@example.com',website:'example.com',message:'Synthetic handler test only.',interest:'website-booking',source:'qa',campaign:'',companyFax:''};
const send=(body,extra={})=>moduleExports.POST(new Request('https://test.example/api/inquiries',{method:'POST',headers:{'Content-Type':'application/json',Origin:'https://test.example',...extra},body:typeof body==='string'?body:JSON.stringify(body)}));
(async()=>{
assert.equal((await send({...seed,email:'bad'})).status,400);
assert.equal((await send('{bad')).status,400);
assert.equal((await send(seed,{Origin:'https://other.example'})).status,403);
assert.equal((await send(seed,{'Content-Type':'text/plain'})).status,415);
assert.equal((await send({...seed,message:'x'.repeat(17000)})).status,413);
assert.equal((await send({...seed,companyFax:'spam'})).status,400);
assert.equal((await send(seed)).status,201);
assert.equal((await send(seed)).status,200);
assert.equal(sqlite.prepare('SELECT COUNT(*) AS n FROM inquiries').get().n,1);
for(let i=0;i<4;i++)assert.equal((await send({...seed,requestId:randomUUID()})).status,201);
assert.equal((await send({...seed,requestId:randomUUID()})).status,429);
for(const interest of ['mobile-app','back-office','customer-support']){
 const id=randomUUID();assert.equal((await send({...seed,requestId:id,email:interest+'@example.com',interest})).status,201);
 assert.equal(sqlite.prepare('SELECT interest FROM inquiries WHERE id = ?').get(id).interest,interest);
}
assert.equal((await send({...seed,interest:'unknown-service'})).status,400);
available=false;assert.equal((await send({...seed,requestId:randomUUID(),email:'offline@example.com'})).status,503);
console.log('PASS: validation, malformed JSON, origin, content type, size, honeypot, persistence, deduplication, rate limit, storage failure.');sqlite.close();
})().catch(e=>{console.error(e);process.exitCode=1});
