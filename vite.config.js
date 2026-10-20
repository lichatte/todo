import { defineConfig } from 'vite';

export default defineConfig({
  // Tell Vite your source files live inside the 'app' folder
  root: 'app',
  base: './',
  build: {
    // Mimics your Gulp destination task mapping to 'docs' instead of 'dist'
    outDir: '../docs',
    // Automatically clears the old 'docs' folder before building (replaces del/clean:docs)
    emptyOutDir: true, 
    // Minifies your JavaScript assets (replaces gulp-uglify)
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Keeps file names clean, similar to how your Gulp tasks structured them
        assetFileNames: 'css/[name].[ext]',
        chunkFileNames: 'js/[name].js',
        entryFileNames: 'js/[name].js',
      },
    },
  },

  server: {
    // Configures your development server configurations (replaces browser-sync)
    port: 3000,
    open: true, // Opens browser on start automatically
  },
});