<template>
    <InputNome label="Seu nome" placeholder="Ex: João da Silva" autocomplete="name" required v-model="nome"/>
    <div style="height: 100px;"></div>
    <Select label="Tipo" :options="['Contratante', 'Contratada', 'Testemunha']" required v-model="tipo"/>
</template>

<script setup lang="ts">
import InputNome from '~/components/InputNome.vue';
import Select from '~/components/Select.vue';

definePageMeta({
    layout: 'painel'
});

const tipo = ref('');
const nome = ref('');

watch(nome, (newVal) => {
    console.log(newVal);
});
</script>