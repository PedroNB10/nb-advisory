import { z } from 'zod';

// No trailing slash, so `${siteUrl}/pt` etc. never produces a double slash.
const envSchema = z.object({
  PUBLIC_SITE_URL: z
    .url()
    .refine((url) => !url.endsWith('/'), 'PUBLIC_SITE_URL must not have a trailing slash'),
});

const parsed = envSchema.safeParse({
  PUBLIC_SITE_URL: import.meta.env.PUBLIC_SITE_URL,
});

if (!parsed.success) {
  throw new Error(
    `Invalid environment configuration:\n${parsed.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n')}\n\nCopy .env.example to .env and set PUBLIC_SITE_URL.`,
  );
}

export const env = parsed.data;
