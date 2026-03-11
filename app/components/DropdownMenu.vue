<!--
  DropdownMenu: menu que abre ao clicar no ícone (⋯).
  Igual ao Select.vue em estrutura: wrapper + gatilho + lista.
  Cada opção em options pode ter:
  - to (string): rota interna → NuxtLink
  - href (string): link externo → <a>
  - onClick (função): ação → botão que chama e fecha o menu
  A lista é renderizada no body (Teleport) para não ser cortada dentro de tabelas.
-->
<template>
  <div ref="refWrap" class="dropdown" :class="{ ativo: isOpen }">
    <!-- Gatilho: ícone MoreHorizontal (como o .input do Select) -->
    <button
      ref="refTrigger"
      type="button"
      class="trigger"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <MoreHorizontal class="trigger-icon" />
    </button>

    <!-- Lista: só exibe quando listaPronta, para não piscar nem abrir no lugar errado na 1ª vez -->
    <Teleport to="body">
      <div
        ref="refLista"
        v-show="isOpen && listaPronta"
        class="lista"
        :style="listaStyle"
      >
        <div class="conteudo">
          <template v-for="opt in options" :key="opt.id">
            <!-- Opção com rota interna -->
            <NuxtLink
              v-if="opt.to"
              :to="opt.to"
              class="opcao"
              @click="fechar"
            >
              <component :is="opt.icon" class="opcao-icon" />
              <span>{{ opt.label }}</span>
            </NuxtLink>
            <!-- Opção com link externo -->
            <a
              v-else-if="opt.href"
              :href="opt.href"
              class="opcao"
              @click="fechar"
            >
              <component :is="opt.icon" class="opcao-icon" />
              <span>{{ opt.label }}</span>
            </a>
            <!-- Opção com função: clica → executa e fecha -->
            <button
              v-else-if="opt.onClick"
              type="button"
              class="opcao"
              @click="opt.onClick(); fechar()"
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

// Refs: wrapper (para click outside), gatilho (para posição), lista (para click outside)
const refWrap = ref(null)
const refTrigger = ref(null)
const refLista = ref(null)

const isOpen = ref(false)
// true só depois de atualizarPosicao(), assim a lista nunca aparece com posição errada (evita piscar)
const listaPronta = ref(false)
const listaStyle = ref({})

defineProps({
  options: { type: Array, required: true },
})

// Fecha o menu e remove o listener de clique fora
function fechar() {
  isOpen.value = false
  listaPronta.value = false
  document.removeEventListener('click', aoClicarFora)
}

// Calcula top/left da lista a partir da posição do gatilho (para ficar logo abaixo, alinhado à direita)
function atualizarPosicao() {
  if (!refTrigger.value) return
  const r = refTrigger.value.getBoundingClientRect()
  const minW = 140
  listaStyle.value = {
    position: 'fixed',
    top: `${r.bottom + 4}px`,
    left: `${r.right - minW}px`,
    minWidth: `${minW}px`,
  }
}

// Abre ou fecha. Ao abrir: calcula posição primeiro, só então marca listaPronta (evita piscar)
function toggle() {
  if (isOpen.value) {
    fechar()
    return
  }
  isOpen.value = true
  listaPronta.value = false
  nextTick(() => {
    atualizarPosicao()
    listaPronta.value = true
    document.addEventListener('click', aoClicarFora)
  })
}

// Se o clique não foi no gatilho nem na lista, fecha
function aoClicarFora(e) {
  const dentro = refWrap.value?.contains(e.target) || refLista.value?.contains(e.target)
  if (!dentro) fechar()
}
</script>

<style scoped>
/* Wrapper: relativo para o gatilho; classe .ativo quando aberto (igual Select .campo.ativo) */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Gatilho: botão com ícone (equivalente ao .input do Select) */
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

/* Lista: mesmo estilo do Select (.lista + .conteudo). Posição vem de :style quando teleportada */
.lista {
  min-width: 140px;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 20px;
  padding: 5px;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.conteudo {
  display: flex;
  flex-direction: column;
}

/* Cada opção: mesmo estilo do .conteudo button do Select (ícone + label) */
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
