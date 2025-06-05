import { defineConfig } from 'cypress';

export default defineConfig({
	component: {
		devServer: {
			framework: 'react',
			bundler: 'webpack',
			webpackConfig: require('@cypress/webpack-preprocessor'),
		},
	},

	supportFolder: 'cypress/support',

	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
