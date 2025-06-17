// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: '',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/bilarikan' },
				{ icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/bilarikan/' },
				{ icon: 'mastodon', label: 'Mastodon', href: 'https://mastodon.social/@bilarikan' }
			],
			sidebar: [
				{ label: 'Bil Arikan', link: '/'},							

				{
					label: 'Projects',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Project example', slug: 'projects/example' },
					],
				},

				{
					label: 'Notebook',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Notebook example', slug: 'notebook/example' },
					],
				},

				{ label: 'About', link: 'about' },	

				{ label: 'Contact', link: 'contact' },				

			],
			customCss: ['./src/styles/custom.css'],
		}),
	],
});
