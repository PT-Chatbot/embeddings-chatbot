<script lang="ts">
	import { PUBLIC_PROCESS_FILES_SERVER } from '$env/static/public';
	import { CodeBlock, ProgressBar } from '@skeletonlabs/skeleton';

	let query = '';
	let documents: string[] = [];
	let metadatas: MetaData[] = [];
	let parsedTextBlocks: TextBlock[] = [];
	let loading = false;

	interface QueryResult {
		documents: string[][];
		distances: number[][];
		metadatas: MetaData[][];
		arsedTextBlocks: TextBlock[][];
	}

	interface MetaData {
		document_title: string;
		file_name: string;
	}

async function queryEmbeddings() {
    loading = true;
    try {
        const response = await fetch(`${PUBLIC_PROCESS_FILES_SERVER}/query?text=${query}`, {
            method: 'GET'
        });
        console.log('response: ', parsedTextBlocks);
        if (response.ok) {
            let result: QueryResult = await response.json();
            if (result.documents.length > 0) {
                documents = result.documents[0];
                metadatas = result.metadatas[0];
                parsedTextBlocks = await queryLLM();
            } else {
                console.error('No documents found.');
                documents = [];
                metadatas = [];
                parsedTextBlocks = [];
            }
        } else {
            console.error('Failed to fetch data');
            parsedTextBlocks = [];
        }
    } catch (error) {
        console.error('Error querying embeddings:', error);
        parsedTextBlocks = [];
    } finally {
        loading = false;
    }
}

async function queryLLM(): Promise<TextBlock[]> {
    try {
        const response = await fetch('/query_bot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query,
                documents: documents
            })
        });
				console.log('response: ', response);
        if (response.ok) {
            let result = await response.json();
						console.log('result: ', result);
						console.log('result.answer: ', result.answer);
						console.log('parseText(result.answer): ', parseText(result.answer));
						console.log("Success query LLM")
            return parseText(result.answer);
        } else {
            console.error('Failed to query LLM');
            return [];
        }
    } catch (error) {
        console.error('Error querying LLM:', error);
        return [];
    }
}


	interface TextBlock {
		isCodeBlock: boolean;
		text: string;
		language?: string;
	}

	function parseText(text: string): TextBlock[] {
		const regex = /```([\w-]+)?\s*([\s\S]+?)\s*```/g;
		const blocks: TextBlock[] = [];
		let lastIndex = 0;
		let match;

		while ((match = regex.exec(text))) {
			const [fullMatch, language, code] = match;
			const preMatch = text.slice(lastIndex, match.index);
			if (preMatch) {
				blocks.push({ isCodeBlock: false, text: preMatch });
			}
			blocks.push({ isCodeBlock: true, text: code, language });
			lastIndex = match.index + fullMatch.length;
		}

		const lastBlock = text.slice(lastIndex);
		if (lastBlock) {
			blocks.push({ isCodeBlock: false, text: lastBlock });
		}

		return blocks;
	}
</script>

<div class="flex justify-center items-center p-4">
	<div class="m-11 card h-full w-3/4">
		<div class="p-4 md:p-10 tarjeta">
			<div class="centro">
				<h1>🤖 Bot Unicaribe</h1>
				<br />
				<h3 class="mb-3">El asesor de la Universidad del Caribe!</h3>
			</div>
			<p class="text-xl mb-2">Puedes preguntar cualquier duda:</p>
			<div class="flex">
				<input
					class="input text-xl"
					type="text"
					placeholder="Ej. ¿Cuál es el horario de la universidad?"
					bind:value={query}
				/>
				<button
					type="button"
					class="btn variant-filled-secondary w-1/5 ml-4 text-xl btn-responsive"
					on:click={queryEmbeddings}>Preguntar</button
				>
			</div>

			{#if loading}
				<div class="p-8" style="color: white;">
					Pensando...<br />
					<ProgressBar height="h-3" meter="bg-warning-500" />
				</div>
			{:else}
				{#if parsedTextBlocks.length > 0}
					<div>
						<h3 class="text-xxl mb-2 mt-6">Respuesta</h3>
						<div class="flex flex-col rounded-[16px] bg-tertiary-500 p-4">
							{#each parsedTextBlocks as textBlock}
								{#if textBlock.isCodeBlock}
									<CodeBlock language={textBlock.language} code={textBlock.text} />
								{:else}
									<p style="white-space: pre-line;">{textBlock.text}</p>
								{/if}
							{/each}
						</div>
					</div>
				{/if}
				<div>
					{#if documents.length > 0}
						<p class="text-xl mb-2 mt-6">Documentos:</p>
						{#each documents as document, i}
							<div class="flex flex-col">
								<CodeBlock language="markdown" code={document} />
								<p class="mt-2">Archivo Fuente: {metadatas[i].file_name}</p>
							</div>
							<br />
						{/each}
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.tarjeta {
		background-color: #212121;
	}

	h1,
	h3,
	p {
		color: white;
	}

	.centro {
		text-align: center;
	}

	@media (max-width: 600px) {
		.btn-responsive {
			font-size: 0.575rem;
			padding: 0.5rem 1rem;
		}
	}
</style>
