import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    base: "/Gemini_Ai_Bot/", // Make sure this matches your repo name exactly
    define: {
      'process.env': env,
    },
  };
});
