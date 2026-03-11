<template>
  <div class="painel" :class="{ 'painel--recolhida': isCollapsed }">
    <Sidebar :collapsed="isCollapsed" @toggle="toggleSidebar" />
    <header class="header">
      <!-- <div class="header-user">
        <div class="header-avatar">
          <img src="https://i.pravatar.cc/300" alt="Profile">
        </div>
        <div class="header-info">
          <span class="header-name">John Doe</span>
          <span class="header-email">john.doe@example.com</span>
        </div>
      </div> -->
    </header>
    <main class="main">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
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

.header-user {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.header-name {
  font-size: 0.875rem;
  font-weight: 600;
}

.header-email {
  font-size: 0.75rem;
  color: #64748b;
}

.header-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background: #edf2f7;
}

.header-avatar img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Área de conteúdo: rola internamente; min-height: 0 para o grid dar espaço ao scroll */
.main {
  overflow: auto;
  min-height: 0;
  padding: 1.5rem;
  background: #fff;
}
</style>
