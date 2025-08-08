// src/config/env.ts
import Joi from "joi";

type Env = {
  VITE_TOKEN_HIDEOUT: string;
  VITE_BEARER: string;
  VITE_API_URL: string;
};

const schema = Joi.object<Env>({
  VITE_TOKEN_HIDEOUT: Joi.string().required(),
  VITE_BEARER: Joi.string().required(),
  VITE_API_URL: Joi.string().uri().required(),
}).unknown(true);

const { error, value: envVars } = schema.validate(import.meta.env, {
  abortEarly: false,
});

if (error) {
  console.error("❌ Invalid environment variables:");
  error.details.forEach((detail) => {
    console.error(`  - ${detail.message}`);
  });
  throw new Error("Environment validation failed");
}

export const Env: Env = envVars;
