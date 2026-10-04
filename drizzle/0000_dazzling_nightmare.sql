CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`website` text DEFAULT '' NOT NULL,
	`message` text NOT NULL,
	`interest` text NOT NULL,
	`source` text NOT NULL,
	`campaign` text DEFAULT '' NOT NULL,
	`created_at` integer NOT NULL,
	`status` text DEFAULT 'new' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_inquiries_email_created` ON `inquiries` (`email`,`created_at`);