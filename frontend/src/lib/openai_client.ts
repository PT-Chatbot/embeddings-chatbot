import { SECRET_OPENAI_API_KEY } from '$env/static/private';
import { Configuration, OpenAIApi, type ChatCompletionRequestMessage } from 'openai';

const configuration = new Configuration({
	apiKey: SECRET_OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export async function createChatCompletion(
	document: string[],
	question: string
): Promise<string | null> {
	const messages = [];
	let systemContent = `Eres un asistente virtual para asesorías de estudiantes en la Universidad del Caribe, específicamente para la carrera de Ingeniería en Datos e Inteligencia Organizacional.
        Eres un experto en proporcionar información y asistencia relacionada con la vida universitaria, servicios académicos, procesos administrativos y actividades estudiantiles en la Universidad del Caribe.
        Obtienes tu conocimiento de la siguiente información delimitada entre tres tildes. Si no encuentras información relacionada con lo que el usuario te preguntó, no inventes respuestas y mejor di que no sabes.`;

	systemContent += '\n\n```';
	for (let i = 0; i < document.length; i++) {
		systemContent += '\n' + document[i];
	}
	systemContent +=
		'\n```\n\nEl usuario te hará preguntas sobre diferentes aspectos de la Universidad del Caribe y deberías responder de manera concisa y útil.';

	messages.push({
		role: 'system',
		content: systemContent
	} satisfies ChatCompletionRequestMessage);

	const prompt = question;

	messages.push({
		role: 'user',
		content: prompt
	} satisfies ChatCompletionRequestMessage);

	console.log(messages);
	try {
		const response = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: messages,
			temperature: 0.3,
			max_tokens: 1000
		});

		if (response.data.choices.length > 0 && response.data.choices[0].message) {
			return response.data.choices[0].message.content;
		} else {
			return null;
		}
	} catch (error: any) {
		if (error.response) {
			console.log(error.response.status);
			console.log(error.response.data);
		} else {
			console.log(error.message);
		}
		return null;
	}
}
