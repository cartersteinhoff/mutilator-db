CREATE TYPE "public"."mutilator_type" AS ENUM('doctor', 'nurse', 'mohel');--> statement-breakpoint
ALTER TABLE "mutilators" ADD COLUMN "type" "mutilator_type" DEFAULT 'doctor' NOT NULL;--> statement-breakpoint
ALTER TABLE "mutilators" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "mutilators" ADD COLUMN "created_by" text;