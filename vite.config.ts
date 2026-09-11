import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { wgslVitePlugin } from "@vgpu/wgsl/loader-vite"
import path from "node:path"
export default defineConfig({plugins:[wgslVitePlugin(),react(),tailwindcss()],resolve:{alias:{"@":path.resolve(import.meta.dirname,".")}},server:{host:"0.0.0.0",allowedHosts:true}})
