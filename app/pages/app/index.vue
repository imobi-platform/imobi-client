<template>
    <InputNome label="Seu nome" placeholder="Ex: João da Silva" autocomplete="name"/>
</template>

<script setup lang="ts">
import InputNome from '~/components/InputNome.vue';

definePageMeta({
    layout: 'painel'
});
</script>