import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    plugins: [
        react(),
        tailwindcss(),
        VitePWA({
            registerType: "autoUpdate",
            strategies: "injectManifest",
            srcDir: "src",
            filename: "sw.ts",
            injectManifest: {
                swSrc: "src/sw.ts",
                swDest: "dist/sw.js",
            },
            manifest: {
                scope: "/",
                name: "Parko",
                short_name: "Parko",
                theme_color: "#ffffff",
                background_color: "#ffffff",
                icons: [
                    {
                        src: "pwa-64x64.png",
                        sizes: "64x64",
                        type: "image/png",
                    },
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "maskable-icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
                start_url: "/",
                display: "standalone",
                orientation: "portrait",
            },
        }),
    ],
    server: {
        allowedHosts: true,
    },
    preview: {
        allowedHosts: ["*"],
    },
});
