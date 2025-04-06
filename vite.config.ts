import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    allowedHosts: ['local.formula-predictor', 'formula-predictor.local'],
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
