import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
    build: {
        outDir: "./build",
    },
    plugins: [react()],
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});
