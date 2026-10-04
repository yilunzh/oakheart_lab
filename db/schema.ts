import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
export const inquiries = sqliteTable("inquiries", {
 id:text("id").primaryKey(), name:text("name").notNull(), email:text("email").notNull(),
 website:text("website").notNull().default(""), message:text("message").notNull(),
 interest:text("interest").notNull(), source:text("source").notNull(), campaign:text("campaign").notNull().default(""),
 createdAt:integer("created_at").notNull(), status:text("status").notNull().default("new"),
},(table)=>[index("idx_inquiries_email_created").on(table.email,table.createdAt)]);
