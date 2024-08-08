import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
	plugins: [
		react({
			jsxRuntime: 'classic',
		}),
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:5001',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
	optimizeDeps: {
		esbuildOptions: {
			loader: {
				'.js': 'jsx',
			},
		},
	},
	esbuild: {
		jsxInject: `import React from 'react'`,
	},
	build: {
		outDir: 'dist',
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id
							.toString()
							.split('node_modules/')[1]
							.split('/')[0]
							.toString();
					}
				},
			},
		},
		chunkSizeWarningLimit: 600, // Adjust the limit as needed
	},
});
