import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/basic animations',
	resolve: {
		alias: {
			'@' : path.resolve(__dirname, './src'),
			'@assets' : path.resolve(__dirname, './src/assets'),
			'@models' : path.resolve(__dirname, './public/models'),
			'@core' : path.resolve(__dirname, './src/core'),
		},
	},
});