// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Bil Arikan',
			social: [

				{ icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/bilarikan/' },
				{ icon: 'mastodon', label: 'Mastodon', href: 'https://mastodon.social/@bilarikan' },
				{ icon: 'blueSky', label: 'Bluesky', href: 'https://bsky.app/profile/bilarikan.bsky.social' },
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/bilarikan' }
			],
			sidebar: [
				{ label: 'About', link: 'about' },	
				{ label: 'Contact', link: 'contact' },
				{ label: 'Projects', link: 'projects' },
				{
					label: 'Notebook',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Are We Building Learning for Past or Future?', link: 'notebook/are-we-building-learning-content-for-the-past-or-the-future' },
						{ label: 'AI storyteller for multilevel planning', link: 'notebook/thinking-through-a-new-project-ai-storyteller-for-multilevel-planning' },
						{ label: 'My first post on the personal site', slug: 'notebook/my-first-post-on-the-personal-site' },
					],
				},	
			],
			customCss: ['./src/styles/custom.css'],
		}),
	],
});
