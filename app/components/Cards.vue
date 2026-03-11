<template>
    <div class="grid">
        <div class="card" v-for="card in cards">
            <div class="icone">
                <component :is="card.icon" class="icone-icon" />
            </div>
            <div class="info">
                <span>{{ card.title }}</span>
                <p class="valor">{{ card.value }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    cards: {
        type: Array,
        required: true
    }
})
</script>

<style scoped>
.grid {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    width: 100%;
    margin: 0 0 20px
}

.grid .card {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 160px;
    background-color: #f4f7fa;
    border-radius: 9999px;
    padding: 15px;
}


.grid .card .icone {
    align-items: center;
    background-color: #fff;
    border-radius: 50px;
    display: flex;
    height: 50px;
    justify-content: center;
    margin: 0 15px 0 0;
    width: 50px;
}

.grid .card .info {
    display: flex;
    flex-direction: column;
}

.grid .card .info span {
    font-size: 0.75rem;
    font-weight: 300;
    color: #8c8f94;
    /* cor cinza */
    margin-bottom: 5px;
}

.grid .card .info p {
    font-size: 1rem;
    font-weight: 600;
    color: #000;
    /* cor preta */
    margin: 0;
}
</style>