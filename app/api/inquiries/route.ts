import { getRawDb } from "@/db/raw";
import { z } from "zod";
const schema=z.object({requestId:z.string().uuid(),name:z.string().trim().min(1).max(100),email:z.string().trim().email().max(254).transform(s=>s.toLowerCase()),website:z.string().trim().max(500).default(""),message:z.string().trim().min(10).max(3000),interest:z.enum(["website-booking","ai-workflow","mobile-app","back-office","customer-support"]).default("website-booking"),source:z.string().max(120).default("direct"),campaign:z.string().max(200).default(""),companyFax:z.string().max(100).optional()});
function json(body:unknown,status=200){return Response.json(body,{status,headers:{"Cache-Control":"no-store"}});}
export async function POST(request:Request){
 const origin=request.headers.get('origin');
 if(origin&&origin!==new URL(request.url).origin)return json({error:"Please submit the form from this website."},403);
 if(!request.headers.get('content-type')?.includes('application/json'))return json({error:"Invalid request format."},415);
 if(Number(request.headers.get('content-length')||0)>16000)return json({error:"Your message is too long."},413);
 let raw:unknown;try{const text=await request.text();if(text.length>16000)return json({error:"Your message is too long."},413);raw=JSON.parse(text);}catch{return json({error:"Please check the form and try again."},400);}
 const parsed=schema.safeParse(raw);if(!parsed.success)return json({error:"Please enter your name, a valid email, and a message of 10–3,000 characters."},400);
 const d=parsed.data;if(d.companyFax)return json({error:"Unable to accept this submission. Please email us."},400);
 try{const db=getRawDb();const existing=await db.prepare('SELECT id FROM inquiries WHERE id = ? AND email = ?').bind(d.requestId,d.email).first();if(existing)return json({reference:d.requestId.slice(0,8)});
 const recent=await db.prepare('SELECT COUNT(*) AS total FROM inquiries WHERE email = ? AND created_at > ?').bind(d.email,Date.now()-86400000).first<{total:number}>();if(recent&&recent.total>=5)return json({error:"You’ve sent several inquiries today. Please email us for further updates."},429);
 await db.prepare('INSERT INTO inquiries (id,name,email,website,message,interest,source,campaign,created_at,status) VALUES (?,?,?,?,?,?,?,?,?,?)').bind(d.requestId,d.name,d.email,d.website,d.message,d.interest,d.source,d.campaign,Date.now(),'new').run();
 return json({reference:d.requestId.slice(0,8)},201);
 }catch{console.error('inquiry_storage_failure');return json({error:"We couldn’t save your inquiry. Your text is still here—please try again or email yilun@oakheartlab.com."},503);}
}
