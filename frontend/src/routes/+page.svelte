<script lang="ts">
	import { goto } from '$app/navigation';
</script>

<div class="flex justify-center items-center p-4">
	<div class="m-11 card h-full w-3/4">
		<div class="p-4 md:p-10 tarjeta">
			<h1>🤖 Universidad del Caribe</h1>
			<h3 class="mt-6">Bienvenido</h3>
			<p class="mt-6">
				Este es el asistente virtual de la Universidad del Caribe, aquí podrás encontrar información
				sobre la universidad, carreras, servicios, entre otros.
			</p>
			<button class="btn btn-primary mt-6" on:click={() => goto('/bot')}
				>Ir a la página del bot</button
			>
		</div>
	</div>
</div>

<footer>
	<p class="text-center text-gray-500 text-sm mt-4">
		© 2024 Universidad del Caribe. Todos los derechos reservados.
	</p>
</footer>

<style>
	.tarjeta {
		background-color: #212121;
	}
	h1,
	h3,
	p,
	button {
		color: white;
	}
	button {
		background-color: #1d4ed8;
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}
	button:hover {
		background-color: #1e40af;
	}
	button:active {
		background-color: #1d4ed8;
		transform: scale(0.98);
	}
</style>
