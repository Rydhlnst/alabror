CREATE TABLE "santri_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"name" text NOT NULL,
	"phone" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "santri_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "santri_registrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"jenjang" text NOT NULL,
	"nama_lengkap" text NOT NULL,
	"tempat_lahir" text NOT NULL,
	"tanggal_lahir" text NOT NULL,
	"jenis_kelamin" text NOT NULL,
	"alamat" text NOT NULL,
	"nama_ortu" text NOT NULL,
	"telepon_ortu" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "santri_registrations" ADD CONSTRAINT "santri_registrations_user_id_santri_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."santri_users"("id") ON DELETE cascade ON UPDATE no action;
