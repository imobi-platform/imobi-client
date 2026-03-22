<template>
  <div class="imoveis-page" :class="{ 'is-empty': itensFiltrados.length === 0 }">
    <SectionLabel title="Meus Imóveis" :icon="DoorOpen"
      :button="{ icon: Plus, text: 'Novo Imóvel', onClick: () => navigateTo('/app/imoveis/novo') }" />
    <div v-if="itens.length > 0" class="busca-wrap">
      <input
        v-model="busca"
        type="search"
        class="busca-input"
        placeholder="Buscar por imóvel, cidade, bairro..."
        aria-label="Filtrar imóveis"
      />
    </div>
    <Table v-if="itensFiltrados.length > 0" :fields="fields" :items="itensFiltrados" striped>
      <template #cell(valor)="data">
        {{ formatarMoeda(data.row.valor) }}
      </template>
      <template #cell(actions)="data">
        <DropdownMenu :options="opcoesParaLinha(data.row)" />
      </template>
    </Table>
    <EmptyData v-else :text="busca ? 'Nenhum imóvel encontrado para essa busca.' : 'Nenhum imóvel encontrado'" />
  </div>
</template>

<script setup>
import { DoorOpen, Pencil, Plus, Trash2 } from 'lucide-vue-next'
import SectionLabel from '@/components/SectionLabel.vue'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

definePageMeta({ layout: 'painel' })

function opcoesParaLinha(row) {
  return [
    { id: 'editar', icon: Pencil, label: 'Editar', to: `/app/imoveis/editar/${row.id}` },
    { id: 'excluir', icon: Trash2, label: 'Excluir', onClick: () => excluir(row) },
  ]
}

function excluir(row) {
  console.log('Excluir', row)
}

const fields = [
  { key: 'id', label: 'ID', align: 'center' },
  { key: 'imovel', label: 'Imóvel' },
  { key: 'imobiliaria', label: 'Imobiliária' },
  { key: 'cidade', label: 'Cidade' },
  { key: 'estado', label: 'Estado' },
  { key: 'bairro', label: 'Bairro' },
  { key: 'valor', label: 'Valor', align: 'left' },
  { key: 'actions', label: 'Ações', align: 'center' },
]

const itens = ref([
  { id: 1, imovel: 'Imóvel 1', imobiliaria: 'Imobiliária 1', cidade: 'Cidade 1', estado: 'Estado 1', bairro: 'Bairro 1', valor: 100000 },
  { id: 2, imovel: 'Imóvel 2', imobiliaria: 'Imobiliária 2', cidade: 'Cidade 2', estado: 'Estado 2', bairro: 'Bairro 2', valor: 250000 },
])

const busca = ref('')

const itensFiltrados = computed(() => {
  const q = busca.value.trim().toLowerCase()
  if (!q) return itens.value
  return itens.value.filter((item) => {
    return [
      item.imovel,
      item.imobiliaria,
      item.cidade,
      item.estado,
      item.bairro,
    ].some((v) => String(v ?? '').toLowerCase().includes(q))
  })
})

function formatarMoeda(valor) {
  if (valor == null) return '—'
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
}
</script>

<style scoped>
.imoveis-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

/* Quando mostra empty state: tira margem do SectionLabel para o bloco vazio ocupar mais espaço e centralizar melhor */
.imoveis-page.is-empty :deep(.topo) {
  margin-bottom: 0;
}

.busca-wrap {
  margin-bottom: 1rem;
  width: 100%;
  max-width: 400px;
}

.busca-input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 9999px;
  font-family: "Figtree", sans-serif;
  font-size: 0.875rem;
  background: #fff;
  outline: none;
}

.busca-input:focus {
  border-color: var(--cor-preto);
}

.busca-input::placeholder {
  color: #9ca3af;
}
</style>
