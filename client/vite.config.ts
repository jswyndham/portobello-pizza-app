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
});
