<template>
    <div class="topo">
        <div class="nome">
            <div class="icone">
                <ChartColumn class="icone-icon" />
            </div>
            <p>Dashboard</p>
        </div>
    </div>

    <Cards :cards="cards" />
</template>

<script setup>
import { ChartColumn, House, Building, User, DollarSign } from 'lucide-vue-next';
import Cards from '@/components/Cards.vue';
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
.topo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    width: 100%;
}

.topo .nome {
    align-items: center;
    display: flex;
}

.topo .nome .icone {
    align-items: center;
    background-color: #f4f7fa;
    border-radius: 50px;
    display: flex;
    height: 50px;
    justify-content: center;
    margin: 0 15px 0 0;
    width: 50px;
}

.topo .nome p {
    font-size: 1rem;
    font-weight: 600;
}

</style>