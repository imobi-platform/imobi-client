<template>
  <div class="painel" :class="{ 'painel--recolhida': isCollapsed }">
    <Sidebar :collapsed="isCollapsed" @toggle="toggleSidebar" />
    <header class="header">
      <div class="header-item">
        <Undo2Icon class="header-item-icon" />
        <span class="header-item-text">Voltar para o site</span>
      </div>
    </header>
    <main class="main">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import { Undo2Icon } from 'lucide-vue-next';

const isCollapsed = ref(false)
function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>
.painel {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 56px 1fr;
  height: 100vh;
  overflow: hidden;
  transition: grid-template-columns 0.25s ease;
}

.painel--recolhida {
  grid-template-columns: 56px 1fr;
}

/* Sidebar ocupa a coluna 1 nas duas linhas (altura total) */
.painel > :first-child {
  grid-row: 1 / -1;
}

/* Faixa superior à direita da sidebar: usuário alinhado à direita */
.header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 1.5rem;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
}

.header-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 9999px;
  transition: all 0.3s ease;
  padding: 10px 20px;
}

.header-item:hover {
  background: #f4f7fa;
  padding: 10px 20px;
}


.header-item-icon {
  width: 16px;
  height: 16px;
  color: #000;
}

.header-item-text {
  font-size: 0.75rem;
  font-weight: 30;
  color: #000;
}
/* Área de conteúdo: rola internamente; min-height: 0 para o grid dar espaço ao scroll */
.main {
  overflow: auto;
  min-height: 0;
  padding: 1.5rem;
  background: #fff;
}
</style>
