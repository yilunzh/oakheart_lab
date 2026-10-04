import { env } from "cloudflare:workers";
export function getRawDb(){if(!env.DB)throw new Error("Inquiry storage unavailable");return env.DB;}
