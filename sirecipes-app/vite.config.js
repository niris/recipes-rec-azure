import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
//import env from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
