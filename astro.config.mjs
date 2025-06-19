// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Bil Arikan',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/bilarikan' },
				{ icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/bilarikan/' },
				{ icon: 'mastodon', label: 'Mastodon', href: 'https://mastodon.social/@bilarikan' },
				{ icon: 'blueSky', label: 'Bluesky', href: 'https://bsky.app/profile/bilarikan.bsky.social' }
			],
			sidebar: [
				{ label: 'About', link: 'about' },	
				{ label: 'Contact', link: 'contact' },		
				{
					label: 'Notebook',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Notebook example', slug: 'notebook/example' },
					],
				},
				{
					label: 'Projects',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Project example', slug: 'projects/example' },
					],
				},		
			],
			customCss: ['./src/styles/custom.css'],
		}),
	],
});
