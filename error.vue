<template>
	<div>
		<div>errorrrrrrrr {{ error }}</div>
		<button @click="handleErr">Go Home...</button>
	</div>
</template>

<script setup>
	defineProps(["error"]);
	const handleErr = () => clearError({ redirect: "/" });
</script>
