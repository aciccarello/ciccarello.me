import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

/**
 * Setup for reveal.js slides
 *
 * @param   {import("@11ty/eleventy").UserConfig}  eleventyConfig  Eleventy config object
 *
 * @return  {void}
 */
export default function (eleventyConfig) {
	const plugins = [
		'plugin/highlight/highlight.esm.js',
		'plugin/highlight/highlight.js',
		'plugin/markdown/markdown.esm.js',
		'plugin/notes/notes.esm.js',
	].map((fileName) => [
		require.resolve('reveal.js/' + fileName),
		'assets/js/reveal/' + fileName,
	]);
	eleventyConfig.addPassthroughCopy({
		[require.resolve('reveal.js').replace(/\/dist\/.*/, '/dist/')]:
			'assets/js/reveal/',
		...Object.fromEntries([...plugins]),
	});
	eleventyConfig.addPairedShortcode('slides', (content) => {
		return `
<link rel="stylesheet" href="/assets/js/reveal/reveal.css" />
<link rel="stylesheet" href="/assets/js/reveal/theme/black.css" />
<script src="/assets/js/reveal/plugin/highlight/highlight.js"></script>
<h2 id="slides">Slides</h2>
<div class="reveal">
	<div class="slides">
		<section data-markdown>
			<textarea data-template>
${content}
			</textarea>
		</section>
	</div>
</div>
<p>Press "F" to enter full screen mode. Press "O" to view overview.</p>
<script type="module">
	import Reveal from '/assets/js/reveal/reveal.esm.js';
	import RevealHighlight from '/assets/js/reveal/plugin/highlight/highlight.esm.js';
	import RevealMarkdown from '/assets/js/reveal/plugin/markdown/markdown.esm.js';
	import RevealNotes from '/assets/js/reveal/plugin/notes/notes.esm.js';
	console.log("initializing reveal");
	Reveal.initialize({
		plugins: [RevealHighlight, RevealMarkdown, RevealNotes],
		showNotes: false,
		embedded: true,
	});
	console.log("initializing done");
	console.log(Reveal.getPlugins());
</script>
`;
	});
}
