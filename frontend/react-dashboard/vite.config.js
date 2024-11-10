import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // exclude: ['react-dom'],
    // include: ["react-beautiful-dnd"]
  },
  
  // build: {
  //   rollupOptions: {
  //     external: ['react', 'react-dom'] // Mark react-dom as external
  //   }
  // }
})
