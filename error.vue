<script setup lang="ts">
	const props = defineProps({
		error: Object,
	});
	const route = useRoute();
	const error = ref(props.error);
	const path = route.path.substring(0, route.path.length);
	const handleError = () => clearError({ redirect: "/" });
	const pageurl = ref("");
	const shareUrl = ref("");
	const title = ref(`Todo App | Error ${error.value?.statusCode}`);

	useHead({
		title: title.value,
		meta: [
			{
				name: "Todo App",
				content:
					"A Todo app",
			},
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],
	});
</script>

<template>
	<main class="flex flex-col items-center justify-center min-h-screen">
		<h1 class="text-4xl font-bold text-red-500 mb-4">
			Error {{ error?.statusCode }} :(
		</h1>
		<h2 class="text-2xl mb-8">{{ error?.statusMessage }}</h2>
		<div v-if="error?.statusCode === 404" class="text-center">
			<p class="text-lg">"{{ path }}" doesn't exist</p>
		</div>
		<Button @click="handleError" class="m-5" variant="secondary">
			Back to Home
		</Button>
	</main>
</template>

<style scoped></style>
