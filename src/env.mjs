import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    STRAPI_API_TOKEN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_STRAPI_API_URL: z.string().url(),
  },
  runtimeEnv: {
    STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
    NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
  },
}); 