import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import markdoc from "@astrojs/markdoc";
import AstroPWA from "@vite-pwa/astro";
import type { ManifestOptions } from "vite-plugin-pwa";
import manifest from "./webmanifest.json";

// https://astro.build/config
export default defineConfig({
	site: "https://sanabel-al-firdaws.github.io",
	integrations: [
		AstroPWA({
			mode: "production",
			registerType: "autoUpdate",
			includeAssets: ["favicon.svg"],
			workbox: {
				navigateFallback: "/404",
				globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,json}"],
				// runtimeCaching:  Cache quran Api responses
			},
			experimental: {
				directoryAndTrailingSlashHandler: true,
			},
			manifest: manifest as Partial<ManifestOptions>,
		}),
		starlight({
			tableOfContents: {
				minHeadingLevel: 1,
				maxHeadingLevel: 6,
			},
			customCss: [
				"./src/styles/custom.css",
				"./src/fonts/font-face.css",
			],
			components: {
				ThemeProvider: "./src/components/starlight/ThemeProvider.astro",
			},
			title: "سنابل الفردوس",
			description: "موقع يهتم بنشر العلم النافع",
			// titleDelimiter: '-',
			defaultLocale: "en",
			sidebar: [
				{
					label: "The Book Of Aqida",
					collapsed: true,
					items: [
						{
							collapsed: true,
							label: "مقدمة كتاب العقيدة",
							link: "/aqida/intro/",
						},
						{
							collapsed: true,
							label: "باب الإسلام",
							autogenerate: {
								directory: "aqida/al-islam",
							},
						},
						{
							collapsed: true,
							label: "باب الإيمان",
							autogenerate: {
								directory: "aqida/al-eman",
							},
						},
						{
							collapsed: true,
							label: "باب الإحسان",
							autogenerate: {
								directory: "aqida/al-ehsan",
							},
						},
					],
				},
				{
					collapsed: true,
					label: "كتاب الأحاديث",
					autogenerate: {
						directory: "hadith",
					},
				},
			],
		}),
		markdoc(),
	],
});
