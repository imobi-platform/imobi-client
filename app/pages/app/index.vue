<template>
   <SectionLabel title="Dashboard" :icon="ChartColumn" />

    <Cards :cards="cards" />
</template>

<script setup>
import { ChartColumn, House, Building, User, DollarSign } from 'lucide-vue-next';
import Cards from '@/components/Cards.vue';
import SectionLabel from '@/components/SectionLabel.vue';
definePageMeta({
    layout: 'painel'
});

const cards = [
    {
        icon: House,
        title: 'Imóveis Ativos',
        value: '10'
    },
    {
        icon: Building,
        title: 'Imóveis Inativos',
        value: '10'
    },
    {
        icon: User,
        title: 'Clientes',
        value: '10'
    },
    {
        icon: DollarSign,
        title: 'Vendas Realizadas',
        value: '10'
    }
]
</script>

<style scoped>


</style>