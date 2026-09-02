CREATE TABLE IF NOT EXISTS `saved_deals` (
  `user_id` text NOT NULL,
  `deal_id` text NOT NULL,
  `created_at` integer NOT NULL DEFAULT (unixepoch()),
  PRIMARY KEY (`user_id`, `deal_id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `deal_alerts` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `user_id` text,
  `email` text NOT NULL,
  `keyword` text NOT NULL,
  `category` text,
  `minimum_discount` integer NOT NULL DEFAULT 15,
  `active` integer NOT NULL DEFAULT 1,
  `created_at` integer NOT NULL DEFAULT (unixepoch())
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_saved_deals_user_id` ON `saved_deals` (`user_id`);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_deal_alerts_user_active` ON `deal_alerts` (`user_id`, `active`);

