<template>
  <div class="imoveis-page" :class="{ 'is-empty': itens.length === 0 }">
    <SectionLabel title="Meus Imóveis" :icon="DoorOpen"
      :button="{ icon: Plus, text: 'Novo Imóvel', onClick: () => navigateTo('/app/imoveis/novo') }" />
    <Table v-if="itens.length > 0" :fields="fields" :items="itens" striped>
      <template #cell(valor)="data">
        {{ formatarMoeda(data.row.valor) }}
      </template>
      <template #cell(actions)="data">
        <DropdownMenu :options="opcoesParaLinha(data.row)" />
      </template>
    </Table>
    <EmptyData v-else text="Nenhum imóvel encontrado" />
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

// const itens = ref([])

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

/* Ocupa todo o espaço abaixo do SectionLabel, sem scroll; texto centralizado no meio da tela */
</style>
