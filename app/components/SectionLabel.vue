<template>
    <div class="topo">
        <div class="nome">
            <div class="icone">
                <component :is="icon" class="icone-icon" size="20"/>
            </div>
            <p>{{ title }}</p>
        </div>
    </div>
</template>

<script setup>
import { ChartColumn } from 'lucide-vue-next';

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: Object,
        required: true,
    },
})
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