import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { reactRouterDevTools } from 'react-router-devtools';

export default defineConfig({
  server: {
    allowedHosts: ['local.formula-predictor', 'formula-predictor.local', 'witty-paths-warn.loca.lt'],
  },
  plugins: [
    // TODO: only dev tools on dev
    //reactRouterDevTools(),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
});
