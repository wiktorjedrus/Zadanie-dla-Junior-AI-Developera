import OpenAI from "openai";
import fs from "node:fs/promises";

async function processArticle() {
	try {
		const data = await fs.readFile("tresc artykulu.txt", {
			encoding: "utf8",
		});

		const openai = new OpenAI({
			apiKey: "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",
		});

		const completion = await openai.chat.completions.create({
			model: "gpt-4o",
			messages: [
				{
					role: "system",
					content:
						"You are a helpful assistant specializing in text processing and correction. Your task is to ensure that all words in the text are in Polish and free from spelling errors while maintaining the original meaning of the article. The corrected article must remain semantically correct and be returned wrapped in appropriate HTML tags. Additionally, you will insert <img> tags with the src attribute set to 'image_placeholder.jpg' and the alt attribute describing the images as related to AI. The alt tags need to be very specific so the AI model can generate an image based on them. You will preserve the original word order and phrasing, correcting only spelling mistakes. Always begin your response with an HTML tag and avoid adding unnecessary text or commentary.",
				},
				{
					role: "user",
					content: `
            ${data}
            Correct errors in the article and return it wrapped in the HTML tags. Don't add tags like <html>, <head> or <body> to your response. Make sure you will start you response with an <article> tag`,
				},
			],
		});

		console.log(completion.choices[0].message);

		const content = completion.choices[0].message.content;

		fs.writeFile("artykul.html", content, err => {
			if (err) {
				console.error(err);
			} else {
				console.log("File written successfully");
			}
		});
	} catch (err) {
		console.log(err);
	}
}

processArticle();
