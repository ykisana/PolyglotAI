import json5 from 'json5';

export async function getVocab(message: any, type: any) {
	console.log(message);
	try {
		const response = await fetch('/api/chat', {
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ messages: message, type }),
			method: 'POST'
		});
		if (!response.ok) {
			throw new Error('An error occurred while fetching data');
		}
		const json = await response.json();
		return convertToVocabList(json.choices[0].message.content);
	} catch (error) {
		throw new Error('Error Getting Vocab');
	}
}

function convertToVocabList(text: any) {
	console.log(text);
	console.log(typeof text);

	const arrStartIndex = text.indexOf('[');
	const arrEndIndex = text.lastIndexOf(']') + 1;
	const arr = text.substring(arrStartIndex, arrEndIndex);

	try {
		const parsed = json5.parse(arr.trim());
		return parsed;
	} catch (error) {
		console.log(error);
		throw new Error('Error converting to JSON');
	}
}
