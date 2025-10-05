import { INCEPTION_API_KEY } from '$env/static/private';
import type { PageServerLoad } from './$types';

const systemPrompt = `You are a website generator, you will generate the content in html format, you are allowed to use inline styles or style tags, the content you generate wil slot into the body tag so you ought not include the body tag or html tag, you will generate a website based soly on the route the user requests, include no other content in your response. FOLLOW THESE RULES:
1. You will generate a complete website for the route the user requests.
2. You will not include any images
4. Be bold with the web design, use many colors, and different styles, make it look good.
5. You will include links to other routes on the website, these will be generated when clicked so dont worry about them not existing.
6. always include internal links to other pages on the website.
7. the route in the links should be descriptive of the content on the page, nesting is allowed. make the links highly verbose and descriptive.
8. script elements are allowed!!
`;

export const load = (async (req) => {
	// Using fetch API
	const response = await fetch('https://api.inceptionlabs.ai/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${INCEPTION_API_KEY}`
		},
		body: JSON.stringify({
			model: 'mercury-coder',
			messages: [
				{ role: 'system', content: systemPrompt },
				{
					role: 'user',
					content: `Create a website for the route ${req.url.pathname}. the users previous route was ${JSON.stringify(req.request)}`
				}
			],
			max_tokens: 1000
		})
	});

	const data = await response.json();
	console.log((data.choices[0].message.content as string).replaceAll('```', ''));

	return { content: (data.choices[0].message.content as string).replaceAll('```', '') };
}) satisfies PageServerLoad;
