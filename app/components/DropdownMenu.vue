<template>
  <div ref="wrapRef" class="dropdown">
    <button
      ref="triggerRef"
      type="button"
      class="trigger"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <MoreHorizontal class="trigger-icon" />
    </button>
    <Teleport to="body">
      <div
        ref="listaRef"
        v-show="isOpen"
        class="lista lista--teleport"
        :style="listaStyle"
      >
        <div class="conteudo">
          <template v-for="opt in options" :key="opt.id">
            <NuxtLink
              v-if="opt.to"
              :to="opt.to"
              class="opcao opcao--link"
              @click="closeMenu"
            >
              <component :is="opt.icon" class="opcao-icon" />
              <span>{{ opt.label }}</span>
            </NuxtLink>
            <a
              v-else-if="opt.href"
              :href="opt.href"
              class="opcao opcao--link"
              @click="closeMenu"
            >
              <component :is="opt.icon" class="opcao-icon" />
              <span>{{ opt.label }}</span>
            </a>
            <button
              v-else-if="opt.onClick"
              type="button"
              class="opcao"
              @click="opt.onClick(); closeMenu()"
            >
              <component :is="opt.icon" class="opcao-icon" />
              <span>{{ opt.label }}</span>
            </button>
          </template>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { MoreHorizontal } from 'lucide-vue-next'

const wrapRef = ref(null)
const triggerRef = ref(null)
const listaRef = ref(null)
const isOpen = ref(false)
const listaStyle = ref({})

defineProps({
  options: { type: Array, required: true },
})

function closeMenu() {
  isOpen.value = false
  document.removeEventListener('click', onClickOutside)
}

function updateListaPosition() {
  if (!triggerRef.value) return
  const rect = triggerRef.value.getBoundingClientRect()
  const minW = 140
  listaStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.right - minW}px`,
    minWidth: `${minW}px`,
  }
}

function toggle() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      updateListaPosition()
      document.addEventListener('click', onClickOutside)
    })
  } else {
    document.removeEventListener('click', onClickOutside)
  }
}

function onClickOutside(e) {
  const inside = wrapRef.value?.contains(e.target) || listaRef.value?.contains(e.target)
  if (!inside) closeMenu()
}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}

.trigger:hover {
  color: #111;
  background: #f3f4f6;
}

.trigger-icon {
  width: 18px;
  height: 18px;
}

.lista {
  min-width: 140px;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  padding: 5px;
  transition: opacity 0.2s;
  z-index: 9999;
}

.lista--teleport {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.conteudo {
  display: flex;
  flex-direction: column;
}

.opcao {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 10px 16px;
  border: none;
  background: none;
  font-family: "Figtree", sans-serif;
  font-size: 0.9375rem;
  font-weight: 300;
  color: #6b7280;
  text-align: left;
  cursor: pointer;
  border-radius: 14px;
  transition: background 0.2s, color 0.2s;
  text-decoration: none;
  box-sizing: border-box;
}

.opcao:hover {
  background: #f3f4f6;
  color: #111;
}

.opcao-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: inherit;
}
</style>
