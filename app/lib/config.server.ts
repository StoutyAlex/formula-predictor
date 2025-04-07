interface ViteEnv {
  VITE_NODE_ENV: string;
  VITE_JWT_PRIVATE_KEY: string;
  VITE_JWT_PUBLIC_KEY: string;
}

export const viteEnv: ViteEnv = {
  VITE_NODE_ENV: import.meta.env.VITE_NODE_ENV,
  VITE_JWT_PRIVATE_KEY: import.meta.env.VITE_JWT_PRIVATE_KEY,
  VITE_JWT_PUBLIC_KEY: import.meta.env.VITE_JWT_PUBLIC_KEY,
};

export const isDev = viteEnv.VITE_NODE_ENV === 'development';
export const isProd = viteEnv.VITE_NODE_ENV !== 'development';

export const applicationConfig = {
  jwt: {
    privateKey: viteEnv.VITE_JWT_PRIVATE_KEY,
    publicKey: viteEnv.VITE_JWT_PUBLIC_KEY,
  },
};

const validateEnv = (env: ViteEnv) => {
  const missingKeys = Object.entries(env)
    .filter(([_, value]) => !value)
    .map(([key]) => key);
  if (missingKeys.length > 0) {
    throw new Error(`Missing environment variables: ${missingKeys.join(', ')}`);
  }
};

console.log('Vite Environment Variables:', JSON.stringify(viteEnv, null, 2));
validateEnv(viteEnv);
